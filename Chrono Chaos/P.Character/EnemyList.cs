using System;
using System.Threading;
using Blok3Game.Engine.GameObjects;
using Blok3Game.GameStates;
using Blok3Game.HUD;
using Microsoft.Xna.Framework;

public class EnemyList : GameObjectList
{
     private Player player;

    private Enemy enemy;
    private BulletList bullets;

    private Bullet bullet;
    public bool endGame = false;

    private float nextEnemy; //De waarde die bijhoudt hoeveel tijd voorbij is gegaan

    private int spawnEnemy = 0;

    public float deadEnemy = 0;

    private float waveCap = 5;

    private ProgressBar progressBar; 

    private CountTimer gameTimer;
    private GameState gameState;
    private float health = 3;
    private bool cooldown = false;
    private float countdown = 3; 

    private float damageValue = 1;

    private float waveTimer = 3.0f;
    private int waveIncrease = 0;
    private int enemyValue = 2;
    private int valueIncrease = 0;
    private int waveNum = 1;

    //public float DeadEnemies => deadEnemy;
    //public int WavesPlayed => waveIncrease;


    public EnemyList(Enemy enemy, Player player, BulletList bullets, Bullet bullet, ProgressBar progressBar, CountTimer gameTimer, GameState gameState) : base()
    {
        this.enemy = enemy;
        this.player = player;
        this.bullet = bullet;
        this.bullets = bullets;
        this.progressBar = progressBar;
        this.gameTimer = gameTimer;
        this.gameState = gameState;
    }

    public override void Update(GameTime gameTime)
    {
        base.Update(gameTime);
        nextEnemy += (float)gameTime.ElapsedGameTime.TotalSeconds; //Hier wordt de waarde ge-update
        EnemySpawn(enemy, gameTime); //De code die de vijand spawnt
        SpawnEnemy(); 
        CollidesWithBullet();    
        NextWave(gameTime);
        enemyValueIncrease();
        GameInfo.currentWave = waveNum;

        
        
        
        if(waveTimer > 0 && waveTimer < 3)
        {
            GameInfo.waveComplete = true;
        }
        else
        {
            GameInfo.waveComplete = false;
        }
    
    }

            
    public bool CollidesWithBullet()
    {
        foreach (GameObject obj in children)
        {
            if (obj is Enemy enemy)
            {
                foreach (GameObject obj2 in bullets.Children)
                {
                    if (obj2 is Bullet bullet && (obj as Enemy).CollidesWith(obj2 as Bullet))
                    {
                        if (enemy.invincible == false)
                        {
                            bullets.Remove(obj2);
                            enemy.health -= damageValue;
                            enemy.invincible = true;
                            if (bullet.effects == true)
                            {
                                BulletManager.onHitLocation = obj2.Position;
                                bullets.OnHitEffects();
                            }
                        }
                        
                        if (enemy.health <= 0) //gezamelijke health. Niet enemy health
                        { 
                            gameState.addFloatingTime($"+{enemyValue}", enemy.Position, Color.LimeGreen);           
                            gameTimer.AddTime(enemyValue);   
                            Remove(obj);
                            GameInfo.deadEnemy += 1;
                            deadEnemy += 1;
                            progressBar.Increase(deadEnemy / waveCap * 100);                          
                        }

                        
                        return true;
                    }
                }
            }           
        }
        return false;
    } //momenteel is de game praktisch gezien unplayable omdat je de vijanden niet snel genoeg dood krijgt

    public void NextWave(GameTime gameTime){
        if (spawnEnemy == waveCap && Children.Count <= 0 && waveTimer >= 0){
            gameTimer.pauseTimer = true;
            waveTimer -= (float)gameTime.ElapsedGameTime.TotalSeconds;
            
            if (waveTimer <= 0){
            gameTimer.pauseTimer = false;
            spawnEnemy = 0;
            deadEnemy = 0;
            waveTimer = 3.0f;
            progressBar.Increase(0);
            GameInfo.waveIncrease += 1;
            waveIncrease++;
            waveCap += waveIncrease;
            valueIncrease++;
            waveNum++;
            
            }

        }
    }

    private void enemyValueIncrease()
    {
        if(valueIncrease == 3)
        {
            health++;
            enemyValue++;
            valueIncrease = 0;
        }
    }

    


    public void EnemySpawn(Enemy enemy, GameTime gameTime)
    {
        
        if (nextEnemy >= 1 && spawnEnemy != waveCap /*&& BookList.openBook == false*/) //open book veranderen naar een algemene pauze parameter
        {
            int placement = GameEnvironment.Random.Next(0, 10);            

            if (placement < 5){                
            Add(new Enemy(new Vector2(
            GameEnvironment.Random.Next((int)player.Position.X + 150, (int)player.Position.X + 550), //randomized locatie
            GameEnvironment.Random.Next((int)player.Position.Y - 550, (int)player.Position.Y + 550)), 
            player, health, countdown, cooldown, gameTimer, gameState));
           
            nextEnemy = 0; 
            spawnEnemy += 1;
            }
            else if (placement >= 5)
            {
                Add(new Enemy(new Vector2(
                GameEnvironment.Random.Next((int)player.Position.X - 550, (int)player.Position.X - 150), //randomized locatie
                GameEnvironment.Random.Next((int)player.Position.Y - 550, (int)player.Position.Y + 550)),
                player, health, countdown,cooldown, gameTimer, gameState));

                nextEnemy = 0; 
                spawnEnemy += 1;
            }
        
        }
    }

    public float SpawnEnemy() //is de return wel nodig?
    {
        return nextEnemy;
    }

    

   
}


