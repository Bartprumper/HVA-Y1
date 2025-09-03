using System;
using Microsoft.Xna.Framework;

public class FollowCamera 
{
    public Vector2 position;

    public FollowCamera(Vector2 startposition)
    {
        this.position = startposition;
    }

    public void Follow(Rectangle target, Vector2 screenSize, Vector2 worldSize)
    {
        //speler blijft in midden van scherm en camera blijft binnen speelwereld
         position = new Vector2(
            MathHelper.Clamp(-target.X + (screenSize.X / 2 - target.Width / 2), -worldSize.X + screenSize.X, 0),
            MathHelper.Clamp(-target.Y + (screenSize.Y / 2 - target.Height / 2), -worldSize.Y + screenSize.Y, 0)
        );
        BulletManager.cameraPosition = position;
    }
}