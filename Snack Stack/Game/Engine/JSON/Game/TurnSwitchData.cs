using Blok3Game.Engine.JSON;
using Client.GameStates;
public class TurnSwitchData : DataPacket
{
    public int game { get; set; }
    public Team fromTeam { get; set; }
    public Team toTeam { get; set; }
    public int turn { get; set; }
    public TurnSwitchData() : base()
    {
        EventName = "turn switched";
    }
}