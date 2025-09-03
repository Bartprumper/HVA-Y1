//waveType 1 is de basic wave
//waveType 2 is de basic wave gerandomized
//waveType 3 is de paarden wave
//waveType 4 is de heavies wave


function randomWave(){
  let waveNum = floor(random(2, 5))
  if(waveNum == 1){
    waveType1()
  }
  if(waveNum == 2){
    waveType2()
  }
  if(waveNum == 3){
    waveType3()
    
  }
  if(waveNum == 4){
    waveType4()
  }
  
  
  
  
}




function waveType1(){
    //draw 3 rijen met 5 enemies
  waveHP = 15
  for (var i = 0; i < enemyColumns; i = i + 1) {
    for (var j = 0; j < enemyRows; j = j + 1) {
      let enemy;
      
      if(j == 0 ){
        enemy = new Enemy(enemyOffsetX + i * enemySpacingX, enemyOffsetY + j * enemySpacingY, true, false)
        
      }
      
      else
      {
        enemy = new Enemy(enemyOffsetX + i * enemySpacingX, enemyOffsetY + j * enemySpacingY, false, false)
        
      }
      enemies.push(enemy) ;
      
    }
  }
}

function waveType2(){
  rifle.setVolume(riflevolume)
  rifle.play()

  waveHP = 15
  for (var i = 0; i < enemyColumns; i = i + 1) {
    for (var j = 0; j < enemyRows; j = j + 1) {
      let pistol = random()
      
      let enemy;
      
      if(pistol > 0.6){
        enemy = new Enemy(enemyOffsetX + i * enemySpacingX, enemyOffsetY + j * enemySpacingY, true, false)
      }
      else
      {
        enemy = new Enemy(enemyOffsetX + i * enemySpacingX, enemyOffsetY + j * enemySpacingY, false, false)
        
      }
      enemies.push(enemy) ;
      
    }
  }
  
}


function waveType3(){
  horse.setVolume(horsevolume)
  horse.play()
  waveHP = 12
      for (var i = 0; i < horseColumns; i = i + 1) {
    for (var j = 0; j < horseRows; j = j + 1) {
      let enemy;
        enemy = new Enemy(horseOffsetX + i * horseSpacingX, horseOffsetY + j * horseSpacingY, false, true)
      enemies.push(enemy) ;
      
    }
  }
  
}

function waveType4(){
  train.setVolume(trainvolume)
  train.play()
  waveHP = 4
  for(var i = 0; i < 4; i = i + 1){
    let heavy
  heavy = new heavyEnemy(150 + i * 160, 200)
  heavies.push(heavy)
  }
  
}

function bossWave(){
  whistle.setVolume(whistlevolume)
  whistle.play()
  waveHP = 1
  let boss
  boss = new bossEnemy(width/2 - 50, 100)
  bosses.push(boss)
  bossBehaviour *= -1
  
  
}




