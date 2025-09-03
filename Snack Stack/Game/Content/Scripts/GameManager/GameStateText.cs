using Blok3Game.Engine.GameObjects;
using Microsoft.Xna.Framework;
using System;

namespace Client.GameObjects
{
    public class GameStateText : TextGameObject
    {
        public GameStateText(string assetname, int layer = 0, string id = "") : base(assetname, layer, id)
        {
            Color = Color.White;
            text = "";
            Visible = false;
        }

        public void ShowCheckText(string text)
        {
            string safeText = FilterUnsupportedCharacters(text); // Filtert unsupported karakters
            this.text = safeText;
            float textWidth = spriteFont.MeasureString(safeText).X; // Meet de breedte van de tekst
            Position = new Vector2((GameEnvironment.Screen.X / 2) - (textWidth / 2), GameEnvironment.Screen.Y * 0.9f); // Plaats de tekst in het midden onderaan het scherm
            Visible = true;
            Color = Color.White;
        }

        private string FilterUnsupportedCharacters(string input)
        {
            // Filter unsupported karakters gebaseerd op de sprite font
            var supportedChars = spriteFont.Characters;
            var filtered = new System.Text.StringBuilder();
            foreach (char c in input)
            {
                if (supportedChars.Contains(c)) // Controleer of het karakter ondersteund wordt
                    filtered.Append(c);
                else
                    filtered.Append('?'); // Vervang unsupported characters met '?'
            }
            return filtered.ToString(); // returnt de gefilterde tekst
        }

        public override void Update(GameTime gameTime)
        {
            base.Update(gameTime);
            
            //regelt de fade-out effect van de tekst
            Color newColor = Color; 
            int alpha = Math.Max(newColor.A - 1, 0);
            newColor.A = (byte)alpha;
            Color = newColor;

            if (alpha <= 0)
            {
                visible = false;
            }
        }
    }
}
