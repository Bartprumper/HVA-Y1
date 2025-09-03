class Entity
{
    constructor(x, y, width, height, currentState)
    {
        
        this.pos = createVector(x, y);
        this.width = width;
        this.height = height;
        this.allStates = allStates;
        this.currentState = currentState;

    }

    draw()
    {
        
    }

    update()
    {

    }

    onCollision(other)
    {    
    
        if (this.pos.x + this.width >= other.x &&    // r1 right edge past r2 left

            this.pos.x <= other.x + other.width &&    // r1 left edge past r2 right

            this.pos.y + this.height >= other.y &&    // r1 bottom edge past r2 top

            this.pos.y <= other.y + other.height) {    // r1 top edge past r2 bottom
              return true;
        }
        return false;
    }

    circleCollision(other) //this is the circle. other is the square
    {
        let radius = (unitSize / 2)
        let testX = this.x;
        let testY = this.y;

        // which edge is closest?
        if (this.x < other.x)
        {
            testX = other.x; // test left edge
        }         
        else if (this.x > other.x + other.width)
        {
            testX = other.x + other.width; // right edge
        } 
        if (this.y < other.y)
        {
            testY = other.y; // top edge
        }         
        else if (this.y > other.y+other.height)
        {
            testY = other.y+other.height; // bottom edge
        } 

        // get distance from closest edges
        let distX = this.x-testX;
        let distY = this.y-testY;
        let distance = sqrt((distX*distX) + (distY*distY));

        // if the distance is less than the radius, collision!
        if (distance <= radius) 
        {
          return true;
        }
        return false;
    }   
}
