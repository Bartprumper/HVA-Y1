function saveScore(){
  let score = round(points)
  playerName = prompt("Enter your name");
  saveURL += '?game='+ gameID +'&name=' + playerName +"&score=" + score;
  httpGet(saveURL, 'json', false, function(response)
    {
  });
  scoreSaved = true
    
}
function loadScore(){
    loadURL +="?game="+gameID;
    httpGet(loadURL, 'json', false, function(response){ 
      print(response);
      extractData(response);
    });
  scoreLoaded = true
}

function extractData(data) {
  
  top5 = data.sort((a, b) => b.score - a.score).slice(0, 5);
    for (let i = 0; i < top5.length; i++) {
      
      let name = data[i].name; // Accessing the name property
      let score = data[i].score; // Accessing the score property
     
      
      // Displaying the name and score on the canvas
      
      
      
      textSize(40)
      textAlign(LEFT)
      
      text(name + ' - ' + score, 15, 50 + i * 30);
      scoreExtracted = true
    }
}

function showScores(){
    stroke(0)
    fill(220, 220, 220, 120)
    rect(-10, 260, 250, 280)
  
  for (let i = 0; i < top5.length; i++) {
      
    let name = top5[i].name; // Accessing the name property
    let score = top5[i].score; // Accessing the score property
    
    
    noStroke()
    textSize(40)
    textAlign(LEFT)
    fill(0, 0, 0, 255)
    text('Highscores:', 15, 300)
    text(name + ' - ' + score, 15, 340 + i * 45);
     
  }  
}
