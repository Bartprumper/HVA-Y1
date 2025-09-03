// Class voor de Speciale Enemy 
class SpecialEnemy extends Enemy
{
    constructor(x, y)
    {
        super(x, y)
        this.width = unitSize * 2
        this.height = unitSize * 2
        this.health = 8
    }

    draw()
    {
        // Uiterlijk van de SpecialEnemy
        stroke(0)
        fill(255, 0, 255)
        rect(this.x, this.y, this.width, this.height)
    }

    // Functie die collisions checkt
    checkCollision()
    {
        // Collision met Platformen
        for (let platform of platformen) 
            {
                if (this.onCollision(platform) == true) 
                {
                    // Blijft boven op het platform staan
                    if (this.pos.y + 25 <= platform.y) 
                    {
                        this.velocity.y = 0;
                        this.pos.y = platform.y - unitSize * 2;    
                    }
                    // Blijft links van de muur staan als deze er tegenaan loopt
                    else if (this.pos.x <= platform.x) 
                    {
                        this.velocity.x = 0;
                        this.pos.x = platform.x - unitSize * 2 - 0.5;
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
    }
    // Functie als Special Enemy verslagen
    defeated()
    {
        if(this.health <= 0 || this.pos.y >= 6000)
        {
            this.dropOrb();
            currentBossDefeated++
            enemies.splice(enemies.indexOf(this), 1)
            slimeDead.setVolume(0.3)
            slimeDead.play()
        }
    }

    // Functie die een Elemental Orb achterlaat nadat deze enemy is verslagen
    dropOrb()
    {
        
        let orb = new ElementalOrb(this.pos.x, this.pos.y);
        orbs.push(orb);
        
    }
}

// Water variant van de Speciale Enemy
class SpecialWaterEnemy extends SpecialEnemy
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
            image(waterSlime2, this.x, this.y, unitSize * 2, unitSize * 2)
        }
        else
        {
            image(waterSlime2, this.x - 10, this.y + 20, unitSize * 2 + 20, unitSize * 2 - 20)
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

    dropOrb()
    {
        
        let waterOrb = new WaterOrb(this.pos.x + unitSize, this.pos.y)
        orbs.push(waterOrb);
    }
}

// Aarde variant van de Speciale Enemy
class SpecialEarthEnemy extends SpecialEnemy
{
    constructor(x, y)
    {
        super(x, y, width, height)
        this.timer = 30
        this.currentImage = 1
        this.state = 4
        this.weak = 1
    }

    draw()
    {
        if(this.currentImage === 1)
        {
            image(earthSlime2, this.x, this.y, unitSize * 2, unitSize * 2)
        }
        else
        {
            image(earthSlime2, this.x - 10, this.y + 20, unitSize * 2 + 20, unitSize * 2 - 20)
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

    dropOrb()
    {
        let earthOrb = new EarthOrb(this.pos.x + unitSize, this.pos.y)
        orbs.push(earthOrb)
    }
}

// Vuur variant van de Speciale Enemy
class SpecialFireEnemy extends SpecialEnemy
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
            image(fireSlime2, this.x, this.y, unitSize * 2, unitSize * 2)
        }
        else
        {
            image(fireSlime2, this.x - 10, this.y + 20, unitSize * 2 + 20, unitSize * 2 - 20)
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

    dropOrb()
    {
        let fireOrb = new FireOrb(this.pos.x + unitSize, this.pos.y)
        orbs.push(fireOrb)
    }
}

// Lucht variant van de Speciale Enemy
class SpecialAirEnemy extends SpecialEnemy
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
            image(airSlime2, this.x, this.y, unitSize * 2, unitSize * 2)
        }
        else
        {
            image(airSlime2, this.x - 10, this.y + 20, unitSize * 2 + 20, unitSize * 2 - 20)
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

    dropOrb()
    {
        let airOrb = new AirOrb(this.pos.x + unitSize, this.pos.y)
        orbs.push(airOrb)
    }
}