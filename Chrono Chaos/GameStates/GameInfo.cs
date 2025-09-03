using System;
using System.Diagnostics;
using Blok3Game.Engine.GameObjects;
using Blok3Game.HUD;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;

public static class GameInfo
{
    public static string gameResult = "Test";

    public static int currentWave;
    public static bool waveComplete = false;
    public static int deadEnemy = 0;
    public static int waveIncrease = 0;

    public static TimeSpan timePlayed = TimeSpan.Zero;
}