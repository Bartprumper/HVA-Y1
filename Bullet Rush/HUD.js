//HeadsUpDisplay informatie
function updateHUD(){
  let wavePosX = width/2
  let wavePosY = 40
  let scorePosX = 0
  let scorePosY = 0
  let scoreCountX = 70
  let scoreCountY = 50
  let livesPosX = 690
  let livesPosY = 0
  let liveCountX = 760
  let liveCountY = 50
  let ammoCountX = 50
  let ammoCountY = 550
  
  textFont(font)
  textAlign(LEFT)
  stroke(0)
  strokeWeight(1)
  fill(0);
  textSize(40)
  
  image(chips, scorePosX, scorePosY)
  text('x' + round(points), scoreCountX, scoreCountY)
  if(points <= 0){
    points = 0
  }
  image(cards, livesPosX, livesPosY)
  text('x' + playerLives, liveCountX, liveCountY)
  if(playerLives <= 0){
    playerLives = 0
  }
  textAlign(CENTER)
  text('Wave: ' + waveCount, wavePosX, wavePosY)
  
  
  image(Cylinder, livesPosX - 200, livesPosY - 5)
  textAlign(LEFT)
  text('x' + ammoCount, liveCountX - 200, liveCountY)
  
  image(whiskeyIMG, 180, livesPosY)
  fill(0, 0, 255)
  rect(220, 25, whiskeySip * 4, 20)
  
  stroke(0)
  strokeWeight(2)
  fill(0, 0, 0, 0)
  rect(220, 25, 100, 20)
 
}

function startScreen(){
  let infoX = 770
  let infoY = 65
  let infoY2 = 325
  let infoDist = 40
  
  
  let paperStretch1 = map(sin(frameCount / 50), -1, 1, 1, 1.04)
  let paperStretch2 = map(sin(frameCount / 37), -1, 1, 1, 1.1)
  
  push()
  scale(1.1, paperStretch2 + 0.1)
  image(paperY, 480, -30)
  pop()
  
  push()
  scale(paperStretch1, 1)
  image(scroll, 0, -40)
  pop()
  
  
  let textPulse = map(sin(frameCount / 25), -1, 1, 100, 255)
  fill(0, 0, 0, textPulse)
  textFont(font)
  
  textAlign(LEFT)
  textSize(40)
  text('Press ENTER to start', 120, 190)
  fill(0)
  textSize(100)
  text('Bullet Rush', 120, 150)
  
  
  textSize(40)
  textAlign(RIGHT)
  text('Movement:', infoX, infoY) 
  text('Arrow Keys /', infoX, infoY + infoDist)
  text('WASD', infoX, infoY + 80 )
  text('Shoot:', infoX, infoY + 135)
  text('Spacebar', infoX, infoY + 175)
  textSize(33)
  text('(Watch your ammo!)', infoX, infoY + 210)
  
  fill(0, 0, 0, textPulse)
  text('Press V to view', infoX, infoY + 260)
  text('extra information', infoX, infoY + 290)
  
  if(gameInfo == true){
    stroke(0)
    fill(240, 240, 240, 160)
    rect(-10, 270, 500, 300)
    
    textSize(33)
    noStroke()
    fill(0)
    textAlign(LEFT)
    text('Playing cards are player lives', 5, 305)
    text('Poker chips are player score', 5, 340)
    text('Pocket watch is Slow Motion', 5, 375)
    text('Pistol gives the player piercing shot', 5, 410)
    text('Cylinder reloads the gun and doubles ammo', 5, 445)
    text('capacity', 5, 470)
    text('Whiskey meter fills on hits and depletes on', 5, 505)
    text('misses', 5, 530)
    text('If full, grants the player doubleshot', 5, 560)
    
  }
  
}

//Scorepunten van de speler weghalen als tijd verloopt
function scoreDrain(){
  let pointDrain = 0.08
  if(drainScore === true){
   if(points > 0){
    points -= pointDrain
    }
  else if(points <= 0){
    points = 0
  } 
  }
}

function gameOver(){
  
  let textPulse = map(sin(frameCount / 20), -1, 1, 100, 255)
  let endPromptsX = 785
  
  fill(0, 0, 0)
  gameEnd = true
  drainScore = false
  background(0)
  
  image(graveyard, 0, 0)
  push()
  scale(-1, 0.8)
  image(scroll, -650, -60)
  pop()
  
  noStroke()
  image(page1, 500, 135)
  textSize(100)
  textAlign(CENTER)
  text('GAME OVER!', width/2, height/2 - 175)
  textSize(40)
  text('Waves defeated:', 640, 305)
  text(waveDefeated, 640, 355)
  textSize(60)
  text('Score:', 640, 195)
  text(round(points), 640, 245)
  stroke(0)
  fill(220, 220, 220, 120)
  rect(420, 430, 400, 130)
  textSize(42)
  noStroke()
  textAlign(RIGHT)
  fill(0, 0, 0, textPulse)
  text('press ENTER to restart', endPromptsX, 550)
  text('press F to save your score', endPromptsX, 470 )
  text('press C to view highscores', endPromptsX, 510)
  
  
}
/*
function gameWin(){
  gameEnd = true
  background(9, 171, 19)
  textSize(80)
  textAlign(CENTER)
  text('YOU WIN!', width/2, height/2 - 100)
  textSize(45)
  text('Waves defeated: ' + waveDefeated, width/2, height/2 - 25)
  textSize(50)
  text('Score: ' + round(points), width/2, height/2 + 50)
  textSize(20)
  text('press ENTER to restart', width/2, height/2 + 150)
  drainScore = false
  noLoop()
  
}*/

function restartGame(){
  window.location.reload()
} 