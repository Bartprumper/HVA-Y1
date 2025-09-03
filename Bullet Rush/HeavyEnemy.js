
class heavyEnemy {
  constructor(x, y, ){
    this.x = x
    this.y = y
    this.speed = 3
    this.baseSpeed = 3
    this.slowedSpeed = this.speed / 2
    this.direction = 1
    this.flowSpeed = 0
    this.flowMin = 100
    this.flowMax = 200
    this.heavyWidth = 150
    this.heavyHeight = 80
    this.heavyHP = 5
    this.shotMin = 75
    this.shotMax = 175
    this.shotTimer = random(this.shotMin, this.shotMax)
    this.steamTrain = steamTrain
   
  }
  
  update(){
    if(slowMotion == false){
      this.flowSpeed += 0.05
      this.speed = this.baseSpeed
    }
    this.x += this.speed * enDir
    this.y = map(cos(this.flowSpeed), -1, 1, this.flowMin, this.flowMax)
    if(this.x > width - this.heavyWidth || this.x < 0){
      hitWall = true
    }
    
    if(this.shotTimer >= 0){
      this.shotTimer -= 1
    }
    else{
      for(var i = 0; i < 2; i = i + 1){
        let enBullet = new enemyBullet(this.x + 40 * i , this.y + 50, false, false)
      enemyBullets.push(enBullet)
      enemyShot.setVolume(enemyVolume)
      enemyShot.play()
      this.shotTimer = random(this.shotMin, this.shotMax)
      }
      
    }
    
    if(slowMotion == true){
      this.speed = this.slowedSpeed
      this.flowSpeed += 0.025
    }
    
  }
  
  draw(){
    fill(0, 70, 70)
    //rect(this.x, this.y, this.heavyWidth, this.heavyHeight)
    if(enDir == 1){
      image(this.steamTrain, this.x, this.y)
    }
    if(enDir == -1){
      push()
      scale(-1, 1)
      image(this.steamTrain, -this.x - this.heavyWidth, this.y)
      pop()
    }
    fill(255, 0, 0)
    rect(this.x, this.y - 35, this.heavyHP * 30, 15)
    fill(0, 0, 0, 0)
    stroke(0)
    strokeWeight(2)
    rect(this.x, this.y - 35, 150, 15)
    
    
  }

}