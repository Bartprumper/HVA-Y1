let gameWidth = 1200;
let gameHeight = 800;
let platformen = [];
let victoryZone = [];
let enemies = [];
let coins = [];
let bullets = [];
let signs = [];
let gameState = 'MainMenu'
let levelBlueprint;
let unitSize = 50;
let playLevel = 0;
let levelLoaded = false; 


function preload() 
{
    playerWizard = loadImage('Assets/images/wizard.png');
    playerEffect = loadImage('Assets/images/stickmanNormal.png');
    waterEffect = loadImage('Assets/images/waterEffect.png');
    airEffect = loadImage('Assets/images/airEffect.png');
    fireEffect = loadImage('Assets/images/fireEffect.png');
    earthEffect = loadImage('Assets/images/earthEffect.png');
    trophy = loadImage('Assets/images/trophy-cup.png');
    
    level0Blueprint = loadImage('Assets/Blueprints/level0blueprint.png');
    level1Blueprint = loadImage('Assets/Blueprints/level1blueprint.png');

    upSign = loadImage('Assets/images/upSign.png');
    downSign = loadImage('Assets/images/downSign.png');
    leftSign = loadImage('Assets/images/leftSign.png');
    rightSign = loadImage('Assets/images/rightSign.png');

    grassTile = loadImage('Assets/images/grassTile.png');
    dirtTile = loadImage('Assets/images/dirtTile.png');
    gameBackground = loadImage('Assets/images/greenCave2.png');
    exitFlag = loadImage('Assets/images/victoryFlag.png')

    menuBackground = loadImage('Assets/images/Menubackground.jpg');
    gameTitle = loadImage('Assets/images/Title-3.png');
    lockIcon = loadImage('Assets/images/padlock.png')
    waterIcon = loadImage('Assets/images/water-bolt.png')
    earthIcon = loadImage('Assets/images/stone-pile.png')
    fireIcon = loadImage('Assets/images/fire-dash.png')
    airIcon = loadImage('Assets/images/two-feathers.png')

    arrow = loadImage('Assets/images/arrow.png')
    airArrow = loadImage('Assets/images/airArrow.png')
    waterArrow = loadImage('Assets/images/waterArrow.png')
    fireArrow = loadImage('Assets/images/fireArrow.png')
    earthArrow = loadImage('Assets/images/earthArrow.png')


    earthSlime1 = loadImage('Assets/images/brownSlime1.png')
    earthSlime2 = loadImage('Assets/images/brownSlime2.png')
    airSlime1 = loadImage('Assets/images/whiteSlime1.png')
    airSlime2 = loadImage('Assets/images/whiteSlime2.png')
    fireSlime1 = loadImage('Assets/images/orangeSlime1.png')
    fireSlime2 = loadImage('Assets/images/orangeSlime2.png')
    waterSlime1 = loadImage('Assets/images/blueSlime1.png')
    waterSlime2 = loadImage('Assets/images/blueSlime2.png')

    airOrbImg = loadImage('Assets/images/airOrb.png')
    waterOrbImg = loadImage('Assets/images/waterOrb.png')
    fireOrbImg = loadImage('Assets/images/fireOrb.png')
    earthOrbImg = loadImage('Assets/images/earthOrb.png')
    coinImg = loadImage('Assets/images/coin.gif')

    gameUI = loadFont('Assets/Fonts/MacondoSwashCaps-Regular.ttf');

    music = loadSound('Assets/Sound/BGM.mp3')
    slimeDead = loadSound('Assets/Sound/slimeDefeat.mp3')
    slimeHit = loadSound('Assets/Sound/slimeHit1.mp3')
    achievement = loadSound('Assets/Sound/trumpet.mp3')
    coinSound = loadSound('Assets/Sound/coin.mp3')
    playerHit = loadSound('Assets/Sound/grunt.mp3')
    playerScream = loadSound('Assets/Sound/damage.mp3')
    grabOrb = loadSound('Assets/Sound/powerUp.mp3')
    attack = loadSound('Assets/Sound/attack.wav')
}

function setup() 
{
    createCanvas(gameWidth, gameHeight);
    databasemanager = new DatabaseManager;
    achievementmanager = new AchievementManager;
    playerSprites = [playerEffect, airEffect, waterEffect, fireEffect, earthEffect];
    mainMenu = new MainMenu;
    gameEnd = new GameEnd;
    lvlgen = new Levelgenerator;
    Hud = new HUD;
    popup = new Popup;
    toolTips = new Tooltip;

    music.loop()
    
}

function draw() 
{
    if(gameState === 'MainMenu')
    {
        mainMenu.draw();
        mainMenu.update();

    }
    else if(gameState === 'Game')
    {
        loadLevel();
        Hud.cameraPosition();
        background(gameBackground)
        platformDraw();
        signDraw();
        playerDraw();
        enemyDraw();
        orbDraw();
        victoryFlag();
        pearlUpdate();
        coinDraw();
        bulletDraw();
        toolTips.draw();
        Hud.draw();
        popup.draw();
    }
    else if(gameState === 'GameEnd')
    {
        gameEnd.draw();
        gameEnd.update();
        popup.draw();
    }
   
}

function loadLevel()
{
    if(levelLoaded === false)
    {
        Hud.playerScore = 0;
        Hud.elapsedTime = 0;
        if(playLevel === 0)
        {
            lvlgen.Level(level0Blueprint);
            levelLoaded = true
        }
        if(playLevel === 1)
        {
            lvlgen.Level(level1Blueprint);
            levelLoaded = true
            
        }
    }
    
}

function playerDraw()
{
    player.update();
    player.checkCollision();
    player.draw();
}

function platformDraw()
{
   for (let platform of platformen)
    {   
        platform.update();
        platform.draw();
        
    }  
}

function enemyDraw()
{
    for (let enemy of enemies)
    {
        enemy.update();
        enemy.draw();
        enemy.checkCollision();
        
        
    }
}


function victoryFlag()
{
    victoryZone.draw();
}

function pearlUpdate()
{
    for(let p of pearlArray)
    {
        p.checkCollision();
        p.update();
        p.draw();
    }
}

function bulletDraw()
{
    for (let bullet of bullets)
    {
        bullet.draw()
        bullet.update()
    }
}

function orbDraw()
{
    for (let orb of orbs)
    {
        orb.draw();
        orb.update();
        orb.checkCollision();
    }
}

function coinDraw()
{
    for (let coin of coins)
    {
        coin.draw();
        coin.checkCollision();
    }
}

function signDraw()
{
    for (let sign of signs)
    {
        sign.draw();
    }
}