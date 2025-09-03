using System;
using System.ComponentModel;
using System.Diagnostics;
using Blok3Game.Engine.GameObjects;
using Blok3Game.Engine.Helpers;
using Microsoft.Xna.Framework;

using Microsoft.Xna.Framework.Graphics;

public class Book : AnimatedGameObject
{
private Player player;


private BookList bookList;

public Book(Vector2 Position, BookList bookList, Player player) : base (0, "Book") //constructor
{
    this.bookList = bookList;
    position = Position;
    this.player = player;

    scale = 0.5f;
    LoadAnimation("Images/Book", "Book",true, 0.1f);    
    PlayAnimation("Book");

}


    public override void Update(GameTime gameTime)
    {
        base.Update(gameTime);
    
    }
    
}

   


