using System;
using Blok3Game.Engine.GameObjects;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;
using Microsoft.Xna.Framework.Graphics;

public class Player : SpriteGameObject // Speler Inherits van SpriteGameObject
{
    private int _currentColumn = 3; // waar de speler begint (middelste kolom)
    private int _maxColumns; // Max kolommen aantal
    private float _moveSpeed = 0.05f; // hoe snel de speler zich voort beweegt rondt het grid
    private float _moveTimer = 0f; // Wanneer de speler weer een beurt kan zetten
    private Vector2 _gridOrigin;
    private Vector2 _originOffset = new Vector2(50, 50); 
    private int _cellSpacing;
    private Grid _grid; // Reference to grid
    private SpriteGameObject _ghostPiece; // transparent sprite zodat de speler kan zien waar zijn bitterbal zal landen
    private int SpriteOffsetX = 50; // OffsetX voor de Player sprite, zodat het netjes eruit ziet
    private int SpriteOffsetY = 25; // OffSetY voor de speler sprite, zodat het netjes eruit ziet
    private int _leftmostAllowedColumn = 0; // zorgt ervoor dat de speler niet verder kan dan de meest linker kolom
    private int _rightmostAllowedColumn = 1; // zorgt ervoor dat de speler niet verder kan dan de meest rechter kolom
    private static readonly string _playerImagePath = "Images/Player/Frituurschep";
    private static readonly string _GhostImagePath = "Images/Sprites/SnackDrops/BitterbalSpriteResize2@1x1";
    private bool _moveToggle = false; // Voorkomt dat er over meerdere kolommen bewogen wordt

    public Player(Grid grid)
        : base(_playerImagePath, 0, "Player", 0)
    {
        _grid = grid;
        _maxColumns = grid.Columns;
        _gridOrigin = grid.Origin;
        _cellSpacing = grid.CellSpacing;
        Scale = 0.2f;

        _ghostPiece = new SpriteGameObject(_GhostImagePath, 0, "GhostPiece", 0)
        {
            Shade = new Color(255, 255, 255, 88) // Semi-transparent
        };

        UpdatePosition();
    }

    public override void Update(GameTime gameTime)
    {
        base.Update(gameTime);
        _moveTimer += (float)gameTime.ElapsedGameTime.TotalSeconds;

        if (_moveTimer >= _moveSpeed)
        {
            HandleInput();
            _moveTimer = 0f;
        }
        
        
        // Werk de ghostpositie bij elk frame bij om ervoor te zorgen dat deze nauwkeurig blijft tijdens de rotatie
        UpdateGhostPosition();
    }

    private void HandleInput()
    {
        KeyboardState keyboardState = Keyboard.GetState();

        if (keyboardState.IsKeyDown(Keys.Left) && _currentColumn > _leftmostAllowedColumn && !_moveToggle)
        {
            _currentColumn--;
            UpdatePosition();
            _moveToggle = true; // Voorkomt dat er over meerdere kolommen bewogen wordt
        }
        else if (keyboardState.IsKeyDown(Keys.Right) && _currentColumn < _maxColumns - _rightmostAllowedColumn && !_moveToggle)
        {
            _currentColumn++;
            UpdatePosition();
            _moveToggle = true;
        }
        else if (keyboardState.IsKeyUp(Keys.Left) && keyboardState.IsKeyUp(Keys.Right))
        {
            _moveToggle = false; // Reset move toggle wanneer de keys zijn losgelaten
        }
    }

    private void UpdatePosition()
    {
        Vector2 playerPos = new Vector2(_gridOrigin.X - SpriteOffsetX + _currentColumn * _cellSpacing - _originOffset.X, _gridOrigin.Y - SpriteOffsetY - _cellSpacing - _originOffset.Y);
        Position = playerPos;
        
        UpdateGhostPosition();
    }
    
    private void UpdateGhostPosition()
    {
        // De landingspositie verkrijgen op basis van de huidige rotatiestatus
        Vector2 landingPos = _grid.GetGhostPosition(_currentColumn);
        
        if (landingPos != Vector2.Zero)
        {
            _ghostPiece.Position = landingPos;
            _ghostPiece.Visible = true;
        }
        else
        {
            _ghostPiece.Visible = false; // Verberg spook als er geen geldige landingspositie is
        }
    }

    public override void Draw(GameTime gameTime, SpriteBatch spriteBatch)
    {
        _ghostPiece.Draw(gameTime, spriteBatch);
        base.Draw(gameTime, spriteBatch);
    }

    public int GetCurrentColumn()
    {
        return _currentColumn;
    }
}