using System;
using System.Collections.Generic;
using System.Diagnostics;
using Blok3Game.Engine.GameObjects;
using Blok3Game.HUD;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Content;
using Microsoft.Xna.Framework.Graphics;


namespace Blok3Game.GameStates
{
    public class GameState : GameObjectList
    {
        private CountTimer gameTimer;
        private SpriteFont timerFont;

        private Player player;
        public Vector2 PlayerPosition => player.Position; //get speler positie
        public Player Player => player; //get speler

        private Background background;
        private BulletList bulletList;
        private EnemyList enemyList;
        private Enemy enemy;
         private ProgressBar progressBar;

         private Book book;

         private Bullet bullet;

         private BookList bookList;
         public bool objectsSpawned = false;
         private List<FloatingTime> floatingTimes = new List<FloatingTime>();

         private BulletSlot bulletSlot;
        private bool gameStart = false;
        private TimeSpan timePlayed;

         
        //grootte spelwereld
        private Vector2 worldSize = new Vector2(2960, 2060);
        public Vector2 WorldSize => worldSize;
        public GameState(SpriteFont font, ContentManager content) : base()
        {            
            timerFont = font;
            Add(progressBar = new ProgressBar(content, new Vector2(0, 730)));
            Add(bulletSlot = new BulletSlot(content, new Vector2(20, 50)));
        }
        public override void Update(GameTime gameTime)
        {
            if(!gameStart)
            {
                gameStart = true;
                GameInfo.timePlayed = TimeSpan.Zero;
            }

            GameInfo.timePlayed += gameTime.ElapsedGameTime;
            Console.WriteLine("time: " + timePlayed.TotalSeconds + " seconds");


            base.Update(gameTime);
            if(objectsSpawned == false)
            {
                SpawnObjects(timerFont);
                objectsSpawned = true;
            }
            else if(gameTimer.timeLeft <= 0)
            {
                GameInfo.gameResult = "You lost!";
                objectsSpawned = false;
                ResetGame();
                GameEnvironment.GameStateManager.SwitchToState("END_STATE");
                
            }
            else if(gameTimer.timeLeft >= 75)
            {
                GameInfo.gameResult="You won!";
                objectsSpawned = false;
                ResetGame();
                GameEnvironment.GameStateManager.SwitchToState("END_STATE");
            }

            foreach(var text in floatingTimes)
            {
                text.Update(gameTime);
            }
            floatingTimes.RemoveAll(text => !text.Visible);
        }

        public override void Draw(GameTime gameTime, SpriteBatch spriteBatch)
        {
            
            base.Draw(gameTime, spriteBatch);
            //gameTimer.Draw(spriteBatch, timerFont, new Vector2(350, 20)); //timer 
            //progressBar.Draw(spriteBatch); //progress bar
            foreach(var text in floatingTimes)
            {
                text.Draw(gameTime, spriteBatch);
            }

            //bulletSlot.Draw(gameTime, spriteBatch);
        }
        
        private void SpawnObjects(SpriteFont font)
        {
            timerFont = font ?? throw new ArgumentNullException(nameof(font), "SpriteFont cannot be null");
            Add(gameTimer = new CountTimer());
            Add(background = new Background(new Vector2(0, 0), "dungeon")); 
            Add(player = new Player(new Vector2(500, 400), book, bookList));   
            Add(bulletList = new BulletList(player));
            Add(enemyList = new EnemyList(enemy, player, bulletList, bullet, progressBar, gameTimer, this)); 
            Add(bookList = new BookList(player, bulletList, gameTimer, this));
        }

        public void addFloatingTime(string text, Vector2 position, Color color)
        {
            floatingTimes.Add(new FloatingTime(text, position, color, timerFont, 0.5f));
        }

        public void DrawHUD(SpriteBatch spriteBatch)
        {
            //blijft op vaste positie
            gameTimer.Draw(spriteBatch, timerFont, new Vector2(470, 20));
            progressBar.Draw(spriteBatch);
            bulletSlot.Draw(spriteBatch);
        }

        public void PlayerBuysItem(int itemID)
        {
            bulletSlot.ActivateSlot(itemID);
        }

        private void ResetGame()
        {
            Remove(player);
            Remove(bulletList);
            Remove(enemyList);
            Remove(bookList);
            progressBar.Increase(0);
            bulletSlot.RemoveAll();
        }
    }
}
