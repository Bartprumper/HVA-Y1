using System;
using System.Xml.Serialization;
using Blok3Game.Engine.GameObjects;
using Microsoft.Xna.Framework;

public class GridCell : RotatingSpriteGameObject
{
    public bool bottomRow; // check of de cell in de onderste rij zit
    private float _cellSize = 1f; // grootte van de cell
    public Vector2 Location; // locatie index in de grid
    public Vector2 Anchor; // anker positie voor de ballen
    private Vector2 _anchorOffset = new Vector2(-40, -40); // offset zodat de ball in het midden staat
    public string cellState = "Empty"; // status van de cell
    private float _margin = 5f; // marge tegen pixel perfect checks
    private float _angle = 0f; // hoek van de cell
    private float _rotateSpeed = 0.008f; // snelheid van de rotatie om het midden van de grid
    private float _spriteRotateSpeed = 0.459f; // snelheid van de rotatie van de sprite
    private bool _rotateFlip = false;
    private Vector2 _rotatedOffset;
    private Vector2 _centerOffset; // afstand tot het midden van de grid
    private Vector2 _gridCenter; // middelpunt van de grid
    private Vector2 _originOffset = new Vector2(50f, 50f); // past de origin aan zodat deze in het midden van de cell staat

    public GridCell(Vector2 position, Vector2 location, Vector2 center) : base("Images/Grid/FryingFATTY")
    {
        this.Position = position;
        this.Location = location;
        this._gridCenter = center;
        scale = _cellSize;
        origin += _originOffset;
        Anchor = position + _anchorOffset;
        _centerOffset = Position - _gridCenter;
        layer = 1;
    }

    public override void Update(GameTime gameTime)
    {
        base.Update(gameTime);
        Anchor = position + _anchorOffset; // Anker positie bijwerken als de cell positie verandert (dit wordt later alleen tijdens rotatie aangeroepen maar die functie bestaat nog niet)
        //_angle += _rotatespeed * (float)gameTime.ElapsedGameTime.TotalSeconds;
    }

    public void DetectBottomRow(float bottomHeight) // Kijkt of de positie van de cell gelijk is aan de positie van de onderste rij
    {
        if (Position.Y >= bottomHeight - _margin) // Marge zodat de check niet pixel perfect is
        {
            bottomRow = true; // Cell zit in de onderste rij
        }
        else
        {
            bottomRow = false; // Cell zit niet in de onderste rij
        }
    }

    public void Rotate(string direction)
    {
        if (direction == "counterclockwise" && !_rotateFlip)
        {
            _rotateSpeed *= -1;
            _spriteRotateSpeed *= -1;
            _rotateFlip = true;
        }
        _angle += _rotateSpeed;
        Degrees += _spriteRotateSpeed;
        float cos = (float)Math.Cos(_angle);
        float sin = (float)Math.Sin(_angle);
        _rotatedOffset = new Vector2(
            _centerOffset.X * cos - _centerOffset.Y * sin,
            _centerOffset.X * sin + _centerOffset.Y * cos
        );
        Position = _gridCenter + _rotatedOffset;
    }

    public void ResetRotation()
    {
        if (_rotateSpeed < 0 || _spriteRotateSpeed < 0)
        {
            _rotateSpeed *= -1;
            _spriteRotateSpeed *= -1;
            _rotateFlip = false;
        }
        Degrees = 0;
    }
}