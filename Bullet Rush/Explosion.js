class Explosion{
  constructor(x, y){
    this.x = x
    this.y = y
    this.duration = 10
 
  }
  
  update(){
    if(this.duration >= 0){
      this.duration -= 1
    }
    else{
      explosions.splice(explosions.indexOf(explosion), 1)
    }
  
  }
  
  draw(){
    image(explosion1, this.x, this.y)
    
  }
}