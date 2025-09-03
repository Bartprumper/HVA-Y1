using System;
using Blok3Game.GameStates;

namespace Blok3Game.Engine.JSON;

public class HighscoreDataPacket : DataPacket
{
    public int DeadEnemies { get; set; }
    public int WavesPlayed { get; set; }
    public TimeSpan TimePlayed { get; set; }

    public HighscoreDataPacket() : base()
    {
        EventName = "Highscores";

    }
}