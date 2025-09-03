//Normale enemy data
class Enemy {
  constructor(x, y, canShoot, horse) {
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.baseSpeed = 3
    this.horseSpeed = 9
    this.slowedSpeed = this.speed / 2
    this.slowedHorse = this.horseSpeed / 2
    this.direction = 1;
    this.enemyWidth = 70;
    this.horseWidth = 110;
    this.enemyHeight = 110;
    this.enemyDrop = 50;
    this.canShoot = canShoot
    this.randomTimer = random(enShotIntMin - 20, enShotIntMax)
    this.ranger1 = ranger1
    this.ranger2 = ranger2
    this.horse = horse
    this.horseGIF = horseGIF
}

  update() {
    //enemy movement
    this.x += this.speed * enDir;
    if (this.x > width - this.enemyWidth || this.x < 0) {
      hitWall = true;
    }
    //enemy shootfunction
    if(this.canShoot === true){
      if(this.randomTimer >= 0){
        this.randomTimer -=1;
      }
      else{
        let enBullet = new enemyBullet(this.x + enBulOffsetX, this.y + enBulOffsetY, false, false)
        enemyBullets.push(enBullet)
        enemyShot.setVolume(enemyVolume)
        enemyShot.play()
        this.randomTimer = random(enShotIntMin, enShotIntMax)
    
      }
    }
    if(this.horse == false){
      this.speed = this.baseSpeed
      if(slowMotion == true){
      this.speed = this.slowedSpeed
    }
      
      
    }
    //horse enemy movement
    if(this.horse === true){
      this.speed = this.horseSpeed
      this.enemyDrop = 30
      this.enemyWidth = this.horseWidth
      if(slowMotion == true){
        this.speed = this.slowedHorse
      }
    }
}
  drop() {
    //enemy beweegt 50 pixels omlaag
    if (hitWall === true) {
      this.y += this.enemyDrop;
    }
  }
  draw() {
    //enemy appearance
    if(enDir == 1){
      noStroke()
    if(this.canShoot === true){
      push()
      scale(-1, 1)
      image(this.ranger2, -this.x - this.enemyWidth, this.y,)
      pop()
      
    }
    if(this.canShoot === false && this.horse === false){
      image(this.ranger1, this.x, this.y)
    }
    if(this.horse === true){
      image(this.horseGIF, this.x, this.y)
      
    }
    }
    if(enDir == -1){
      noStroke()
      if(this.canShoot === true){
        
        
        image(this.ranger2, this.x, this.y,)
      
    }
      if(this.canShoot === false && this.horse === false){
        push()
        scale(-1, 1)
        image(this.ranger1, -this.x - this.enemyWidth, this.y)
        pop()
    }
      if(this.horse === true){
        push()
        scale(-1 ,1)
        image(this.horseGIF, -this.x - this.enemyWidth, this.y)
        pop()
      
        }
      }
    }
}
