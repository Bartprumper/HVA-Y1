using Client.GameStates;

namespace Blok3Game.Engine.JSON
{
    public class StartGameData : DataPacket
    {
        public int IdMatch { get; set; }
        public string RoomId { get; set; }
        public string UserId { get; set; }
        public Team Team { get; set; }
        
        public StartGameData() : base()
        {
            EventName = "start game";
        }
    }
}
