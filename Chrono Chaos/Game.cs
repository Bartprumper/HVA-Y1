using System;
using System.Runtime.CompilerServices;
using Blok3Game.Engine.Helpers;
using Blok3Game.Engine.SocketIOClient;
using Blok3Game.GameStates;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Blok3Game.Engine.GameObjects;
using Blok3Game.Engine.AssetHandler;

using Microsoft.Xna.Framework.Input;


namespace BaseProject //Release version
{
    
    public class Game : GameEnvironment
    {
        private SpriteFont timerFont; //font voor timer
        public Game() : base()
        {
            Content.RootDirectory = "Content";
            IsMouseVisible = true;
            SocketClient.Instance.Initialize();
        }

        protected override void LoadContent()
        {
            base.LoadContent();
			
            screen = new Point(1024, 768);
            ApplyResolutionSettings();

            timerFont = Content.Load<SpriteFont>("Fonts/SpriteFont");

            GameStateManager.AddGameState("GAME_STATE", new GameState(timerFont, Content));
            GameStateManager.AddGameState("START_STATE", new StartState());
            GameStateManager.AddGameState("END_STATE", new EndState());
            GameStateManager.AddGameState("LOGIN_STATE", new LogInState());
            GameStateManager.SwitchToState("START_STATE");
            GameStateManager.AddGameState("PERSONAL_STATE", new PersonalScores());
            GameStateManager.AddGameState("HIGHSCORES_STATE", new Highscores());

            // Add an event handler for when the game exits.
            Exiting += new EventHandler<ExitingEventArgs>(Game_Exiting);
        }

        private void Game_Exiting(object sender, ExitingEventArgs e)
        {
            SocketClient.Instance.Disconnect();
        }
    }
}