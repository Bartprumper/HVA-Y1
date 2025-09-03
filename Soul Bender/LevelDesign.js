
class Levelgenerator // Class die alle functionaliteit M.B.T. level generation bevat
{
    Level(insertImage) // Functie die op basis van een afbeelding een level genereerd
    {   
        insertImage.loadPixels(); // Laadt de pixeldata van de ingevoerde afbeelding in

        for (this.x = 0; this.x < insertImage.width; this.x++) // Loopt door alle pixels van de afbeelding
        {
            for(this.y = 0; this.y < insertImage.height; this.y++)
            {
                let colourIndex = 4 * (this.x + this.y * insertImage.width); // Slaat de kleurdata van de pixels op
                let r = insertImage.pixels[colourIndex];
                let g = insertImage.pixels[colourIndex + 1];
                let b = insertImage.pixels[colourIndex + 2];

                // Code die objects plaatst bij bepaalde kleuren

                // Platformen 
                if(r === 0 && g === 0 && b === 0)
                {
                    this.placePlatform();
                }
                // Walls
                if(r === 100 && g === 100 && b === 100)
                {
                    this.placeWall();
                }
                // Player 
                if(r === 255 && g === 0 && b === 255)
                {
                    this.placePlayer();
                }

                // Enemies 
                if(r === 28 && g === 42 && b === 255)
                {
                    this.placeWaterenemy();
                }
                if(r === 155 && g === 75 && b === 2)
                {
                    this.placeEarthenemy();
                }
                if(r === 242 && g === 96 && b === 12)
                {
                    this.placeFireenemy();
                }
                if(r === 193 && g === 221 && b === 252)
                {
                    this.placeAirenemy();
                }
                if(r === 0 && g === 78 && b === 148)
                {
                    this.placeSpecialWaterEnemy();
                }
                if(r === 89 && g === 81 && b === 64)
                {
                    this.placeSpecialEarthEnemy();
                }
                if(r === 255 && g === 50 && b === 0)
                {
                    this.placeSpecialFireEnemy();
                }
                if(r === 224 && g === 235 && b === 239)
                {
                    this.placeSpecialAirEnemy();
                }

                // Coins
                if(r === 255 && g === 255 && b === 0)
                {
                    this.placeCoin();
                }

                // Signs
                if(r === 0 && g === 92 && b === 12)
                {
                    this.placeUpSign();
                }
                if(r === 92 && g === 0 && b === 84)
                {
                    this.placeDownSign();
                }
                if(r === 103 && g === 105 && b === 0)
                {
                    this.placeLeftSign();
                }
                if(r === 0 && g === 105 && b === 86)
                {
                    this.placeRightSign();
                }
                
                // Andere objecten
                if(r === 0 && g === 255 && b === 0)
                {
                    this.placeVictoryzone();
                }
                if(r === 16 && g === 255 && b === 155)
                {
                    this.placePhaseWall();
                }
            }
        }
    }
    placePlayer() // Functie voor het plaatsen van de speler
    {
        player = new Player (this.x * unitSize, this.y * unitSize)
    }


    
    placePlatform() // Functie voor het plaatsen van platformen
    {
        let platform = new Platform (this.x * unitSize, this.y * unitSize);
        platformen.push(platform);
    }
    placeWall()
    {
        let wall = new Wall (this.x * unitSize, this.y * unitSize);
        platformen.push(wall)
    }

    // Functies voor het plaatsen van de verschillende enemies
    placeWaterenemy()
    {
        let waterEnemy = new WaterEnemy (this.x * unitSize, this.y * unitSize);
        enemies.push(waterEnemy);
    }

    placeEarthenemy()
    {
        let earthEnemy = new EarthEnemy (this.x * unitSize, this.y * unitSize);
        enemies.push(earthEnemy);
    }

    placeFireenemy()
    {
        let fireEnemy = new FireEnemy (this.x * unitSize, this.y * unitSize);
        enemies.push(fireEnemy);
    }

    placeAirenemy()
    {
        let airEnemy = new AirEnemy (this.x * unitSize, this.y * unitSize);
        enemies.push(airEnemy);
    }

    placeSpecialWaterEnemy()
    {
        let specialWaterEnemy = new SpecialWaterEnemy (this.x * unitSize, this.y * unitSize);
        enemies.push(specialWaterEnemy)
    }

    placeSpecialEarthEnemy()
    {
        let specialEarthEnemy = new SpecialEarthEnemy (this.x * unitSize, this.y * unitSize);
        enemies.push(specialEarthEnemy)
    }

    placeSpecialFireEnemy()
    {
        let specialFireEnemy = new SpecialFireEnemy (this.x * unitSize, this.y * unitSize);
        enemies.push(specialFireEnemy)
    }

    placeSpecialAirEnemy()
    {
        let specialAirEnemy = new SpecialAirEnemy (this.x * unitSize, this.y * unitSize);
        enemies.push(specialAirEnemy)
    }

    placeCoin()
    {
        let coin = new Coin (this.x * unitSize + 25, this.y * unitSize + 25)
        coins.push(coin)
    }

    placeUpSign()
    {
        let upBoard = new Sign (this.x * unitSize, this.y * unitSize, 1)
        signs.push(upBoard)
    }

    placeDownSign()
    {
        let downBoard = new Sign (this.x * unitSize, this.y * unitSize, 2)
        signs.push(downBoard)
    }

    placeLeftSign()
    {
        let leftBoard = new Sign (this.x * unitSize, this.y * unitSize, 3)
        signs.push(leftBoard)
    }

    placeRightSign()
    {
        let rightBoard = new Sign (this.x * unitSize, this.y * unitSize, 4)
        signs.push(rightBoard)
    }

    placeVictoryzone() // Functien voor het plaatsen van de Victory Zone
    {
        victoryZone = new Victoryzone (this.x * unitSize, this.y * unitSize);
    }

    placePhaseWall()
    {
        let phaseWall = new PhaseWall (this.x * unitSize, this.y * unitSize)
        platformen.push(phaseWall)
    }

    

    
}

class Tooltip
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    draw()
    {
        this.openGuide();
    }

    openGuide()
    {
        this.textBackground();
        fill(255)
        textSize(30)
        noStroke()
        text('Press ESCAPE to open the game guide', 600, 4700);
    }

    textBackground()
    {
        rectMode(CENTER);
        fill(0, 0, 0, 150);
        stroke(255);
        rect(600, 4700, 500, 60);
        rectMode(CORNER);
    }
}



