using Blok3Game.Engine.JSON;
using Client.GameStates;
public class EmoteData : DataPacket
{
    public int game { get; set; }
    public Team senderTeam { get; set; }
    public Team receiverTeam { get; set; }
    public string emote { get; set; }
    public float duration { get; set; }

    public EmoteData()
    {
        EventName = "emoteData";
    }
}