using System;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;


namespace Blok3Game.Engine.GameObjects
{
  public class CountTimer : GameObject
  {
    public float timeLeft; //variable tijd

    public bool pauseTimer = false;
 

    public CountTimer() //constructor
    {
      timeLeft = 30.0f; //begintijd 30 seconden
    }

    public override void Update(GameTime gameTime)
    {
      base.Update(gameTime);

      if (timeLeft == 30.0f)
      {
        timeLeft += 0.5f;
      }
      else if (timeLeft > 0)
      {
        if (pauseTimer == false)
        timeLeft -= (float)gameTime.ElapsedGameTime.TotalSeconds;        
        else 
        timeLeft -= 0;        
      }
      else 
      {
        timeLeft = 0;
      }


    }

    public void AddTime(float seconds)
    {
      if(timeLeft < 15)
      {
        seconds *= 1.3f;
      }
      timeLeft += seconds;
    }

    public void LoseTime(float seconds)
    {
      timeLeft -= seconds;
    }

    public float GettimeLeft()
    {
      return timeLeft;
    }

    public void Draw(SpriteBatch spriteBatch, SpriteFont timerFont, Vector2 position)
    {
      if (timerFont == null) //als font null is
      {
        throw new ArgumentNullException(nameof(timerFont), "SpriteFont cannot be null"); //stop met uitvoeren
      }
      spriteBatch.DrawString(timerFont, "Time left: " + timeLeft.ToString("00"), position, Color.White); 
      spriteBatch.DrawString(timerFont, $"Wave: {GameInfo.currentWave}", new Vector2(900, 10), Color.White);
      if(GameInfo.waveComplete == true)
      {
        spriteBatch.DrawString(timerFont, "Wave Complete!", new Vector2(450, 150), Color.White);
      }
    }
  }
}
