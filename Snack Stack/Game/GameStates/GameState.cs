using Blok3Game.Engine.GameObjects;
using Blok3Game.Game.UI;
using Client.GameStates;
using Microsoft.VisualBasic;
using Microsoft.Xna.Framework;

namespace Blok3Game.GameStates
{
    public class GameState : GameObjectList
    {
        private int _rows = 7; 
        private int _columns = 7;
        private Grid _grid;
        private Player _player;
        private GameManager _gameManager;
        private AnimatedPlayer _animatedPlayerNL;
        private AnimatedPlayer _animatedPlayerBE;
        private SpriteGameObject _background;

        // chatbalk variabelen
        private ChatBalk _chatBalk;
        private Vector2 _chatBalkPosition = new Vector2(410, 810); // Positie van de chatbalk
        private float _chatBalkScale = 0.3f; // Schaal van de chatbalk
        private int _chatBalkMaxCharacters = 80; // Maximum aantal karakters in de chatbalk
        public GameState() : base()
        {
            // Initialiseer de achtergrond
            _background = new SpriteGameObject("Images/UI/GameBackground", 0, "background");
            Add(_background);
            // Initialiseer de GameManager
            _gameManager = new GameManager();
            Add(_gameManager);

            // Initialize the grid first
            _grid = new Grid(_rows, _columns); // 7 rijen, 7 kolommen
            Add(_grid);

            // Initialize the player with a reference to the grid
            _player = new Player(_grid);
            Add(_player);

            // Set the player reference in the grid
            _grid.SetPlayer(_player);

            _chatBalk = new ChatBalk(_chatBalkPosition, _chatBalkScale, _chatBalkMaxCharacters);
            _gameManager.chatBalk = _chatBalk;
            _chatBalk.SetParent(this);
            _chatBalk.SetGrid(_grid);
            Add(_chatBalk);

            // --- Add AnimatedPlayers for both teams ---
            _animatedPlayerNL = new AnimatedPlayer(Team.Nederland);
            _animatedPlayerBE = new AnimatedPlayer(Team.Belgie);
            _gameManager.nederlandPlayer = _animatedPlayerNL;
            _gameManager.belgiePlayer = _animatedPlayerBE;
            Add(_animatedPlayerNL);
            Add(_animatedPlayerBE);
        }
    }
}
