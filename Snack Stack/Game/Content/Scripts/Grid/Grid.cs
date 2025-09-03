using System;
using Blok3Game.Engine.GameObjects;
using Client.GameStates;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;

public class Grid : GameObjectList
{
    private int _rows; // Aantal rijen in de grid
    private int _columns; // Aantal kolommen in de grid
    private int _cellSpacing = 100; // Afstand tussen de cellen
    private Vector2 _origin = new Vector2(300, 150); // Grid origin
    private Vector2 _originOffset = new Vector2(50, 50); // Offset voor de origin van de cellen
    private Vector2 _gridLockOffset = new Vector2(25, 25); // Offset voor de grid lock
    private Vector2 _topCellOffset = new Vector2(100, 175);
    private float _bottomRowY; // Y-positie van de onderste rij
    private bool _mouseClicked = false; // Muis click flag
    private float _clickCooldown = 1f; // Cooldown tussen ball drops
    private float _lastClickTime = 0f; // tijd sinds de laatste click
    private int _indexOffset = 1; // Offset voor de cellen, zodat ze beginnen bij 1 in plaats van 0
    private int _positionMargin = 5; // Marge voor het checken van posities
    private bool _rotating = false; // Rotatie flag
    public Vector2 Origin => _origin; // Publieke properties zodat ze van buitenaf benaderbaar zijn
    public int CellSpacing => _cellSpacing;
    public int Columns => _columns;
    public int Rows => _rows;
    private Player _player; // referentie naar de speler 
    private float _rotationTimer = 0f; // Houdt bij hoe lang de grid draait
    private float _rotationDuration = 19.6f; // Duur van de rotatie
    private string _rotationDirection; // richting van de rotatie 
    private int _turnCounter = 0; // houdt de beurten bij
    public int dropCounter = 0; // houdt het aantal ballen bij
    private bool _rotationState = false; // Houdt de gehele staat van rotatie bij
    private bool _blockBalls = false; // voorkomt dat er te veel ballen worden gedropt
    private int _totalDrops = 0;
    private int _totalRotations = 0;
    private int _nearWins = 0;
    private int _currentRotationState = 0; // Volg de huidige rotatiestatus (0 = normal, 1 = 90° clockwise, 2 = 180°, 3 = 270° clockwise)
    private bool _chatIsActive = false;
    public static Grid Instance { get; private set; } // Singleton instance van de Grid
    public Grid(int rows, int columns)
    {
        Instance = this; // Singleton pattern, zodat er maar 1 grid is in het spel
        this._rows = rows;
        this._columns = columns;

        InitializeGrid();
    }

    public void SetPlayer(Player player) // functie die de speler referentie geeft aan de grid
    {
        _player = player;
    }
    
    public void SetChatActive(bool isActive) // Methode toevoegen om de actieve status van de chat in te stellen
    {
        _chatIsActive = isActive;
    }

    private void InitializeGrid()
    {
        Vector2 gridCenter = new Vector2(
            _origin.X - _originOffset.X + _columns * _cellSpacing / 2,
            _origin.Y - _originOffset.Y + _rows * _cellSpacing / 2
        );
        for (int col = 0; col < _columns; col++)
        {
            for (int row = 0; row < _rows; row++)
            {
                Vector2 position = new Vector2(_origin.X + col * _cellSpacing, _origin.Y + row * _cellSpacing);
                Vector2 location = new Vector2(col + _indexOffset, row + _indexOffset);
                GridLock gridLock = new GridLock(position - _gridLockOffset);
                Add(gridLock);
                GridCell cell = new GridCell(position, location, gridCenter);
                Add(cell);
            }
        }

        SetBottomRow();
    }

    private GridCell GetCell(string method, int Xcol, int Yrow) // Een cell targeten door zijn locatie of positie mee te geven
    {
        Vector2 target = new Vector2(Xcol, Yrow);
        foreach (GameObject child in children)
        {
            if (child is GridCell gridCell)
            {
                if (method == "location" && gridCell.Location == target)
                {
                    return gridCell;
                }
                else if (method == "position" &&
                        gridCell.Position.X >= target.X - _positionMargin && gridCell.Position.X <= target.X + _positionMargin &&
                        gridCell.Position.Y >= target.Y - _positionMargin && gridCell.Position.Y <= target.Y + _positionMargin) // Marge is er omdat het onwaarschijnlijk is dat de cellen pixel-perfect op de meegegeven positie staan
                {
                    return gridCell;
                }
            }
        }
        if (method != "location" && method != "position")
        {
            throw new ArgumentException("Onjuiste methode meegegeven"); // gooit een foutmelding als de methode niet klopt
        }
        return null;
    }

    private float GetBottomRow() // Deze functie berekent de Y-positie van de onderste rij
    {
        foreach (GameObject child in children)
        {
            if (child is GridCell gridCell)
            {
                GridCell _nextCell = GetCell("position", (int)gridCell.Position.X, (int)gridCell.Position.Y + _cellSpacing); // Kijkt of er een cell onder de huidige zit
                if (_nextCell == null)
                {
                    _bottomRowY = gridCell.Position.Y; // slaat de Y-positie op als er geen cell onder zit
                }
            }
        }
        return _bottomRowY;
    }

    private void SetBottomRow()
    {
        foreach (GameObject child in children)
        {
            if (child is GridCell gridCell)
            {
                gridCell.DetectBottomRow(GetBottomRow()); // Stelt de bottomRow property in van de cellen
            }
        }
    }

    private void RotateGrid(string direction)
    {
        _rotationTimer += 0.1f; // Timer voor de rotatie
        foreach (GameObject child in children)
        {
            if (child is GridCell gridCell)
            {
                gridCell.Rotate(direction); // Draait de cellen
            }
            if (child is BallObject ballObject)
            {
                ballObject.Position = GetCell("location", (int)ballObject.currentCell.X, (int)ballObject.currentCell.Y).Anchor; // houdt de ballen op de juiste plek
            }
        }
        if (_rotationTimer >= _rotationDuration)
        {
            _rotationTimer = 0f;
            _rotating = false;
            _totalRotations++;
            ReinitializeGrid();

            if (direction == "clockwise") // Update rotatie status
            {
                _currentRotationState = (_currentRotationState + 1) % 4;
            }
            else // counterclockwise
            {
                _currentRotationState = (_currentRotationState + 3) % 4; // +3 is equivalent aan -1 met modulo 4
            }
            GameManager.Instance.RequestDirectionData();
        }
    }

    private void LockGrid() // zorgt ervoor dat de grid niet te veel of te weinig draait
    {
        foreach (GameObject child in children)
        {
            if (child is GridLock gridLock)
            {
                foreach (GameObject cell in children)
                {
                    if (cell is GridCell gridCell && gridLock.CollidesWith(gridCell))
                    {
                        gridCell.Position = gridLock.lockPos;
                    }
                }
            }
        }
    }

    private void ReinitializeGrid() // herstelt de grid na een rotatie
    {
        LockGrid();
        foreach (GameObject child in children)
        {
            if (child is GridCell gridCell)
            {
                gridCell.cellState = "Empty";
                gridCell.bottomRow = false;
                gridCell.ResetRotation();
            }
            if (child is BallObject ballObject)
            {
                ballObject.falling = true;
            }
        }
        SetBottomRow();
    }

    public void SetDirection(string direction) // bepaalt de volgende rotatie richting
    {
        _rotationDirection = direction; // Zet de richting op de meegegeven waarde
    }

    public void SpawnBall(int columnIndex, Team team)
    {
        if (_player == null) return;
        Vector2 ballPos = new Vector2(_origin.X + 10 + columnIndex * _cellSpacing - _originOffset.X, _origin.Y - _cellSpacing - _originOffset.Y); // Bereken de positie van de bal op basis van de kolomindex
        BallObject ballObject = new BallObject(ballPos, team); // selecteert team en bal positie
        Add(ballObject);
        dropCounter++;
        if (dropCounter == 8) // Blokkeerd de ballen nadat er 8 zijn gedropt
        {
            _blockBalls = true; // Zet de block balls flag aan
            dropCounter = 0; // Reset de drop counter
        }
        _lastClickTime = 0f;
    }

    public override void Update(GameTime gameTime)
    {
        base.Update(gameTime);
        CheckCollision();

        _lastClickTime += 0.01f; // Update de cooldown timer

        KeyboardState keyboardState = Keyboard.GetState();


        if (GameManager.Instance.CurrentPlayer == GameManager.Instance.Team && keyboardState.IsKeyDown(Keys.Space) // Check of de speler aan de beurt is en de spatiebalk ingedrukt is
            && !_mouseClicked && _lastClickTime >= _clickCooldown && !_blockBalls && !ColumnFull() && !_chatIsActive)
        {
            SpawnBall(_player.GetCurrentColumn(), GameManager.Instance.Team); // Spawn een bal in de kolom van de speler
            GameManager.Instance.SendMoveData(_player.GetCurrentColumn()); // Stuur de move data naar de server
            _mouseClicked = true;
        }
        else if (!keyboardState.IsKeyDown(Keys.Space) && !keyboardState.IsKeyDown(Keys.G) && !keyboardState.IsKeyDown(Keys.H))
        {
            _mouseClicked = false; // Reset de click flag
        }

        if (_turnCounter == 8) // checkt of er 8 beurten zijn geweest
        {
            _rotationState = true; // Zet de rotatie state aan
            _rotating = true; // Draai de grid na 8 beurten
            _turnCounter = 0; // Reset de turn counter
        }
        if (_rotating)
        {
            RotateGrid(_rotationDirection);
        }
        if (!AnyBallsFalling() && _rotationState && !_rotating) // checkt of er na een rotatie nog ballen vallen
        {
            _rotationState = false; // verlaat de rotatiestatus
            _blockBalls = false; // Zet de block balls flag uit
        }
    }

    private void CheckCollision()
    {
        foreach (GameObject child in children)
        {
            if (child is BallObject ballObject)
            {
                foreach (GameObject cell in children)
                {
                    if (cell is GridCell gridCell && ballObject.CollidesWith(gridCell) && ballObject.falling)
                    {
                        CollisionLogic(ballObject, gridCell);
                    }
                }
            }
        }
    }

    private void CollisionLogic(BallObject ballObject, GridCell gridCell) // Logica wanneer de bal een cell raakt
    {
        int _currentCol = (int)gridCell.Location.X;
        int _currentRow = (int)gridCell.Location.Y;
        float BallOffSetY = 38.5f;

        if (ballObject.Position.Y + BallOffSetY >= gridCell.Position.Y)
        {

            if (gridCell.bottomRow) // Check of de cell in de onderste rij staat 
            {
                ballObject.falling = false;
                ballObject.currentCell = gridCell.Location;
                ballObject.Position = gridCell.Anchor; // Zet de bal op de cell
                gridCell.cellState = ballObject.team;
                if (!_rotationState)
                {
                    _turnCounter++;
                    _totalDrops++;
                }
                CheckForWinner(_currentCol, _currentRow, gridCell.cellState);
            }

            else if (GetCell("position", (int)gridCell.Position.X, (int)gridCell.Position.Y + _cellSpacing).cellState != "Empty") // Check of de cell onder de huidige gevuld is
            {
                ballObject.falling = false;
                ballObject.currentCell = gridCell.Location;
                ballObject.Position = gridCell.Anchor; // Zet de bal op de cell
                gridCell.cellState = ballObject.team;
                if (!_rotationState)
                {
                    _turnCounter++;
                    _totalDrops++;
                }  
                CheckForWinner(_currentCol, _currentRow, gridCell.cellState); 
            }
        }
    }

    public int GetHighestBallRow(int column) //Deze methode haalt de hoogste bal in een kolom op, gebaseerd op de huidige rotatiestatus
    {
        int highestRow = _rows; // Standaard zitten er geen ballen in de kolom
        int adjustedColumn = column + _indexOffset; // Pas de kolom aan zodat deze overeenkomt met de locatiegebaseerde indexering
        
        int rotatedCol = adjustedColumn; // Logische kolom converteren naar gedraaide kolom op basis van rotatiestatus
        int rotatedRow;
        
        foreach (GameObject child in children)
        {
            if (child is BallObject ballObject && !ballObject.falling)
            {
                Vector2 ballLocation = ballObject.currentCell; // Gebruik de eigenschap currentCell die de rasterlocatie van de bal bijhoudt
                bool isInColumn = false; // Controleer of deze bal zich in onze doelkolom bevindt op basis van de rotatiestatus
                
                switch (_currentRotationState)
                {
                    case 0: // Normale orientatie
                        isInColumn = (int)ballLocation.X == adjustedColumn;
                        rotatedRow = (int)ballLocation.Y - _indexOffset;
                        break;
                    case 1: // 90° clockwise. In 90° rotatie, rows worden kolommen (van rechts)
                        isInColumn = (_rows + 1 - (int)ballLocation.Y) == (column + 1);
                        rotatedRow = (int)ballLocation.X - _indexOffset;
                        break;
                    case 2: // 180°. In 180° rotation, kolommen zijn omgedraaid
                        isInColumn = (_columns + 1 - (int)ballLocation.X) == (column + 1);
                        rotatedRow = (_rows - 1) - ((int)ballLocation.Y - _indexOffset);
                        break;
                    case 3: // 270° clockwise (of 90° counterclockwise). In 270° rotation, rows worden kolommen (van links)
                        isInColumn = (int)ballLocation.Y == adjustedColumn;
                        rotatedRow = (_columns - 1) - ((int)ballLocation.X - _indexOffset);
                        break;
                    default:
                        rotatedRow = (int)ballLocation.Y - _indexOffset;
                        break;
                }
                if (isInColumn)
                {
                    if (rotatedRow < highestRow)
                    {
                        highestRow = rotatedRow;
                    }
                }
            }
        }

        return (highestRow == _rows) ? -1 : highestRow; // Return -1 als er geen bal is gevonden
    }

    public int GetLandingRow(int column)
    {
        int highestBallRow = GetHighestBallRow(column);

        if (highestBallRow == -1)
        {
            return _rows - 1; // Geen ballen in de kolom? Land onderaan.
        }

        if (highestBallRow > 0)
        {
            return highestBallRow - 1; // Land direct boven de hoogste bal
        }

        return -1; // Kolom zit vol
    }
    public Vector2 GetGhostPosition(int column)
    {
        int landingRow = GetLandingRow(column);
        
        if (landingRow < 0)
        {
            return Vector2.Zero; // Geen geldige landingspositie
        }

        Vector2 ghostPos; // Converteer logische positie naar daadwerkelijke rasterpositie op basis van de rotatiestatus
        int adjustedColumn = column + _indexOffset;
        int adjustedRow = landingRow + _indexOffset;
        
        
        GridCell targetCell = null; // Vind de daadwerkelijke cel op de landingspositie
        
        switch (_currentRotationState)
        {
            case 0: // Normale oriëntatie
                targetCell = GetCell("location", adjustedColumn, adjustedRow);
                break;
            case 1: // 90° met de klok mee. Bij 90° rotatie wordt (kolom, rij) → (rij, maxKolom - kolom)
                targetCell = GetCell("location", adjustedRow, _columns + 1 - adjustedColumn);
                break;
            case 2: // 180°. Bij 180° rotatie wordt (kolom, rij) → (maxKolom - kolom, maxRij - rij)
                targetCell = GetCell("location", _columns + 1 - adjustedColumn, _rows + 1 - adjustedRow);
                break;
            case 3: // 270° met de klok mee. Bij 270° rotatie wordt (kolom, rij) → (maxRij - rij, kolom)
                targetCell = GetCell("location", _rows + 1 - adjustedRow, adjustedColumn);
                break;
        }
        
        if (targetCell != null)
        {
            ghostPos = new Vector2(targetCell.Anchor.X, targetCell.Anchor.Y);// Gebruik de ankerpositie van de cel voor het spookstuk
            return ghostPos;
        }
        
        return Vector2.Zero; // Geen geldige positie gevonden
    }

    private bool ColumnFull()
    {
        if (GetCell("position", (int)_player.Position.X + (int)_topCellOffset.X, (int)_player.Position.Y + (int)_topCellOffset.Y).cellState != "Empty")
        {
            return true;
        }
        return false;
    }


    private void CheckForWinner(int column, int row, string team) // checkt of er 3 op een rij ligt voor een close call, en 4 op een rij voor een winnaar
    {
        int[] _checkCol = { 0, 0, -1, 1, 1, 1, -1, -1 }; // Deze twee arrays geven aan welke richting er gecheckt wordt
        int[] _checkRow = { -1, 1, 0, 0, -1, 1, 1, -1 }; // Omhoog, Omlaag, Links, Rechts, OmhoogRechts, OmlaagRechts, OmlaagLinks, OmhoogLinks

        for (int i = 0; i < _checkCol.Length; i++) // loopt door alle richtingen
        {
            var cell1 = GetCell("location", column - _checkCol[i], row - _checkRow[i]); // 1 cell terug
            var cell2 = GetCell("location", column + _checkCol[i], row + _checkRow[i]); // 1 cell vooruit
            var cell3 = GetCell("location", column + _checkCol[i] * 2, row + _checkRow[i] * 2); // 2 cells vooruit
            var cell4 = GetCell("location", column + _checkCol[i] * 3, row + _checkRow[i] * 3); // 3 cells vooruit

            if (cell1 != null && cell2 != null &&
                cell1.cellState == team && cell2.cellState == team) // close call check, kijkt 1 terug en 1 verder
            {
                _nearWins++;
            }

            if (cell2 != null && cell3 != null &&
                cell2.cellState == team && cell3.cellState == team) // close call check, kijkt 2 cells vooruit
            {
                _nearWins++;
            }

            if (cell1 != null && cell2 != null && cell3 != null &&
                cell1.cellState == team && cell2.cellState == team && cell3.cellState == team) // win check, kijkt 1 cell terug en 2 vooruit
            {
                GameManager.Instance.SendMatchData(_totalDrops, _totalRotations, _nearWins, team);
                GameEnvironment.GameStateManager.SwitchTo(GameStateManager.END_GAME_STATE);
                SelfDestruct();
            }

            if (cell2 != null && cell3 != null && cell4 != null &&
                cell2.cellState == team && cell3.cellState == team && cell4.cellState == team) // win check, kijkt 3 cells vooruit
            {
                GameManager.Instance.SendMatchData(_totalDrops, _totalRotations, _nearWins, team);
                GameEnvironment.GameStateManager.SwitchTo(GameStateManager.END_GAME_STATE);
                SelfDestruct();
            }
        }
    }

    private bool AnyBallsFalling()
    {
        foreach (GameObject child in children)
        {
            if (child is BallObject ballObject && ballObject.falling && !_rotating)
            {
                return true; // Als er een bal valt, return true
            }
        }
        return false; // Geen ballen vallen
    }

    private void SelfDestruct()
    {
        foreach (GameObject child in children)
        {
            Remove(child); // Verwijder alle cellen en ballen uit de grid
        }
    }
}