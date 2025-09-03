using System;
using Blok3Game.Engine.GameObjects;
using Blok3Game.Engine.Helpers;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

public class Bullet : SpriteGameObject
{
    private Vector2 direction;
    private int moveSpeed = 300;
    public bool effects;

    public Bullet(Vector2 position, Vector2 direction, bool effects) : base("Images/Tiles/tilemap@12x11", 1, "bullet", 105)
    {
        Position = position;
        this.effects = effects;
        this.direction = direction;
        Scale = 2f;
    }

    public override void Update(GameTime gameTime)
    {
        base.Update(gameTime);
        direction.Normalize();
        
        Velocity = direction * moveSpeed;
    }



   
 








}