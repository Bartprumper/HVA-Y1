//collision detection
function collision(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
  if (
    r1x + r1w >= r2x && //r1 right edge past r2 left
    r1x <= r2x + r2w && // r1 left edge past r2 right
    r1y + r1h >= r2y && // r1 top edge past r2 bottom
    r1y <= r2y + r2h    // r1 bottom edge past r2 top
  ) {
    
    return true;
  }
  return false;
}

//playerbullet - enemy collision
function damageEnemy(){
  for (let enemy of enemies) {
    for (let bullet of bullets) {
      if (collision(bullet.x, bullet.y, bulletWidth, bulletHeight,
        enemy.x, enemy.y, enemy.enemyWidth, enemy.enemyHeight) == true) {
        impact.setVolume(impactvol)
        impact.play()
        explosion = new Explosion(enemy.x, enemy.y)
        explosions.push(explosion)
        enemies.splice(enemies.indexOf(enemy), 1);
        if(piercingShot == false){
          bullets.splice(bullets.indexOf(bullet), 1);
          whiskeySip += 1
        }
        
        points += enValue;
        waveHP -= 1
      }
    }
  }
}

//enemy bullet - player collision
function damagePlayer(){
  for (let enBullet of enemyBullets){
    if (collision(enBullet.x, enBullet.y, enBullet.enBulletWidth, enBullet.enBulletHeight, Player1.x, Player1.y, Player1.playerWidth, Player1.playerHeight) == true){
      enemyBullets.splice(enemyBullets.indexOf(enBullet), 1);
      playerLives -= 1
      bulletHit.setVolume(hitvolume)
      bulletHit.play()
      fill(255, 0, 0)
      rect(0, 0, 800, 600)
      
    }
  }
}

//Playerbullet - heavyEnemy collision
function damageHeavy(){
  for(let heavy of heavies){
    for(let bullet of bullets){
      if(collision(bullet.x, bullet.y, bulletWidth, bulletHeight, 
                  heavy.x, heavy.y, heavy.heavyWidth, heavy.heavyHeight) == true){
        if (piercingShot == false){
          bullets.splice(bullets.indexOf(bullet), 1)
          whiskeySip += 1
        }
        metalhit.setVolume(metalhitvol)
        metalhit.play()
        heavy.heavyHP -= 1
        if(heavy.heavyHP === 0){
          explosion = new Explosion(heavy.x, heavy.y)
          explosions.push(explosion)
          heavies.splice(heavies.indexOf(heavy), 1)
          points += heavyValue
          waveHP -= 1
        }
        
      }
    }
  }
}

function damageBoss(){
  for(let boss of bosses){
    for(let bullet of bullets){
      if(collision(bullet.x, bullet.y, bulletWidth, bulletHeight, boss.x, boss.y, boss.bossWidth, boss.bossHeight) == true){
        if (piercingShot == false){
          bullets.splice(bullets.indexOf(bullet), 1)
          whiskeySip += 1
        }
        impact.setVolume(impactvol)
        impact.play()
        boss.bossHP -= 1
        if(boss.bossHP == 0){
          explosion = new Explosion(boss.x, boss.y)
          explosions.push(explosion)
          bosses.splice(bosses.indexOf(boss), 1)
          points += bossValue
          waveHP -= 1
        }
      }
    }
  }
}

function grabPowerup(){
  for(let powerup of powerUps){
    if (collision(powerup.x, powerup.y, powerup.pwrupWidth, powerup.pwrupHeight, Player1.x, Player1.y, Player1.playerWidth, Player1.playerHeight) == true){
      pickPowerup.setVolume(pwrupvolume)
      pickPowerup.play()
      powerUps.splice(powerUps.indexOf(powerup), 1);
      powerUpSelector();
      powerupActivate = true
      
      
    }
  }
}



