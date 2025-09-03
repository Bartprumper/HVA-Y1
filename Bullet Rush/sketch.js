function preload() {
  //Image loading
  backDrop = loadImage('img/wildDesert.jpg');
  sun2 = loadImage('img/sun2.png')
  ranger1= loadImage('img/lawman.png')
  ranger2 = loadImage('img/sheriff.png');
  horseGIF = loadImage('img/horse-animation.gif')
  steamTrain = loadImage('img/train.png')
  bulletSprite = loadImage('img/bullet.png')
  pocketWatch = loadImage('img/watch.png')
  chips = loadImage('img/chips.png')
  cards = loadImage('img/cards.png')
  revolver = loadImage('img/revolver.png')
  bulletR = loadImage('img/bulletR.png')
  bulletL = loadImage('img/bulletL.png')
  outlaw = loadImage('img/outlaw.png')
  outlaw2 = loadImage('img/outlaw2.png')
  gunslinger = loadImage('img/gunslinger.png')
  plbullet = loadImage('img/plbullet.png')
  graveyard = loadImage('img/graveyard.png')
  cloud = loadImage('img/cloudgif2.gif')
  scroll = loadImage('img/topBanner.png')
  paperY = loadImage('img/leftBanner.png')
  birds1 = loadImage('img/birds1.png')
  birds2 = loadImage('img/birds2.png')
  birds3 = loadImage('img/birds3.png')
  birds4 = loadImage('img/birds4.png')
  birds5 = loadImage('img/birds5.png')
  birds6 = loadImage('img/birds6.png')
  page1 = loadImage('img/page1.png')
  explosion1 = loadImage('img/explosion1.gif')
  Cylinder = loadImage('img/cylinder.png')
  whiskeyIMG = loadImage('img/whiskey.png')
  
  font = loadFont('assets/Attic.ttf')
  
  gunShot = loadSound('assets/retroGunShot.mp3')
  bulletHit = loadSound('assets/bulletHit.mp3')
  pickPowerup = loadSound('assets/powerUp.mp3')
  BGM = loadSound('assets/westernBGM.mp3')
  whistle = loadSound('assets/whistle.mp3')
  impact = loadSound('assets/bullet2.mp3')
  metalhit = loadSound('assets/metalhit.mp3')
  horse = loadSound('assets/horse.mp3')
  train = loadSound('assets/train.mp3')
  rifle = loadSound('assets/rifle.mp3')
  enemyShot = loadSound('assets/enemyShot.mp3')
  reload = loadSound('assets/reload.mp3')
  yeehaw = loadSound('assets/yeehaw.mp3')
  harmonica = loadSound('assets/harmonica.mp3')
  highNoon = loadSound('assets/Eagle.mp3')
}

//global setup
function setup() {
  
  createCanvas(800, 600);
  frameRate(60);
  this.focus()
  
  BGM.setVolume(BGMvolume)
  BGM.loop()
  
  //player placing data
  let playerStartX = width / 2 - 30;
  let playerStartY = height - 50;

  //draw the player
    Player1 = new Player(playerStartX, playerStartY);
 
}


//global draw function
function draw() {
  
  environment();

  Player1.update();
  Player1.draw();
  
  for (let enemy of enemies) {
    enemy.update();
    enemy.draw();
    
  }
  for (let enemy of enemies) {
     enemy.drop();
  }
  for (let heavy of heavies){
    heavy.update()
    heavy.draw()
  }
  for (let boss of bosses){
    boss.update()
    boss.draw()
  }

  //omdraaien van enemies als ze de zijkant raken
  if (hitWall === true) {
    enDir *= -1;
    bossSpeed = random(2,8)
    hitWall = false;
  }

  //bullet uiterlijk
  for (let bullet of bullets) {
    noStroke()
    fill(0, 255, 0);
    image(plbullet, bullet.x, bullet.y)
    
    bullet.y -= bulletSpeed;
  }
  
  //playerbullet - enemy collision
  damageEnemy();
 
  //EnemyBullets
  for (let enBullet of enemyBullets){
    enBullet.update()
    enBullet.draw()
  }
  //enemy bullet - player collision
  damagePlayer();
  
  //Playerbullet - heavy collision
  damageHeavy();
  
  //Playerbullet - boss collision
  damageBoss()
  
 if(gameStart == true){
   powerUpSpawn();
 }
  
  grabPowerup();
  powerUpDeactivator();
  
  
  for (let powerup of powerUps){
    powerup.update()
    powerup.draw()
  
  }
  
  for (let explosion of explosions){
    explosion.update()
    explosion.draw()
    
  }
  
  if(gameStart == false){
    startScreen();
  }
  if(gameStart == true){
    startTimer -= 1
    updateHUD();
  }
  if(startTimer == 0){
    waveType2()
    
  }

  if(piercingShot == false){
    for(let bullet of bullets){
      if(bullet.y <= -10){
        bullets.splice(bullets.indexOf(bullet), 1)
      
         whiskeySip -= 1
     }
  }
  }
    
  whiskey()

  scoreDrain();
  
  for (let enemy of enemies){
  if(enemy.y >= 500){
    playerLives = 0
  }
  }
  
  if(ammoCount <= 0){
    ammoCount = 0
    reloadTime -= 1
    if(reloadSound == false){
      reload.setVolume(reloadVol)
      reload.play()
      reloadSound = true
    }
    
    noStroke()
    fill(255, 219, 145)
    rect(0, 593, 13 * reloadTime, 30)
  }
  if(reloadTime == 0){
    ammoCount = 12
    reloadTime = 60
    reloadSound = false
  }
  
  if(playerLives == 0){
    if(endSound == false){
      harmonica.setVolume(endVol)
      harmonica.play()
      endSound = true
    }
    
    enemies.length = 0
    heavies.length = 0
    bosses.length = 0
    powerUps.length = 0
    enemyBullets.length = 0
    gameOver()
   
  }
  
  if(scoreExtracted == true){
    showScores()
  }
  
  //Enemy waves
  if(waveHP <= 0){
    waveTimer -= 1
    if(waveTimer == 0){
      if(waveCount == bossTimer * 5){
        waveCount += 1
        waveDefeated += 1
        bossTimer += 1
        bossWave()
        waveTimer = 90
      }
      else{
        waveCount += 1
        waveDefeated += 1
        randomWave()
        waveTimer = 90
      }
        
      }
      
    }  

}