using System.Collections.Generic;
using Microsoft.Xna.Framework;

namespace Blok3Game.Engine.GameObjects
{
    public class AnimatedGameObject : SpriteGameObject
    {
        protected Dictionary<string, Animation> animations;

        public AnimatedGameObject(int layer = 0, string id = "")
            : base("Images/Sprites/PlayerIdleAnimations/Nederland/AdPatatIdle@10x1", layer, id) // standaard sprite (wordt overschreven bij het laden van animaties)
        {
            animations = new Dictionary<string, Animation>();
        }

        public void LoadAnimation(string assetName, string id, bool looping, float frameTime = 0.1f)
        {
            Animation anim = new Animation(assetName, looping, frameTime);
            animations[id] = anim;        
        }

        public void PlayAnimation(string id, bool forceRestart = false, int startSheetIndex = 0)
        {
            // Als de animatie niet bestaat, geef een foutmelding
            if (!forceRestart && sprite == animations[id])
                return;

            animations[id].Play(startSheetIndex);
            sprite = animations[id];
        }

        public override void Update(GameTime gameTime)
        {
            if (sprite == null)
            {
                return;
            }
            Current.Update(gameTime);
            base.Update(gameTime);
        }

        public Animation Current
        {
            get { return sprite as Animation; }
        }
    }
}