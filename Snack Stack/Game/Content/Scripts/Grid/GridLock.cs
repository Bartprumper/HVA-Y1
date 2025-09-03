using System;
using System.Xml.Serialization;
using Blok3Game.Engine.GameObjects;
using Microsoft.Xna.Framework;

public class GridLock : SpriteGameObject
{
    public Vector2 lockPos;
    private Vector2 lockOffset = new Vector2(25, 25);
    public GridLock(Vector2 position) : base("Images/Grid/gridLockSquare", 0, "gridLock", 0)
    {
        this.Position = position;
        lockPos = position + lockOffset;
    }
}