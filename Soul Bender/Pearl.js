let pearlImgWidth = 50;
let pearlImgHeight = 50
let pearlArray = [];
let pearlImg;
let pearlSpeed = 10; //Pearl zijn snelheid op de x as
let pearlFallSpeed = 2; //Hoe snel de pearl valt

class Pearl extends Entity //Pearl erft over van entity
{
    constructor(x, y, currentState, whichSide)
    {
        super(x, y, pearlImgWidth, pearlImgHeight, currentState); //Geeft variabelen door aan de parent class
        this.velocity = createVector(whichSide * pearlSpeed, pearlFallSpeed); //Zet zijn velocity op de juiste kant en snelheid
    }

    draw()
    {
        image(waterOrbImg, this.pos.x, this.pos.y, this.width, this.height);
    }

    update()
    {
        this.pos.x += this.velocity.x; //Voegt de velocity toe aan de huidige positie
        this.pos.y += this.velocity.y; //Voegt de velocity toe aan de huidige positie
    }

    checkCollision()
    {
        for (let platform of platformen) 
        {
            if(platform.phase === false)
            {
                if (this.onCollision(platform) == true) //Als een pearl collisie heeft met een platform, teleporteer de speler daarheen en haal de pearl weg
                {
                    player.pos.x = this.pos.x;
                    player.pos.y = this.pos.y - (unitSize);
                    player.velocity.y = 0;
                    player.resetPearl();
                    pearlArray.splice(pearlArray.indexOf(this), 1);
                }
            }
            
        }
    }
    
}