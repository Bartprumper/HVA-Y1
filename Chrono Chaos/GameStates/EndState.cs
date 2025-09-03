using System;
using System.Numerics;
using Blok3Game.Engine.GameObjects;
using Blok3Game.Engine.JSON;
using Blok3Game.Engine.SocketIOClient;
using Blok3Game.Engine.UI;

namespace Blok3Game.GameStates
{

    public class EndState : GameObjectList
    {
        private TextGameObject GameOver;
        private float distance = 220;
        private Background caveBackground;
        public EndState() : base()
        {         
            Add(caveBackground = new Background(new Vector2(0, 0), "cave"));
            HandleButtons();
            Add(GameOver = new TextGameObject("Fonts/SpriteFont@20px", 0, "text"));
            GameOver.Text = GetResult();
            GameOver.Position = new Vector2(GameEnvironment.Screen.X / 2 - 40, 100);
            
        }

        private void HandleButtons()
        {

            Button personalButton = new Button(new Vector2(GameEnvironment.Screen.X / 2 - 450, GameEnvironment.Screen.Y / 2 + 150), 0.25f, "Button@1x4");
            personalButton.Text = "Personal scores";
            //personalButton.Clicked += PersonalScores;
            personalButton.Clicked += (sender) =>
            {
                DataPacket highscorePacket = new HighscoreDataPacket
                {
                    
                    DeadEnemies = GameInfo.deadEnemy,
                    WavesPlayed = GameInfo.waveIncrease,
                    TimePlayed = GameInfo.timePlayed

                };
                SocketClient.Instance.SendDataPacket(highscorePacket);
            };
            Add(personalButton);

            Button highscoresButton = new Button(new Vector2(GameEnvironment.Screen.X / 2 - 450 + distance, GameEnvironment.Screen.Y / 2 + 150), 0.25f, "Button@1x4");
            highscoresButton.Text = "Highscores";
            highscoresButton.Clicked += Highscores;
            Add(highscoresButton);

            Button toMainMenu = new Button(new Vector2(GameEnvironment.Screen.X / 2 - 450 + distance * 2, GameEnvironment.Screen.Y / 2 + 150), 0.25f, "Button@1x4");
            toMainMenu.Text = "Return to menu";  
            toMainMenu.Clicked += BackToMenu;
            Add(toMainMenu);

            Button exitbutton = new Button(new Vector2(GameEnvironment.Screen.X / 2 - 450  + distance * 3, GameEnvironment.Screen.Y / 2 + 150), 0.25f, "Button@1x4");
            exitbutton.Text = "Exit Game";
            exitbutton.Clicked += Exit;
            Add(exitbutton);
        }

        private void BackToMenu(UIElement element)
        {
            GameEnvironment.GameStateManager.SwitchToState("START_STATE");
        }

        private void Exit(UIElement element)
        {
            Environment.Exit(0);
        }

        private void PersonalScores(UIElement element)
        {
             GameEnvironment.GameStateManager.SwitchToState("PERSONAL_STATE");
        }

        private void Highscores(UIElement element)
        {
             GameEnvironment.GameStateManager.SwitchToState("HIGHSCORES_STATE");
        }

        public override void Update(Microsoft.Xna.Framework.GameTime gameTime)
        {
            base.Update(gameTime);
            GameOver.Text = GetResult();
        }

        private string GetResult()
        {
            return GameInfo.gameResult;
        }
    }
}
