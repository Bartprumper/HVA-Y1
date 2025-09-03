// Hoofd Class van alle Terrein objecten
class Terrain
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.width = unitSize;
        this.height = unitSize;
    }

    draw()
    {
        fill(0);
        rect(this.x, this.y, this.width, this.height);
    }

    update()
    {

    }

}

// Class die alle functionaliteit van platformen bavat
class Platform extends Terrain
{
    constructor(x, y)
    {
        super(x, y)
        this.x = x;
        this.y = y;
        this.phase = false;
    


    }

    update()
    {

    }

    draw()
    {
    image(grassTile, this.x, this.y, this.width, this.height)
    }
} 

class Wall extends Terrain
{
    constructor(x, y)
    {
        super(x, y)
        this.x = x;
        this.y = y;
        this.phase = false;
    


    }

    update()
    {

    }

    draw()
    {
    image(dirtTile, this.x, this.y, this.width, this.height)
    }
} 

class PhaseWall extends Terrain
{
    constructor(x, y)
    {
        super(x, y)
        this.x = x;
        this.y = y;
        this.phase = true;
    }

    draw()
    {
        fill(25, 79, 235, 150)
        noStroke()
        rect(this.x, this.y, unitSize, unitSize)
    }
}

class Sign
{
    constructor(x, y, direction)
    {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.direction = direction;
    }

    draw()
    {
        if(this.direction === 4)
        {
            image(rightSign, this.x, this.y + 15, 100, 100)
        }
        else if(this.direction === 3)
        {
            image(leftSign, this.x, this.y + 15, 100, 100)
        }
        else if(this.direction === 1)
        {
            image(upSign, this.x, this.y + 15, 100, 100)
        }
        else if(this.direction === 2)
        {
            image(downSign, this.x, this.y + 15, 100, 100)
        }
    }
}

// Class voor het eindpunt van het level
class Victoryzone extends Terrain
{
    constructor(x, y)
    {
        super(x, y)
        this.x = x;
        this.y = y;
    }

    update()
    {

    }

    draw()
    {
        image(exitFlag, this.x, this.y, this.width, this.height * 2)
    }
}


