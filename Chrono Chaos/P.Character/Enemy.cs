using System;
using Blok3Game.Engine.GameObjects;
using Blok3Game.GameStates;
using Microsoft.Xna.Framework;

public class Enemy : AnimatedGameObject
{
private Player player;



private Vector2 target;

private Vector2 direction;

private CountTimer gameTimer;
private GameState gameState;

public float health = 3;

private bool cooldown = false;
private float countdown = 3;

private float moveSpeed = 125;
public bool invincible;
private int IframeTimer = 3; 
private float maxHealth;
    private Vector2 vector2;

    public Enemy(Vector2 vector2)
    {
        this.vector2 = vector2;
        
        //maxHealth = 10f;
    }

    public Enemy(Vector2 position, Player player, float health, float countdown, bool cooldown, CountTimer gameTimer, GameState gameState) : base(1, "Enemy") //geef de speler class mee als speler
    {   
        
        this.player = player; //defineer de speler
        Position = position; //defineer de vector positie, valt ook op speler
        this.health = health;
        this.cooldown = cooldown;
        this.countdown = countdown;
        this.gameTimer = gameTimer;
        this.gameState = gameState;
        maxHealth = health;
        
      
    
        Scale = 1f;  

        LoadAnimation("Images/Characters/vampireMonkeyDamage", "DamagedMonkey",true, 0.1f);
        LoadAnimation("Images/Characters/vampireMonkey", "Monkey",true, 0.1f);
        PlayAnimation("Monkey");
    }

    public override void Update(GameTime gameTime)
    {
      
        base.Update(gameTime);
        EnemyMove();
        CollidesWithPlayer(player, gameTime);
        Iframes(gameTime);
        panicState();

        
      
    }    

    public void EnemyMove(){
        /*if (BookList.openBook == false){*/
        target = player.Position;
        Vector2 delta = player.Position - Position; 
        float distance = delta.Length(); //Length gebruikt pythagoras

        if (distance >= 10){ //beweeg als de afstand groter is dan 4. Origin is in de top left corner

        direction = player.Position - Position; 

        direction.Normalize();
        Velocity = direction * moveSpeed;
        }
        else {
            Velocity = Vector2.Zero; //de vijand stopt met bewegen
        }


    }
        // if (BookList.openBook == true){
        // Velocity = Vector2.Zero;
        // }
    

    private void Iframes(GameTime gameTime)
    {
        if(invincible == true)
        {
            IframeTimer--;
            PlayAnimation("DamagedMonkey");
        }
        if(IframeTimer <= 0)
        {
            invincible = false;
            IframeTimer = 35;
            PlayAnimation("Monkey");
        }
    }

    private void panicState()
    {
        if(health < maxHealth / 2)
        {
            moveSpeed = 225;
            PlayAnimation("DamagedMonkey");
        }
    }


     public void CollidesWithPlayer(Player player, GameTime gameTime)
    {        
            if (CollidesWith(player)) 
            {
                if (countdown == 3){
                cooldown = true;
                }
                if (cooldown == true){
                    
                gameState.addFloatingTime("-5", player.Position, Color.Red);
                gameTimer.LoseTime(5);
                cooldown = false;
                
                }
                

                if (cooldown == false){
                    countdown -= (float)gameTime.ElapsedGameTime.TotalSeconds;
                if (countdown <= 0){
                countdown = 3;
                }
                }

            }                                         

            else if (CollidesWith(player) == false)
            {
                cooldown = false;
                countdown = 3;
            
            }
            }



        

            
               
   

}
