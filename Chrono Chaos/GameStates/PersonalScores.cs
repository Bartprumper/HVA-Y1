using System.Numerics;
using Blok3Game.Engine.GameObjects;
using Blok3Game.Engine.UI;

namespace Blok3Game.GameStates
{
    public class PersonalScores : GameObjectList 
    {
        public PersonalScores() : base()
        {
            HandleButtons();
        }

        private void HandleButtons()
        {
            Button backButton = new Button(new Vector2(GameEnvironment.Screen.X / 2 - 125, GameEnvironment.Screen.Y / 2 + 150), 0.25f, "Button@1x4");
            backButton.Text = "Back";
            backButton.Clicked += BackToEndState;
            Add(backButton);
        }

        private void BackToEndState(UIElement element)
        {
            GameEnvironment.GameStateManager.SwitchToState("END_STATE");
        }


    }
}