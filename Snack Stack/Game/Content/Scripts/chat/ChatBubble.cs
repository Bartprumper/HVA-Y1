using Microsoft.Xna.Framework;
using Blok3Game.Engine.GameObjects;
using System.Text;
using Client.GameStates;

namespace Blok3Game.Game.UI
{
    public class ChatBubble : GameObjectList
    {
        private TextGameObject _messageText;
        private SpriteGameObject _bubbleBackground;
        private bool _isRightAligned;
        private int _screenWidth = 1200; 

        // Eigenschappen voor het beheren van de levensduur
        private double _timeAlive;
        private float _lifetime;
        private GameObjectList _parent;

        public ChatBubble(string message, Vector2 position, float scale, float _lifetime) : base()
        {
            _bubbleBackground = new SpriteGameObject("Images/UI/ChatBubbleWhite", 0, "chatbubble");
            _bubbleBackground.Scale = scale;
            Add(_bubbleBackground);

            _messageText = new TextGameObject("Fonts/SpriteFont", 1, "text")
            {
                Text = WrapText(message, 20),
                Position = new Vector2(80, 80)
            };
            Add(_messageText);

            // Bepaal of dit een rechts-uitgelijnde bubbel is (Belgisch team)
            _isRightAligned = position.X > _screenWidth / 2;

            // Pas de tekstpositie aan als de bubbel rechts is uitgelijnd
            if (_isRightAligned)
            {
                // Spiegelen van de bubbel horizontaal voor de rechterkant
                _bubbleBackground.Mirror = true;
            }

            SetPosition(position);

            // Initialiseer levensduur-eigenschappen
            this._lifetime = _lifetime;
            this._timeAlive = 0;
        }

        public void SetPosition(Vector2 newPosition)
        {
            Position = newPosition;
        }

        public string Message => _messageText.Text;

        // Methode om een ouder-referentie in te stellen voor zelfverwijdering
        public void Setparent(GameObjectList _parent)
        {
            this._parent = _parent;
        }

        private string WrapText(string text, int maxLineLength)
        {
            if (string.IsNullOrWhiteSpace(text) || text.Length <= maxLineLength)
                return text;

            StringBuilder wrappedText = new StringBuilder();
            for (int i = 0; i < text.Length; i += maxLineLength)
            {
                if (i + maxLineLength < text.Length)
                    wrappedText.AppendLine(text.Substring(i, maxLineLength));
                else
                    wrappedText.Append(text.Substring(i));
            }

            return wrappedText.ToString();
        }

        public override void Update(GameTime gameTime)
        {
            base.Update(gameTime);

            // Houd de tekst correct gepositioneerd ten opzichte van de bubbel
            // Dit zorgt ervoor dat de tekst op de juiste plek blijft, zelfs als de bubbel gespiegeld is
            if (_isRightAligned)
            {
                // Voor rechts-uitgelijnde bubbels, pas de tekstpositie aan om binnen de bubbel te blijven
                _messageText.Position = new Vector2(65, 80);
            }
            else
            {
                // Voor links-uitgelijnde bubbels, gebruik de standaardpositie
                _messageText.Position = new Vector2(80, 80);
            }

            // Werk de levensduur bij en controleer of de bubbel verwijderd moet worden
            _timeAlive += gameTime.ElapsedGameTime.TotalSeconds;
            if (_timeAlive >= _lifetime && _parent != null)
            {
                _parent.Remove(this);
            }
        }
    }
}
