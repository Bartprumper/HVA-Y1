using System.Threading;
using Blok3Game.Engine.GameObjects;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace Blok3Game.HUD
{
    public class FloatingTime : GameObject
    {
        private string text;
        private Color color;
        private SpriteFont font;
        private float textTime; //seconden dat tekst op scherm blijft
        private float startTimer; //starttijd van tekst op scherm
        
        public FloatingTime(string text, Vector2 position, Color color, SpriteFont font, float textTime )
        {
            this.text = text;
            this.position = position;
            this.color = color;
            this.font = font;
            this.textTime = textTime;
            this.startTimer = 0f;
        }

        public override void Update(GameTime gameTime)
        {
            startTimer += (float)gameTime.ElapsedGameTime.TotalSeconds;
            if (startTimer >= textTime)
            {
                this.Visible = false;
            }

            position -= new Vector2(0, 80) * (float)gameTime.ElapsedGameTime.TotalSeconds; // tekst zweeft omhoog
            
        }

        public override void Draw(GameTime gameTime, SpriteBatch spriteBatch)
        {
            if (Visible)
            {
                spriteBatch.DrawString(font, text, position, color);
            }
        }
        
    }
}
