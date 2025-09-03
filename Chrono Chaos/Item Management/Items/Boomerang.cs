using System;
using System.ComponentModel;
using Blok3Game.Engine.GameObjects;
using Microsoft.Xna.Framework;

public class Boomerang : GameObject, ItemInterface
{
    public int itemID { get; set; }

    public Boomerang()
    {
        itemID = 3;
    }    
}