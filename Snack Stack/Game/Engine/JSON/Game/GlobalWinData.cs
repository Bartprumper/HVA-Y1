using Blok3Game.Engine.JSON;

public class GlobalWinData : DataPacket
{
    public int nlwins { get; set; }
    public int bewins { get; set; }
    public GlobalWinData() : base()
    {
        EventName = "globalwins";
    }
}