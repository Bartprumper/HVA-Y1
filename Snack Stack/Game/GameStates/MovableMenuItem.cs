using Blok3Game.Engine.GameObjects;
using Blok3Game.Engine.JSON;
using Blok3Game.Engine.SocketIOClient;
using Blok3Game.Engine.UI;
using Microsoft.Xna.Framework;
using System;
using System.Collections.Generic;

namespace Blok3Game.GameStates
{
    public class MovableMenuItem : GameObjectList
    {
        private SpriteGameObject background;
        protected const float BUTTON_SCALE = 0.3f;

        protected List<Button> buttons;
        protected List<TextInput> textInputs;
        protected List<TextGameObject> texts;
        protected string nextScreenName;

        public event Action OnActive;
        public event Action OnOffscreen;

        public MovableMenuItem() : base()
        {
            InitializeVisualElements();
            HandleIncomingMessages();

            OnActive += OnMenuItemStateActive;
            OnOffscreen += OnMenuItemOffscreen;
        }

        private void InitializeVisualElements()
        {
            CreateBackground();

            buttons = new List<Button>();
            textInputs = new List<TextInput>();
            texts = new List<TextGameObject>();
        }

        protected virtual void HandleIncomingMessages()
        {
            SocketClient.Instance.SubscribeToDataPacket<ErrorData>(OnErrorMessageDataReceived);
        }

        private void OnErrorMessageDataReceived(ErrorData data)
        {
            if (IsActive)
            {
                DisplayErrorMessage(data.Reason);
            }
        }

        protected void DisplayErrorMessage(string message, Action onMessageDisappeared = null)
        {
            ErrorMessage errorMessage = new ErrorMessage(message);
            errorMessage.Position = new Vector2()
            {
                X = (GameEnvironment.Screen.X - errorMessage.Size.X) / 2,
                Y = (GameEnvironment.Screen.Y - errorMessage.Size.Y) / 2 - 150
            };

            errorMessage.OnTimerEnd += (ErrorMessage errorMessage) =>
            {
                Remove(errorMessage);
                onMessageDisappeared?.Invoke();
            };
            Add(errorMessage);
        }

        protected void AddButton(Button button)
        {
            Add(button);
            buttons.Add(button);
        }

        protected void AddTextInput(TextInput textInput)
        {
            Add(textInput);
            textInputs.Add(textInput);
        }

        protected void AddText(TextGameObject text)
        {
            Add(text);
            texts.Add(text);
        }

        protected virtual void OnMenuItemStateActive()
        {
            foreach (Button button in buttons)
            {
                button.Disabled = false;
            }
        }

        protected virtual void OnMenuItemOffscreen()
        {
            foreach (Button button in buttons)
            {
                button.Disabled = true;
            }

            GameEnvironment.GameStateManager.SwitchTo(nextScreenName);
        }

        private void CreateBackground()
        {
            background = new SpriteGameObject("Images/UI/SnackBackground2_1200x900", 0, "background");
            background.Scale = 1.0f;
            background.Position = new Vector2(0, 0);
            Add(background);
        }

        public override void Reset()
        {
            base.Reset();
            OnActive?.Invoke();
        }

        protected TextGameObject CreateText(string font, Vector2 position, string text)
        {
            TextGameObject textObject = new TextGameObject(font, 1, "text");
            textObject.Position = position;
            textObject.Color = Color.Black;
            textObject.Text = text;
            Add(textObject);
            return textObject;
        }

        protected TextInput CreateTextInputField(Vector2 position, string accompanyingText)
        {
            CreateText("Fonts/SpriteFont", position - Vector2.UnitY * 5, accompanyingText);
            TextInput textInput = new TextInput(position);
            AddTextInput(textInput);
            return textInput;
        }
        protected void SwitchToNextScreen()
        {
            if (!string.IsNullOrEmpty(nextScreenName))
            {
                GameEnvironment.GameStateManager.SwitchTo(nextScreenName);
            }
        }

        protected Button CreateButton(Vector2 position, string text, Action<UIElement> onPressed, float scale = BUTTON_SCALE, string imageName = "Kroket")
        {
            Button button = new Button(position, scale, imageName);
            button.Text = text;
            button.Clicked += onPressed;
            AddButton(button);
            return button;
        }

        public bool IsActive => true; // Always active since animation is removed
    }
}
