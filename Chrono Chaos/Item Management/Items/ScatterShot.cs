using System;
using System.ComponentModel;
using Blok3Game.Engine.GameObjects;
using Microsoft.Xna.Framework;

public class ScatterShot : GameObject, ItemInterface
{
    public int itemID { get; set; }

    public ScatterShot()
    {
        itemID = 4;
    }    
}