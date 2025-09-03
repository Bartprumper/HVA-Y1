
let backDrop;
let ranger1;
let ranger2;
let Player1;

let bullets = [];
let enemyBullets = [];
let powerUps = [];
let explosions = [];

let hitWall = false;
let enDir = 1;
let lCanvasEdge = 0;
let rCanvasEdge = 800;
let startTimer = 60
let gameStart = false;
let gameEnd = false;
let gamePaused = false;
let pause = 0
let gameInfo = false
let infoToggle = 0
let cheatMode = false
let ammoCount = 12
let reloadTime = 60
let reloadSound = false
let endSound = false

let scoreSaved = false
let scoreLoaded = false
let leaderboard = false
let playerName 
let saveURL = 'https://oege.ie.hva.nl/~hofem/blok1/highscore/save.php';
let loadURL = 'https://oege.ie.hva.nl/~hofem/blok1/highscore/load.php';
let gameID = 9482605308
let top5
let scoreExtracted = false
let saveBlock = false



let cloudX1 = 50
let cloudX2 = 450
let cloudX3 = 250
let cloudX4 = 30

//Sound mixing
let gunvolume = 0.15
let hitvolume = 0.4
let BGMvolume = 0.5
let pwrupvolume = 1.3
let impactvol = 0.5
let metalhitvol = 0.8
let whistlevolume = 0.7
let horsevolume = 1
let trainvolume = 1
let riflevolume = 1
let enemyVolume = 0.4
let reloadVol = 0.5
let endVol = 1.5

//Enemy arrays
let enemies = [];
let heavies = [];
let bosses = [];


//Score and Lives
let enValue = 50;
let heavyValue = 200
let bossValue = 500
let points = 0;
let playerLives = 5;
let drainScore = true

let waveCount = 1
let waveDefeated = 0
let waveHP = 15
let waveTimer = 90
let bossTimer = 1
let bossBehaviour = 1
let bossSpeed = 2


let pwrUpTimer = 600
let powerupActivate = false
let powerupDuration = 180
let piercingShot = false
let slowMotion = false
let chipValue = 200
let bonusLife = 1
let whiskeySip = 0
let whiskeyTime = 120
let gunSlinging = false
let doubleShot = false



//Playerbullet data
let bulletWidth = 10;
let bulletHeight = 20;
let bulletSpeed = 16;
let bulletOffsetX = 25;
let bulletOffsetY = 40;

//Normal Enemy Shooting data
let enBulOffsetX = 20
let enBulOffsetY = 55
let enShotIntMin = 80
let enShotIntMax = 150
let shotInterval = 70;

//enemy placing data
let enemySpacingX = 100;
let enemySpacingY = 75;
let enemyOffsetX = 20;
let enemyOffsetY = 40;
let enemyColumns = 5;
let enemyRows = 3;

//horse placing data
let horseSpacingX = 100;
let horseSpacingY = 75;
let horseOffsetX = 20;
let horseOffsetY = 40;
let horseColumns = 6;
let horseRows = 2;





