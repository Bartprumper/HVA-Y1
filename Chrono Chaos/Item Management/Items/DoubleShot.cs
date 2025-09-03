using System;
using System.ComponentModel;
using Blok3Game.Engine.GameObjects;
using Microsoft.Xna.Framework;

public class DoubleShot : GameObject, ItemInterface
{
    public int itemID { get; set; }

    public DoubleShot()
    {
        itemID = 1;
    }    
}