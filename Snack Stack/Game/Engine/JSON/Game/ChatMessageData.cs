using Blok3Game.Engine.JSON;
using Client.GameStates;
public class ChatMessageData : DataPacket
{
    public int game { get; set; }
    public Team fromTeam { get; set; }
    public Team toTeam { get; set; }
    public string message { get; set; }  

    public ChatMessageData() : base()
    {
        EventName = "chat message";
    }
}