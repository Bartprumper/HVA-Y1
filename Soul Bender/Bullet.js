class Bullet extends Entity
{
    constructor(x, y, direction)
    {
        super(x, y, width, height)
        this.x = x
        this.y = y
        this.direction = direction
        this.speed = 15
        this.width = 30
        this.height = 5
        this.state = 0
        this.image = earthArrow
    }

    draw()
    {
        if(this.direction === 1)
        {
            image(this.image, this.x, this.y - 15)
        }
        else
        {
            push()
            scale(-1, 1)
            image(this.image, -this.x - this.width, this.y - 15)
            pop()
        }

        if(player.playerState === 0)
        {
            this.image = arrow 
        }
        else if(player.playerState === 1)
        {
            this.image = airArrow
        }
        else if(player.playerState === 2)
        {
            this.image = waterArrow
        }
        else if(player.playerState === 3)
        {
            this.image = fireArrow
        }
        else if(player.playerState === 4)
        {
            this.image = earthArrow
        }
    }

    update()
    {
        if(this.direction === 1)
        {
            this.x += this.speed
        }
        else
        {
            this.x -= this.speed
        }

        this.pos.x = this.x
        this.pos.y = this.y
        this.checkCollision();

        this.state = player.playerState

        

        if(dist(this.x, this.y, player.pos.x, player.pos.y) >= 400)
        {
            bullets.splice(bullets.indexOf(this), 1)
        }


        
    }
    checkCollision()
    {
        for (let platform of platformen)
            {
                if(this.onCollision(platform) == true) 
                {
                    bullets.splice(bullets.indexOf(this), 1)
                }
            }
    }
}