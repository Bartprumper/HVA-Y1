using Blok3Game.Engine.AssetHandler;
using Blok3Game.Engine.JSON;
using Blok3Game.Engine.SocketIOClient;
using Blok3Game.Engine.UI;
using Microsoft.Xna.Framework;

namespace Blok3Game.GameStates
{
    public class LobbyCreateGameState : MovableMenuItem
    {
        TextInput gameNameInput, playerNameInput;
        public LobbyCreateGameState() : base()
        {
            playerNameInput = CreateTextInputField(new Vector2(400, 250), "Voer j e naam in");
            gameNameInput = CreateTextInputField(new Vector2(400, 350), "Voer de naam van de kamer in");
            
            playerNameInput.Clicked += OnTextInputClicked;
            gameNameInput.Clicked += OnTextInputClicked;

            gameNameInput.UIElementState = UIElementMouseState.Disabled;
            CreateButtons();
        }

        private void OnRoomCreatedDataReceived(CreateRoomData data)
        {
			string userId = SocketClient.Instance.UserId;

            if (data.Author == userId)
            {
                SocketClient.Instance.RoomId = data.RoomId; // Zet de roomId alleen als de author de room heeft gemaakt
                SocketClient.Instance.SendDataPacket(new EnterRoomData()
                {
                    RoomId = data.RoomId,
                    Player = new PlayerData()
                    {
                        Name = playerNameInput.Text,
                        UserId = userId
                    }
                });
                nextScreenName = GameStateManager.LOBBY_WAIT_FOR_PLAYERS_STATE;
                SwitchToNextScreen();
            }
        }

        protected override void HandleIncomingMessages()
        {
			base.HandleIncomingMessages();
            SocketClient.Instance.SubscribeToDataPacket<CreateRoomData>(OnRoomCreatedDataReceived);
        }

        private void CreateButtons()
        { 
            Button buttonCreate = CreateButton(new Vector2(400, 450), "Open kamer", OnButtonCreateClicked);
            Button buttonCancel = CreateButton(new Vector2(600, 450), "Annuleren", OnButtonCancelClicked);
        }

        private void OnButtonCreateClicked(UIElement element)
        {
			GameEnvironment.AssetManager.AudioManager.PlaySoundEffect("button_agree");
            SocketClient.Instance.SendDataPacket(new CreateRoomData() 
            {
                RoomId = gameNameInput.Text 
            });
        }

        private void OnButtonCancelClicked(UIElement element)
        {
            GameEnvironment.AssetManager.AudioManager.PlaySoundEffect("button_cancel");
            nextScreenName = GameStateManager.GO_TO_PREVIOUS_SCREEN;
            SwitchToNextScreen();
        }

        private void OnTextInputClicked(UIElement uiElement)
        {
            foreach (TextInput textInput in textInputs)
            {
                textInput.UIElementState = UIElementMouseState.Disabled;
            }

            uiElement.UIElementState = UIElementMouseState.Normal;
        }
    }
}
