using Blok3Game.Engine.JSON;
using Client.GameStates;

public class DirectionData : DataPacket
{
    public string direction { get; set; }
    public DirectionData() : base()
    {
        EventName = "rotation";
    }
}
