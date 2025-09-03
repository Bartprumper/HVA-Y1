using Blok3Game.Engine.GameObjects;
using Blok3Game.Engine.Helpers;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;

public class Background : AnimatedGameObject
{
    //private float moveSpeed = 200; //Only given here
    //string image;
    public Background(Vector2 position, string image) : base(0, "Background")
    {
        Position = position;
        Scale = 5f;

        if(image == "dungeon")
        {
            LoadAnimation("Images/Backgrounds/dungeonFloor","DarkCastle", true, 0.1f);
            PlayAnimation("DarkCastle");
        }
        if(image == "cave")
        {
            LoadAnimation("Images/Backgrounds/cavebackground", "Cave", true, 0.1f);
            PlayAnimation("Cave");
        }
        
        
    }
}