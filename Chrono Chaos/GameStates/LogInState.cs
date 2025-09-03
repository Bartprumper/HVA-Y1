using System;
using System.Diagnostics;
using System.Linq.Expressions;
using System.Net.Sockets;
using System.Numerics;
using BaseProject;
using Blok3Game.Engine.GameObjects;
using Blok3Game.Engine.Helpers;
using Blok3Game.Engine.JSON;
using Blok3Game.Engine.SocketIOClient;
using Blok3Game.Engine.UI;
using Microsoft.Xna.Framework.Input;

namespace Blok3Game.GameStates
{
    public class LogInState : GameObjectList
    {
        private TextInput username;
        private TextInput password;
        private TextGameObject instruction;

        private UIElement element;
        private Background caveBackground;
        public LogInState() : base()
        {           
            Add(caveBackground = new Background(new Vector2(0, 0), "cave"));
            HandleButtons();
            InputUsername(element);
            InputPassword(element);
         

            Add(instruction = new TextGameObject("Fonts/SpriteFont@20px", 1, "text"));
            instruction.Text = "Dont let your time run out, defeat enemies to gain more time.";
            instruction.Position = new Vector2(GameEnvironment.Screen.X / 2 - 400, 50);

            Add(instruction = new TextGameObject("Fonts/SpriteFont@20px", 1, "text"));
            instruction.Text = "Shooting is automatic, Aiming is done with the cursor";
            instruction.Position = new Vector2(GameEnvironment.Screen.X / 2 - 400, 100);

            Add(instruction = new TextGameObject("Fonts/SpriteFont@20px", 1, "text"));
            instruction.Text = "Sacrifice 10 seconds of your time left to buy upgrades at the book";
            instruction.Position = new Vector2(GameEnvironment.Screen.X / 2 - 400, 150);

            Add(instruction = new TextGameObject("Fonts/SpriteFont@20px", 1, "text"));
            instruction.Text = "Get the timer to 75 seconds to escape";
            instruction.Position = new Vector2(GameEnvironment.Screen.X / 2 - 400, 200);

            Add(instruction = new TextGameObject("Fonts/SpriteFont@20px", 1, "text"));
            instruction.Text = "Please enter your username and password";
            instruction.Position = new Vector2(GameEnvironment.Screen.X / 2 - 225, 340);

            Button login = new Button(new Vector2(GameEnvironment.Screen.X / 2 - 236, GameEnvironment.Screen.Y / 2 + 200), 0.25f, "Button_Big@1x4");
            login.Text = "login"; 
            
           
            login.Clicked += (sender) => 
            {

            Console.WriteLine(username.Text);

                DataPacket loginPacket = new LogInData 
                {
                   UserName = username.Text,
                   Password = password.Text
                };
                SocketClient.Instance.SendDataPacket(loginPacket);
            };
            Add(login); 
           


          
        }

        public override void HandleInput(InputHelper inputHelper)
        {
            base.HandleInput(inputHelper);
        }

        private void InputUsername(UIElement element)
        {
            Add(username = new TextInput(new Vector2(GameEnvironment.Screen.X / 2 - 189, GameEnvironment.Screen.Y / 2), 0.2f));
           //GameInfo.UserNames = username.Text;
           
        }

        private void InputPassword(UIElement element)
        {            
            Add(password = new TextInput(new Vector2(GameEnvironment.Screen.X / 2 - 189, GameEnvironment.Screen.Y / 2 + 50), 0.2f));
            //GameInfo.Passwords = password.Text;

        }

        private void HandleButtons()
        {
            Button toGame = new Button(new Vector2(GameEnvironment.Screen.X / 2 - 236, GameEnvironment.Screen.Y / 2 + 200), 0.25f, "Button_Big@1x4");
            toGame.Text = "Confirm";  
            toGame.Clicked += StartPlaying;
           
            Add(toGame);
            //SocketClient.Instance.SubscribeToDataPacket<LogInData>();

     


        }

        private void StartPlaying(UIElement element)
        {
            // plaats hier code om username & password op te slaan 
            // SocketClient.Instance.SendDataPacket(new LogInData(){UserName = "Weebie", Password = "Steve"});          
            GameEnvironment.GameStateManager.SwitchToState("GAME_STATE");
            
        }
    }
}
