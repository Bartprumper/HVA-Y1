using Blok3Game.Engine.AssetHandler;
using Blok3Game.Engine.GameObjects;
using Blok3Game.Engine.JSON;
using Blok3Game.Engine.SocketIOClient;
using Blok3Game.Engine.UI;
using Microsoft.Xna.Framework;

namespace Blok3Game.GameStates
{
    public class LobbyJoinGameState : MovableMenuItem
    {
        private TextGameObject title;
        private TextInput playerNameInput;
        private Button buttonJoin;

        public LobbyJoinGameState() : base()
        {
            playerNameInput = CreateTextInputField(new Vector2(420, 350), "Voer j e naam in");
            CreateButtons();
        }

        protected override void HandleIncomingMessages()
        {
            base.HandleIncomingMessages();

            SocketClient.Instance.SubscribeToDataPacket<EnterRoomData>(OnEnterRoomData);
            SocketClient.Instance.SubscribeToDataPacket<StartGameData>(OnStartGameDataReceived);
            SocketClient.Instance.SubscribeToDataPacket<RemoveRoomData>(OnRoomRemovedDataReceived);
        }

        private void OnRoomNoLongerAvailable(string roomId)
        {
            if (roomId == SocketClient.Instance.RoomId)
            {
                buttonJoin.Disabled = true;

                DisplayErrorMessage("Room no longer available", () =>
                {
                    nextScreenName = GameStateManager.LOBBY_JOIN_OR_CREATE_STATE;
                    SwitchToNextScreen();
                });
            }
        }

        private void OnStartGameDataReceived(StartGameData data)
        {
            OnRoomNoLongerAvailable(data.RoomId);
        }

        private void OnRoomRemovedDataReceived(RemoveRoomData data)
        {
            OnRoomNoLongerAvailable(data.RoomId);
        }

        private void OnEnterRoomData(EnterRoomData data)
        {
            if (data.Player.UserId == SocketClient.Instance.UserId)
            {
                nextScreenName = GameStateManager.LOBBY_WAIT_FOR_PLAYERS_STATE;
                SwitchToNextScreen();
            }
        }

        private void CreateButtons()
        {
            buttonJoin = CreateButton(new Vector2(420, 500), "Deelnemen", OnButtonJoinClicked);
            CreateButton(new Vector2(620, 500), "Annuleren", OnButtonCancelClicked);
        }

        private void OnButtonJoinClicked(UIElement element)
        {
            GameEnvironment.AssetManager.AudioManager.PlaySoundEffect("button_agree");
            SocketClient.Instance.SendDataPacket(new EnterRoomData()
            {
                RoomId = SocketClient.Instance.RoomId,
                Player = new PlayerData()
                {
                    Name = playerNameInput.Text
                }
            });
        }

        private void OnButtonCancelClicked(UIElement element)
        {
            GameEnvironment.AssetManager.AudioManager.PlaySoundEffect("button_cancel");
            nextScreenName = GameStateManager.GO_TO_PREVIOUS_SCREEN;
            SwitchToNextScreen();
        }

        public override void Reset()
        {
            base.Reset();

            if (title != null)
            {
                Remove(title);
            }
            title = CreateText("Fonts/SpriteFont", new Vector2(420, 250), $"JOIN ROOM {SocketClient.Instance.RoomId}");
        }
    }
}
