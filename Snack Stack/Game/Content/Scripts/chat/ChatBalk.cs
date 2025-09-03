using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;
using Blok3Game.Engine.UI;
using Blok3Game.Engine.Helpers;
using System;
using Blok3Game.Engine.GameObjects;
using Client.GameStates;

namespace Blok3Game.Game.UI
{
    public class ChatBalk : TextInput
    {
        private bool _isActive;
        public bool IsActive => _isActive;
        public bool HasSubmittedText { get; private set; }
        public string LastSubmittedText { get; private set; }
        private Grid _grid; // Referentie naar de grid
        private float _bubbleLifeTime = 6f; // Levensduur van de chat bubbles in seconden
        private float _bubbleScale = 0.3f; // Schaal van de chat bubbles

        // Referenties voor chat bubble management
        private GameObjectList _parent; 
        private ChatBubble _activeChatBubble; 

        // Posities voor de chatbubbles van elk team
        private readonly Vector2 _nederlandBubblePosition = new Vector2(-25, 300); // Linkerkant (NL)
        private readonly Vector2 _belgieBubblePosition = new Vector2(925, 300);   // Rechterkant (BE)
        private ChatBubble _nederlandChatBubble; 
        private ChatBubble _belgieChatBubble; 

        private string _placeholderText = "Klik hier om te chatten of druk op T";
        private const int MaxVisibleCharacters = 40; // Aantal karakters dat past in de balk

        public ChatBalk(Vector2 position, float scale, int maxCharacters) : base(position)
        {
            CharacterLimit = maxCharacters;
            _isActive = false;
            HasSubmittedText = false;
            LastSubmittedText = string.Empty;
            text.Text = _placeholderText;
        }

        public void SetPosition(Vector2 newPosition)
        {
            Position = newPosition;
        }

        // Methode om de grid-referentie in te stellen
        public void SetGrid(Grid grid)
        {
            _grid = grid;
        }

        // Methode om een bovenliggende referentie in te stellen voor het toevoegen/verwijderen van bubbels
        public void SetParent(GameObjectList parent)
        {
            _parent = parent;
        }

        public override void HandleInput(InputHelper inputHelper)
        {
            bool wasActive = _isActive;

            // Klik op balk activeert deze
            if (inputHelper.MouseLeftButtonPressed && background.BoundingBox.Contains(inputHelper.MousePosition))
            {
                _isActive = true;
                if (text.Text == _placeholderText)
                    text.Text = string.Empty;
            }
            // Klik ergens anders deactiveert de balk
            else if (inputHelper.MouseLeftButtonPressed && !background.BoundingBox.Contains(inputHelper.MousePosition))
            {
                _isActive = false;
            }

            // Activeer bij indrukken van de T-toets
            if (!_isActive && inputHelper.KeyPressed(Keys.T))
            {
                _isActive = true;
                if (text.Text == _placeholderText)
                    text.Text = string.Empty;
            }

            // Verstuur bericht met Enter-toets
            if (_isActive && inputHelper.KeyPressed(Keys.Enter))
            {
                OnSubmit();
                _isActive = false;
            }

            // Als de actieve status veranderd is, update de grid
            if (wasActive != _isActive && _grid != null)
            {
                _grid.SetChatActive(_isActive);
            }

            // Verwerk tekstinvoer alleen als de balk actief is
            if (_isActive)
            {
                base.HandleInput(inputHelper);
            }

            // Beperk de zichtbare tekst tot de laatste karakters als deze te lang is
            if (_isActive && text.Text.Length > MaxVisibleCharacters)
            {
                string fullText = text.Text;
                text.Text = fullText.Substring(fullText.Length - MaxVisibleCharacters);
            }
        }

        private void OnSubmit()
        {
            if (!string.IsNullOrWhiteSpace(Text) && Text != _placeholderText && _parent != null && _grid != null)
            {
                LastSubmittedText = Text;
                HasSubmittedText = true;

                // Stuur het bericht naar de server
                GameManager.Instance.SendChatMessage(LastSubmittedText);

                ClearText();
                ClearSubmission();
            }
        }

        public void CreateChatBubble(string message, Team team)
        {
            // Bepaal de positie van de bubble op basis van het team
            Vector2 bubblePosition = (team == Team.Nederland)
                ? _nederlandBubblePosition
                : _belgieBubblePosition;

            // Create new bubble with default lifetime of 6 seconds
            ChatBubble chatBubble = new ChatBubble(message, bubblePosition, _bubbleScale, _bubbleLifeTime);
            chatBubble.Setparent(_parent); // Set parent for self-removal
            _parent.Add(chatBubble);

            // Als dit een eigen bericht is, sla het op als actieve bubble
            if (team == GameManager.Instance.Team)
            {
                _activeChatBubble = chatBubble;
            }

            // Verwijder bestaande bubble van hetzelfde team als die bestaat
            if (team == Team.Nederland && _nederlandChatBubble != null)
            {
                _parent.Remove(_nederlandChatBubble);
                _nederlandChatBubble = null;
            }
            else if (team == Team.Belgie && _belgieChatBubble != null)
            {
                _parent.Remove(_belgieChatBubble);
                _belgieChatBubble = null;
            }

            // Sla de nieuwe bubble op in de juiste variabele
            if (team == Team.Nederland)
            {
                _nederlandChatBubble = chatBubble;
            }
            else
            {
                _belgieChatBubble = chatBubble;
            }
        }

        public void ClearSubmission()
        {
            HasSubmittedText = false;
            LastSubmittedText = string.Empty;
        }

        private void ClearText()
        {
            text.Text = _placeholderText;
        }
    }
}
