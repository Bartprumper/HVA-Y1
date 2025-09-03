using System;
using System.ComponentModel;
using Blok3Game.Engine.GameObjects;
using Microsoft.Xna.Framework;

public class MirrorShot : GameObject, ItemInterface
{
    public int itemID { get; set; }

    public MirrorShot()
    {
        itemID = 2;
    }
}