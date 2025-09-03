function environment(){
  background(0);
  
  
  image(backDrop, 0, 0);
  
  let sunFlare = map(sin(frameCount / 15), -1, 1, 1, 1.01)
  push()
  scale(sunFlare)
  image(sun2, -2, -2)
  pop()
  image(cloud, cloudX1, 100)
  image(cloud, cloudX2, 50)
  image(cloud, cloudX3, 200)
  image(cloud, cloudX4, 150)
  
  let birdMove = map(sin(frameCount / 50), -1, 1, 0, 60)
  image(birds6, birdMove, 70)
  image(birds3, birdMove + 350, 70)
  image(birds4, birdMove + 150, birdMove + 100)
  image(birds5, 600, birdMove + 50)
  image(birds2, birdMove + 450, birdMove + 150)
  
  
  cloudX1 += 1.25
  if(cloudX1 == 810){
    cloudX1 = -180
  }
  cloudX2 += 1.5
  if(cloudX2 == 810){
    cloudX2 = -180
  }
  cloudX3 += 1
  if(cloudX3 == 810){
    cloudX3 = -180
  }
    cloudX4 += 1
  if(cloudX4 == 810){
    cloudX4 = -180
  }
}


function explosion(locX, locY){
  let explDur = 5
  if(explDur >= 0){
    circle(locX, locY, 50)
  }
}