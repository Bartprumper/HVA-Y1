class powerUp {
  constructor(x, y, pwrupType){
    this.x = x
    this.y = y
    this.speed = 4
    this.spawnTimer = random(420, 600)
    this.pwrupWidth = 75
    this.pwrupHeight = 75
    this.pwrupType = pwrupType  
    this.cards = cards
    this.chips = chips
    this.revolver = revolver
    this.watch = pocketWatch
    this.Cylinder = Cylinder
    
  }
  
  update(){
    this.y += this.speed
    
  }
  
  draw(){
    fill(68, 227, 211)
    //rect(this.x, this.y, 50, 50)
    if(this.pwrupType == 1){
      image(this.cards, this.x, this.y)
    }
    if(this.pwrupType == 2){
      image(this.chips, this.x, this.y)
    }
    if(this.pwrupType == 3){
      image(this.revolver, this.x, this.y)
    }
    if(this.pwrupType == 4){
      image(this.watch, this.x, this.y)
    }
    if(this.pwrupType == 5){
      image(this.Cylinder, this.x, this.y)
    }
  }
}

function powerUpSpawn() {
  
  if(gameEnd == false){
    if(pwrUpTimer >= 0 ){
    pwrUpTimer -= 1
  }
    else{
    powerup = new powerUp(random(0, 750), -100, floor(random(1, 6)))
    powerUps.push(powerup)
    pwrUpTimer = random(420, 600)
    }
  }
}

function powerUpDeactivator(){
  if(powerupActivate == true){
    if(piercingShot == true || slowMotion == true){
      stroke(242, 188, 27, 130)
      strokeWeight(40)
      fill(0, 0, 0, 0)
      rect(0, 0, 800, 600)
    }

    powerupDuration -= 1
  }
  if(powerupDuration == 0){
     piercingShot = false
     slowMotion = false
     powerupDuration = 180
     powerupActivate = false
   }
}

function powerUpSelector(){
  
  if(powerup.pwrupType == 1){
    playerLives += bonusLife
    fill(242, 188, 27)
    rect(0, 0, 800, 600)
  }
  if(powerup.pwrupType == 2){
    points += chipValue
    fill(242, 188, 27)
    rect(0, 0, 800, 600)
  }
  if(powerup.pwrupType == 3){
    piercingShot = true 
    
  }
  
  if(powerup.pwrupType == 4){
    slowMotion = true

  }
  if(powerup.pwrupType == 5){
    ammoCount = 24
    fill(242, 188, 27)
    rect(0, 0, 800, 600)
    reloadSound = false
  }
  
}

function whiskey(){
  if(whiskeySip == 25){
    gunSlinging = true
    whiskeySip = 0
    highNoon.play()
  }
  
  if(whiskeySip <= 0){
    whiskeySip = 0
    
  }
  
  if(gunSlinging == true){
    if(whiskeyTime >= 0){
      doubleShot = true
      whiskeyTime -= 1
      whiskeySip = 0
      stroke(0, 0, 255, 130)
      strokeWeight(40)
      fill(0, 0, 0, 0)
      rect(0, 0, 800, 600)
      
      
    }
    else{
      gunSlinging = false
      doubleShot = false
      whiskeyTime = 120
      
    }
  }
}
  
