using System;
using Blok3Game.Engine.AssetHandler;
using Blok3Game.Engine.JSON;
using Blok3Game.Engine.SocketIOClient;
using Blok3Game.GameStates;
using Microsoft.Xna.Framework;

namespace BaseProject
{
    public class Game : GameEnvironment
    {
        protected override void LoadContent()
        {
            base.LoadContent();

            screen = new Point(1200, 900);
            ApplyResolutionSettings();

            GameStateManager.AddGameState(GameStateManager.LOBBY_JOIN_OR_CREATE_STATE, new LobbyJoinOrCreateState());
            GameStateManager.AddGameState(GameStateManager.LOBBY_CREATE_GAME_STATE, new LobbyCreateGameState());
            GameStateManager.AddGameState(GameStateManager.LOBBY_JOIN_GAME_STATE, new LobbyJoinGameState());
            GameStateManager.AddGameState(GameStateManager.LOBBY_WAIT_FOR_PLAYERS_STATE, new LobbyWaitForPlayersState());
            GameStateManager.AddGameState(GameStateManager.MAIN_MENU_STATE, new MainMenu());
            GameStateManager.AddGameState(GameStateManager.HOW_TO_PLAY_STATE, new HowToPlayMenu());
            GameStateManager.AddGameState(GameStateManager.GAME_STATE, new GameState());
            GameStateManager.AddGameState(GameStateManager.END_GAME_STATE, new EndGameScreen());
            GameStateManager.SwitchTo(GameStateManager.MAIN_MENU_STATE);
        }

		protected override void OnExiting(object sender, EventArgs args)
		{
			base.OnExiting(sender, args);

			SocketClient.Instance.SendDataPacket(new LeaveRoomData());
		}
	}
}
