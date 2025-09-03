using Blok3Game.Engine.JSON;
using Client.GameStates;

public class MatchData : DataPacket
{
    public int game_idMatch { get; set; }
    public int totalDrops { get; set; }
    public int totalRotations { get; set; }
    public int nearWins { get; set; }
    public string winner { get; set; }
    public MatchData() : base()
    {
        EventName = "matchdata";
    }
}
