// Class voor de standaard Enemy
class Enemy extends Entity 
{
    constructor(x, y)
    {
        super(x, y, width, height)
        this.x = this.pos.x;
        this.y = this.pos.y;
        this.velocity = createVector(0, 0)
        this.width = unitSize;
        this.height = unitSize;
        this.health = 4
        this.detectRange = 400
        this.gravity = 0.3
        this.speed = 3
        this.onderlingCollision = false
    }

    draw()
    {
        stroke(0)
        fill(255, 0, 255)
        rect(this.pos.x, this.pos.y, unitSize, unitSize)
    }

    update()
    {
        // Beweegt alleen als er geen collision is met de Player
        if(this.onCollision(player) == false)
        {
            //if(this.onderlingCollision == false)
            
            // Beweegt alleen als Player binnen bereik is
            if(dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) <= this.detectRange)
            {
                // Beweegt naar links als de Player links staat 
                if(this.pos.x >= player.pos.x)
                {
                    this.velocity.x -= this.speed
                }
                // Beweegt naar rechts als de Player rechts staat
                if(this.pos.x <= player.pos.x)
                {
                    this.velocity.x += this.speed
                } 
            }
            else
            {
                this.velocity.x = 0
            }
        }
        else
        {
            this.velocity.x = 0
        }
        

        // Limiteerd de snelheid
        this.velocity.x = constrain(this.velocity.x, -this.speed, this.speed)
       
        
        // Zwaartekracht 
        this.velocity.y += this.gravity

        this.pos.add(this.velocity)
        this.x = this.pos.x
        this.y = this.pos.y

        this.defeated();
        
        
    }
    // Functie die damage regelt
    takeDamage(DMG)
    {
        this.health -= DMG
    }

    defeated()
    {
        if(this.health <= 0)
        {
            enemies.splice(enemies.indexOf(this), 1)
            currentDefeatedEnemies++;
            achievementmanager.ExcessiveViolence();
            slimeDead.setVolume(0.3);
            slimeDead.play();
        }
    }
    
    // Functie die collisions checkt
    checkCollision()
    {
        // Collisions met platformen
        for (let platform of platformen) 
        {
            if (this.onCollision(platform) == true) 
            {
                // Blijft boven op het platform staan
                if (this.pos.y + 20 <= platform.y) 
                {
                    this.velocity.y = 0;
                    this.pos.y = platform.y - unitSize;    
                }
                // Blijft links van de muur staan als deze er tegenaan loopt
                else if (this.pos.x <= platform.x) 
                {
                    this.velocity.x = 0;
                    this.pos.x = platform.x - unitSize - 0.5;
                }
                // Blijft rechts van de muur staan als deze er tegenaan loopt
                else if (this.pos.x >= platform.x) 
                {
                    this.velocity.x = 0;
                    this.pos.x = platform.x + unitSize + 0.5;
                }   
            }
        }
        
        for (let bullet of bullets)
        {
            if (this.onCollision(bullet) == true)
            {
                slimeHit.setVolume(0.5)
                slimeHit.play();
                if(this.state === bullet.state)
                {
                    this.takeDamage(0.5)
                }
                else if(bullet.state === this.weakness)
                {
                    this.takeDamage(2)
                }
                else if(this.state != bullet.state)
                {
                    this.takeDamage(1)
                }
                bullets.splice(bullets.indexOf(bullet), 1)
            }
        }

            

        // Stuk code die enemies niet laat overlappen

        // for (let other of enemies)
        //     {
        //         if(other !== this)
        //         {
        //             if(this.onCollision(other) == true)
        //             {
        //                     this.onderlingCollision = true
        //                      if (this.pos.x <= other.x) 
        //                     {
        //                         this.velocity.x = 0;
        //                         this.pos.x = other.x - unitSize - 0.5;
        //                         other.velocity.x = 0;
        //                         other.x = this.pos.x + unitSize + 0.5
        //                     }
        //                     else if (this.pos.x >= other.x) 
        //                     {
        //                         this.velocity.x = 0;
        //                         this.pos.x = other.x + unitSize + 0.5;
        //                         other.velocity.x = 0;
        //                         other.x = this.pos.x - unitSize - 0.5
        //                     }
        //             }
        //             else
        //             {
        //                 this.onderlingCollision = false;
        //             }
        //         }
        //     }
    }
}

// Water variant van de Enemy
class WaterEnemy extends Enemy
{
    constructor(x, y)
    {
        super(x, y, width, height)
        this.timer = 30
        this.currentImage = 1
        this.state = 2
        this.weakness = 4
    }

    draw()
    {
        if(this.currentImage === 1)
        {
            image(waterSlime1, this.x, this.y, unitSize, unitSize)
        }
        else
        {
            image(waterSlime1, this.x - 5, this.y + 10, unitSize + 10, unitSize - 10)
        }

        if(this.currentImage === 1)
        {
            if(this.timer >= 0)
            {
                this.timer -= 1
            }
            else
            {
                this.currentImage = 2
                this.timer = 25 + random(0, 15)
            }
            
        }
        else if(this.currentImage === 2)
        {
            if(this.timer >= 0)
            {
                this.timer -= 1
            }
            else
            {
                this.currentImage = 1
                this.timer = 25 + random(0, 15)
            }
        }
    }
}

// Aarde variant van de Enemy
class EarthEnemy extends Enemy
{
    constructor(x, y)
    {
        super(x, y, width, height)
        this.timer = 30
        this.currentImage = 1
        this.state = 4
        this.weakness = 1
    }

    draw()
    {
        if(this.currentImage === 1)
        {
            image(earthSlime1, this.x, this.y, unitSize, unitSize)
        }
        else
        {
            image(earthSlime1, this.x - 5, this.y + 10, unitSize + 10, unitSize - 10)
        }

        if(this.currentImage === 1)
        {
            if(this.timer >= 0)
            {
                this.timer -= 1
            }
            else
            {
                this.currentImage = 2
                this.timer = 25 + random(0, 15)
            }
            
        }
        else if(this.currentImage === 2)
        {
            if(this.timer >= 0)
            {
                this.timer -= 1
            }
            else
            {
                this.currentImage = 1
                this.timer = 25 + random(0, 15)
            }
        }
    }
}

// Vuur variant van de Enemy
class FireEnemy extends Enemy
{
    constructor(x, y)
    {
        super(x, y, width, height)
        this.timer = 30
        this.currentImage = 1
        this.state = 3
        this.weakness = 2
    }

    draw()
    {
        if(this.currentImage === 1)
        {
            image(fireSlime1, this.x, this.y, unitSize, unitSize)
        }
        else
        {
            image(fireSlime1, this.x - 5, this.y + 10, unitSize + 10, unitSize - 10)
        }

        if(this.currentImage === 1)
        {
            if(this.timer >= 0)
            {
                this.timer -= 1
            }
            else
            {
                this.currentImage = 2
                this.timer = 25 + random(0, 15)
            }
            
        }
        else if(this.currentImage === 2)
        {
            if(this.timer >= 0)
            {
                this.timer -= 1
            }
            else
            {
                this.currentImage = 1
                this.timer = 25 + random(0, 15)
            }
        }
    }
}

// Lucht variant van de Enemy
class AirEnemy extends Enemy
{
    constructor(x, y)
    {
        super(x, y, width, height)
        this.timer = 30
        this.currentImage = 1
        this.state = 1
        this.weakness = 3
    }

    draw()
    {
        if(this.currentImage === 1)
        {
            image(airSlime1, this.x, this.y, unitSize, unitSize)
        }
        else
        {
            image(airSlime1, this.x - 5, this.y + 10, unitSize + 10, unitSize - 10)
        }

        if(this.currentImage === 1)
        {
            if(this.timer >= 0)
            {
                this.timer -= 1
            }
            else
            {
                this.currentImage = 2
                this.timer = 25 + random(0, 15)
            }
            
        }
        else if(this.currentImage === 2)
        {
            if(this.timer >= 0)
            {
                this.timer -= 1
            }
            else
            {
                this.currentImage = 1
                this.timer = 25 + random(0, 15)
            }
        }
    }
}
