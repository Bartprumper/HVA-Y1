//Player data
class Player {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.playerWidth = 60;
    this.playerHeight = 20;
    this.gunslinger = gunslinger
  }

  update() {
    //player movement
    if (keyIsDown(LEFT_ARROW) || (keyIsDown(65))){
      this.x -= this.speed
    }
    if (keyIsDown(RIGHT_ARROW) || (keyIsDown(68))){
      this.x += this.speed
    }
      //player kan niet verder dan de zijkant
      if (this.x < lCanvasEdge) {
        this.x = lCanvasEdge;
      }
      if (this.x > rCanvasEdge - this.playerWidth) {
        this.x = rCanvasEdge - this.playerWidth;
      }
    
  }

  draw() {
    //player appearance
    noStroke()
    //fill(0, 255, 0);
    image(this.gunslinger, this.x, this.y)
    //rect(this.x, this.y, this.playerWidth, this.playerHeight);
  }
}