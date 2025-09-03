let orbs = [];

class ElementalOrb extends Entity
{
    constructor(x, y, activeState)
    {
        super(x, y, width, height, activeState)
        this.x = this.pos.x;
        this.y = this.pos.y;
        this.velocity = createVector(0, 0);
        this.width = unitSize / 2;
        this.height = unitSize / 2;
        this.diameter = unitSize;
        this.gravity = 0.3;
        this.currentState = activeState;
    }

    update()
    {
        // Heeft zwaartekracht
        this.velocity.y += this.gravity
        this.pos.add(this.velocity)

        // Wordt op de player gezet als de Orb van de map valt
        if(this.pos.y >= 6000)
        {
            this.pos.x = player.pos.x + 25
            this.pos.y = player.pos.y
        }

        this.x = this.pos.x
        this.y = this.pos.y
    }

    draw()
    {
        stroke(0)
        fill(255, 0, 255)
        circle(this.pos.x, this.pos.y, this.diameter)
    }

    checkCollision()
    {
        // Blijft op platformen liggen
        for (let platform of platformen)
        {
            if(this.onCollision(platform) == true) //Dit zorgt ervoor dat de orb op de grond blijft liggen
            {
                if(this.pos.y <= platform.y)
                {
                    this.velocity.y = 0;
                    this.pos.y = platform.y - 25
                }
            }
        }

        if (this.circleCollision(player)) //Als de speler collision heeft met de orb, dan unlocked deze een state. En word de orb weggehaald
        {
            grabOrb.setVolume(0.5)
            grabOrb.play();
            elementCounter++
            unlockedStates[this.currentState] = true; 
            player.playerState = this.currentState;
            player.checkState();
            orbs.splice(orbs.indexOf(this), 1);
            popup.unlockedAbility = true;
        }
    }
}

// Water variant
class WaterOrb extends ElementalOrb
{
    constructor(x, y)
    {
        super(x, y, 2);
        this.currentState = 2;
    }

    draw()
    {
        image(waterOrbImg, this.pos.x - 25, this.pos.y - 25, unitSize, unitSize)
    }
}

// Aarde variant
class EarthOrb extends ElementalOrb
{
    constructor(x, y)
    {
        super(x, y, 4);
        this.currentState = 4;
    }

    draw()
    {
        image(earthOrbImg, this.pos.x - 25, this.pos.y - 25, unitSize, unitSize)
    }
}

// Vuur variant
class FireOrb extends ElementalOrb
{
    constructor(x, y)
    {
        super(x, y, 3);
        this.currentState = 3;
    }

    draw()
    {
        image(fireOrbImg, this.pos.x - 25, this.pos.y - 25, unitSize, unitSize)
    }
}

// Lucht variant
class AirOrb extends ElementalOrb
{
    constructor(x, y)
    {
        super(x, y, 1);
        this.currentState = 1;
    }

    draw()
    {
        image(airOrbImg, this.pos.x - 25, this.pos.y - 25, unitSize, unitSize)
    }
}

