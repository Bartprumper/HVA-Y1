using System;
using Blok3Game.Engine.GameObjects;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Content;


namespace Blok3Game.HUD
{
    public class ProgressBar : GameObject
    {
        private Texture2D barTexture;
        private float progress = 0f;
        new Vector2 position;
        
        public ProgressBar(ContentManager content, Vector2 position)
        {
            this.position = position;
            LoadContent(content);
        }
         public void Increase(float amount)
        {
            progress = amount;
            if (progress > 100)
            {
                progress = 100; // Max 100%
            }             
        }


        public void LoadContent(ContentManager Content)
        {
            barTexture = Content.Load<Texture2D>("progress"); 
        }

        public void Draw(SpriteBatch SpriteBatch)
        {  
            float progressPercentage = progress / 100f;
            int fillWidth = (int)(barTexture.Width * progressPercentage);
            Rectangle fillRect = new Rectangle((int)position.X, (int)position.Y, fillWidth, barTexture.Height);
            SpriteBatch.Draw(barTexture, fillRect, Color.White);

        }
    
    }
}