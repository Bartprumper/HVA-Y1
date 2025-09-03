using System;
using System.Security.Cryptography.X509Certificates;
using Blok3Game.Engine.GameObjects;
using Blok3Game.Engine.Helpers;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;

public class Player : AnimatedGameObject
{
    public float moveSpeed = 200; //Only given here
    public Vector2 currentPos;
    private int resetPos = 4;

    private Book book;

    private BookList bookList;
    public Player(Vector2 position, Book book, BookList bookList) : base(1, "Player")
    {
        // Set the player's position to the center of the screen.
        Position = position;
        this.book = book;
        this.bookList = bookList;
        Scale = 2f;

        LoadAnimation("Images/Characters/Woman/Up@1x3", "Up", true, 0.1f);
        LoadAnimation("Images/Characters/Woman/UpLeft@1x3", "UpLeft", true, 0.1f);
        LoadAnimation("Images/Characters/Woman/UpRight@1x3", "UpRight", true, 0.1f);
        LoadAnimation("Images/Characters/Woman/Left@1x3", "Left", true, 0.1f);
        LoadAnimation("Images/Characters/Woman/Right@1x3", "Right", true, 0.1f);
        LoadAnimation("Images/Characters/Woman/Down@1x3", "Down", true, 0.1f);
        LoadAnimation("Images/Characters/Woman/DownLeft@1x3", "DownLeft", true, 0.1f);
        LoadAnimation("Images/Characters/Woman/DownRight@1x3", "DownRight", true, 0.1f);
        PlayAnimation("Up"); //Defines the starting position
        // test


    }

    public override void HandleInput(InputHelper inputHelper) //de class word benoemt en de tweede text is de variabel
    {
        base.HandleInput(inputHelper);

        if (inputHelper.IsKeyDown(Keys.W))
        {
            if (inputHelper.IsKeyDown(Keys.A))
            {
                PlayAnimation("UpLeft"); //rewrites it based on outcomes
                Velocity = new Vector2(-1, -1);
            }
            else if (inputHelper.IsKeyDown(Keys.D))
            {
                PlayAnimation("UpRight");
                Velocity = new Vector2(1, -1);
            }
            else
            {
                PlayAnimation("Up");
                Velocity = new Vector2(0, -1);
            }
        }
        else if (inputHelper.IsKeyDown(Keys.S))
        {
            if (inputHelper.IsKeyDown(Keys.A))
            {
                PlayAnimation("DownLeft");
                Velocity = new Vector2(-1, 1);
            }
            else if (inputHelper.IsKeyDown(Keys.D))
            {
                PlayAnimation("DownRight");
                Velocity = new Vector2(1, 1);
            }
            else
            {
                PlayAnimation("Down");
                Velocity = new Vector2(0, 1);
            }
        }
        else if (inputHelper.IsKeyDown(Keys.A))
        {
            PlayAnimation("Left");
            Velocity = new Vector2(-1, 0);
        }
        else if (inputHelper.IsKeyDown(Keys.D))
        {
            PlayAnimation("Right");
            Velocity = new Vector2(1, 0);
        }
        else
        {
            Velocity = Vector2.Zero; //Sets the updating to 0,0
        }
        Velocity.Normalize();
        Velocity *= moveSpeed;
    }

    private void ConstrainPosition()
    {
        if(Position.X < 0 + Width)
        {
            position.X += resetPos;
        }
        if(Position.Y < 0 + Height)
        {
            position.Y += resetPos;
        }
        if(Position.X > 2940 - Width)
        {
            position.X -= resetPos;
        }
        if(Position.Y > 2000 - Height)
        {
            position.Y -= resetPos;
        }
    }

    public override void Update(GameTime gameTime)
    {
        base.Update(gameTime);
        currentPos = position;
        ConstrainPosition();
        BulletManager.playerPosition = position;
        
        //BookCollision(bookList);
    }

}