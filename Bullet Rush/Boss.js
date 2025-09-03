class bossEnemy {
  constructor(x, y){
    this.x = x
    this.y = y
    this.speed = 0
    this.baseSpeed = 2
    this.slowedSpeed = 
    this.direction = 1
    this.bossWidth = 150
    this.bossHeight = 160
    this.bossHP = 50
    this.shotTimer = random(60, 120)
    this.rightMax = 600
    this.leftMax = 100
    this.outlaw = outlaw
    this.outlaw2 = outlaw2
    
  }
  
  update(){
    if(bossBehaviour == 1){
      
    if(slowMotion == false){
      this.speed += 0.03
    }
    if(slowMotion == true){
      this.speed += 0.015
    }
    
    this.reachXmin = 200
    this.reachXmax = 500
    this.reachYmin = 50
    this.reachYmax = 150
    this.x = map(sin(this.speed), -1, 1, this.reachXmin, this.reachXmax)
    this.y = map(cos(this.speed), -1, 1, this.reachYmin, this.reachYmax)
    
    }
    if(bossBehaviour == -1){
      this.speed = bossSpeed
      
      this.x += this.speed * enDir
      if(this.x >= this.rightMax){
        hitWall = true
        this.x = this.rightMax - 1
      }
      if(this.x <= this.leftMax){
        hitWall = true
        this.x = this.leftMax + 1
        
      }
    }
    //console.log(bossSpeed)
    
    if(this.shotTimer >= 0){
      this.shotTimer -= 1
    }
    else{
      let enBullet = new enemyBullet(this.x, this.y , true, false)
      enemyBullets.push(enBullet)
      enemyShot.setVolume(enemyVolume)
      enemyShot.play()
      this.shotTimer = random(60, 120)
    }
    if(this.shotTimer >= 0){
      this.shotTimer -= 1
    }
    else{
      let enBullet = new enemyBullet(this.x + 50, this.y, false, false)
      enemyBullets.push(enBullet)
      enemyShot.setVolume(enemyVolume)
      enemyShot.play()
      this.shotTimer = random(60, 120)
    }
    if(this.shotTimer >= 0){
      this.shotTimer -= 1
    }
    else{
      let enBullet = new enemyBullet(this.x + 100, this.y, false, true)
      enemyBullets.push(enBullet)
      enemyShot.setVolume(enemyVolume)
      enemyShot.play()
      this.shotTimer = random(60, 120)
    }
  }
  draw(){
    if(bossBehaviour == -1){
      image(this.outlaw2, this.x, this.y)
      fill(255, 0, 0)
      rect(this.x, this.y - 35, this.bossHP * 3, 15)
      fill(0, 0, 0, 0)
      stroke(0)
      strokeWeight(2)
      rect(this.x, this.y - 35, 150, 15)
    }
    if(bossBehaviour == 1){
      image(this.outlaw2, this.x, this.y)
      fill(255, 0, 0)
      rect(this.x, this.y - 35, this.bossHP * 3, 15)
      fill(0, 0, 0, 0)
      stroke(0)
      strokeWeight(2)
      rect(this.x, this.y - 35, 150, 15)
    }
  }
}