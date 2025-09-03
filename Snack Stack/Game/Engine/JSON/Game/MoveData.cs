using Blok3Game.Engine.JSON;
using Client.GameStates;

public class MoveData : DataPacket
{
    public int game { get; set; }
    public int turn { get; set; }
    public Team team { get; set; }
    public int selectedColumn { get; set; }
    public MoveData() : base()
    {
        EventName = "move";
    }
}
