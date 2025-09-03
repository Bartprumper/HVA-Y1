using System;
using System.Numerics;
using BaseProject;
using Blok3Game.Engine.GameObjects;
using Blok3Game.Engine.UI;

namespace Blok3Game.GameStates
{
    public class StartState : GameObjectList
    {
        private TextGameObject GameTitle;
        private Background caveBackground;
        public StartState() : base()
        {         
            Add(caveBackground = new Background(new Vector2(0, 0), "cave"));
            HandleButtons();  
            
            Add(GameTitle = new TextGameObject("Fonts/SpriteFont@20px", 1, "text"));
            GameTitle.Text = "Chrono Chaos";
            GameTitle.Position = new Vector2(GameEnvironment.Screen.X / 2 - 65, 100);
            

            
        }

        private void HandleButtons()
        {
            Button startbutton = new Button(new Vector2(GameEnvironment.Screen.X / 2 - 236, GameEnvironment.Screen.Y / 2), 0.25f, "Button_Big@1x4");
            startbutton.Text = "Start Playing";  
            startbutton.Clicked += Start;
            Add(startbutton);
            
            Button exitbutton = new Button(new Vector2(GameEnvironment.Screen.X / 2 - 236, GameEnvironment.Screen.Y / 2 + 80), 0.25f, "Button_Big@1x4");
            exitbutton.Text = "Exit Game";
            exitbutton.Clicked += Exit;
            Add(exitbutton);
        }

        private void Start(UIElement element)
        {
            GameEnvironment.GameStateManager.SwitchToState("LOGIN_STATE");
        }

        private void Exit(UIElement element)
        {
            Environment.Exit(0);
        }
    }
}
