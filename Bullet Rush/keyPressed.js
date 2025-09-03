//Keyboard interaction
function keyPressed() {
  
  if(gameStart == true && gameEnd == false){
    if (key === " ") {
      if(ammoCount > 0){
        if(doubleShot == false){
          let bullet = {
            x: Player1.x + bulletOffsetX,
            y: height - bulletHeight - bulletOffsetY,
            };
          bullets.push(bullet);
          }
        if(doubleShot == true){
          for(i = 0; i < 2; i++){
            let bullet = {
              x: Player1.x + bulletOffsetX * i,
              y: height - bulletHeight - bulletOffsetY,
              };
            bullets.push(bullet);
            }
        }
    ammoCount -= 1
    gunShot.setVolume(gunvolume)
    gunShot.play()
    
      }
  }
  }
  
  if (gameEnd === true){
    if (keyCode === ENTER){
    console.log('restart')
    restartGame();
    return;
  }
  }
  
  if (gameStart == false){
    if(keyCode === ENTER){
      yeehaw.play()
      gameStart = true
      
    }
  }
  
  if (gameEnd === true){
    if(scoreSaved === false && saveBlock == false){
      if(key === 'f'){
        saveScore()
        
    }
    }
    if(scoreLoaded === false){
      if(key === 'c'){
        loadScore()
        
      }
    } 
  }
  
  if(key === 'o'){
    cheatMode = true
  }
  if(cheatMode === true){
    if(key === 'p'){
      playerLives = 999
      piercingShot = true
      doubleShot = true
      saveBlock = true
    }
  }
}

function keyTyped(){
  
  if(gameStart == true){
    if (key == 'n' && pause == 0){
      noLoop()
      pause = 1
     }
    else if(key == 'n' && pause == 1){
      loop()
      pause = 0
    }
  }
  
  if(gameStart == false){
    if(key == 'v' && infoToggle == 0){
      gameInfo = true
      infoToggle = 1
    }
    else if(key == 'v' && infoToggle == 1){
      gameInfo = false
      infoToggle = 0
    }
  }
}

  

  
  
