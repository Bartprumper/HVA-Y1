//enemy bullet data
class enemyBullet {
  constructor(x, y, goLeft, goRight){
    this.x = x
    this.y = y
    this.speed = 10
    this.slowedSpeed = this.speed / 2
    this.enBulletWidth = 15
    this.enBulletHeight = 50
    this.bulletSprite = bulletSprite
    this.bulletR = bulletR
    this.bulletL = bulletL
    this.goLeft = goLeft
    this.goRight = goRight
    
  }
  
  update() {
    if(this.goLeft == false && this.goRight == false){
      this.y += this.speed
    if(slowMotion == true){
      this.speed = this.slowedSpeed
    }
    }
    
    
    if(this.goLeft === true){
      this.y += this.speed
      this.x -= this.speed / 2 
      if(slowMotion == true){
        this.speed = this.slowedSpeed
      }
    }
    
    if(this.goRight === true){
      this.y += this.speed
      this.x += this.speed / 2
      if(slowMotion == true){
        this.speed = this.slowedSpeed
      }
    }
    
  
    
  }
  
  draw() {
    if(this.goLeft == false && this.goRight == false){ 
     image(this.bulletSprite, this.x, this.y);
   }
    if(this.goLeft === true){
      image(this.bulletL, this.x, this.y);
     
   }
    if(this.goRight === true){
      image(this.bulletR, this.x, this.y);
      
    }
    
    
    
  }
  
}