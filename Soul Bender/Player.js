let player;
let playerStartX = 150;
let playerStarty = 4800;
let playerX = 100;
let playerImgWidth = 50;
let playerImgHeight = 100;
let playerSpeed = 10; //player movement snelheid
let allStates = ["Normal", "Air", "Water", "Fire", "Earth"]; // Alle states die de speler kan hebben in de game
let unlockedStates = [true, false, false, false, false]; // De array van unlockde player states (standaard staat normaal unlocked, zie allstates)
let playerSprites = []; // array aan playersprites
let dashBlock = false; // Voorkomt dat de speler kan dashen in sommige situaties
let toggleInfo = 0


class Player extends Entity //Erft over van Entity
{
    constructor(x, y) 
    {
        super(x, y, playerImgWidth, playerImgHeight); // gebruikt de constructor variablen van entity
        this.velocity = createVector(0, 0);
        this.gravity = 0.3;
        this.op = -11;
        this.isGrounded = false;
        this.spacePressed = false;
        this.health = 5;
        this.invincible = false;
        this.invincibilityTimer = 60;
        this.canDoubleJump = false;
        this.canPearl = false;
        this.canDash = false;
        this.canWallClimb = false;
        this.isClingingToWall = false; 
        this.lastWallDirection = 0; // -1 voor de linker muur, 1 voor de rechter muur
        this.playerState = 0; //Huidige player state
        this.index = 0;
        this.isDashing = false;
        this.dashDuration = 20; //dash frames
        this.dashSpeed = 60; //De snelheid die de vuur dash heeft
        this.dashTimer = 0.5; //De tijd die de vuur dash duurt
        this.lastDirection = 1; //direction the player looked at last
        this.lastPlayerState = -1; //De laatste player state is altijd -1 als de speler nog niet van state heeft geswitched
        this.wallJumpAmount = 20; //wall jump hoogte
        this.orbColour = [0, 0, 255]
        this.slowDown = 0.75
        this.canAttack = true;
        this.HPup = 0
        this.orbImage = 0
        this.lastWall = 0
        this.pearlReady = true
        this.pearlTimer = 60
    }

    draw()
    {
        //image(playerEffect, this.pos.x -  25, this.pos.y, unitSize * 2, unitSize * 2)
        
        this.orbMove = map(sin(frameCount / 20), -1, 1, -10, 10)
        this.orbMove2 = map(sin(frameCount / 30), -1, 1, -5, 5)
        noStroke()
        fill(this.orbColour)
        if(this.playerState != 0)
        {
            image(this.orbImage, this.pos.x - 10, this.pos.y - 20 + this.orbMove, 20, 20)
            image(this.orbImage, this.pos.x - 25, this.pos.y + 5 - this.orbMove2, 20, 20)
            image(this.orbImage, this.pos.x + 40, this.pos.y - 20 - this.orbMove2, 20, 20)
            image(this.orbImage, this.pos.x + 55, this.pos.y + 5 + this.orbMove, 20, 20)
            image(this.orbImage, this.pos.x + 15, this.pos.y - 30 + this.orbMove2, 20, 20)
        }
        
        if(this.lastDirection === 1)
        {
            image(playerWizard, this.pos.x, this.pos.y, unitSize, unitSize * 2);
        }
        else
        {
            push()
            scale(-1, 1)
            image(playerWizard, -this.pos.x - this.width, this.pos.y, unitSize, unitSize * 2);
            pop()
        }
    }

    update() 
    {
        if (!this.isDashing) //Als de speler niet aan het dashen is, voer de code hierin uit
        {
            if (!this.isClingingToWall) //Als de speler niet hangt aan een muur, voer de code hierin uit
            {
                if (keyIsDown(LEFT_ARROW)) //Als de left arrow word ingedrukt, beweeg naar links
                {
                    this.velocity.x -= 1;
                    this.lastDirection = -1; 
                } 
                else if (keyIsDown(RIGHT_ARROW)) //Als de right arrow word ingedrukt, beweeg naar rechts
                {
                    this.velocity.x += 1;
                    this.lastDirection = 1;
                } 
                else 
                {
                    if(this.velocity.x > 0) // Als de pijltjestoetsen niet ingedrukt zijn neemt de speler snelheid gelijdelijk af
                    {
                        this.velocity.x -= this.slowDown
                    }
                    else if(this.velocity.x >= -1 && this.velocity.x <= 1) // Voorkomt doorglijden
                    {
                        this.velocity.x = 0
                    } 
                    if(this.velocity.x < 0) // Als de pijltjestoetsen niet ingedrukt zijn neemt de speler snelheid gelijdelijk af
                    {
                        this.velocity.x += this.slowDown; 
                    }
                    else if(this.velocity.x >= -1 && this.velocity.x <= 1) // Voorkomt doorglijden
                    {
                        this.velocity.x = 0
                    }  
                }

                if(this.isGrounded === true) // Snelheid van de speler wordt sneller afgenomen als hij op de grond staat
                {
                    this.slowDown = 1
                }
                else // Snelheid van de speler wordt minder snel afgenomen als hij niet op de grond staat
                {
                    this.slowDown = 0.5
                }

                if (keyIsDown(32)) //Als de spatiebalk is ingedrukt, voer deze code uit
                {
                    if (!this.spacePressed)
                    {
                        if (this.isGrounded) //Als de speler op de grond staat, dan kan de speler springen
                        {
                            this.jump();
                        } 
                        else if (this.canDoubleJump && this.playerState === 1) //Anders als de state "Air" is en de double jump boolean true is, dan kan je nog een keer springen
                        {
                            this.jump();
                            this.canDoubleJump = false;
                        }
                        this.spacePressed = true;
                    }
                } 
                else 
                {
                    this.spacePressed = false;
                }
                this.velocity.y += this.gravity;
            }
            else if (this.isClingingToWall && keyIsDown(32)) //Als je hangt aan een muur en spatie indrukt, walljumpt de speler 
            {
                this.wallJump();
                this.lastWall = this.lastDirection
            } 
        }
        
        if (this.isDashing) //Als de variabele isDashing true is, dan dan voert deze de dash functie uit
        {
            this.dash();
        } 

        for (let platform of platformen) // Voorkomt dat de speler door muren heen kan dashen
        {
            if(dist(this.pos.x, this.pos.y + 40, platform.x, platform.y) <= 55)
            {
                dashBlock = true
                break
            }
        }
        if(this.velocity.x >= 1.5 || this.velocity.x <= -1.5) // Laat de speler weer dashen als hij weg beweegt van een muur
        {
            dashBlock = false
        }

        this.x = this.pos.x //Voor collision
        this.y = this.pos.y //Voor collision

        this.pos.add(this.velocity); //Dit voegt de velocity variabele toe aan de positie

        if(keyIsDown(70))
        {
            if(this.canAttack === true)
            {
                attack.setVolume(0.3)
                attack.play()
                let bullet = new Bullet(this.pos.x + 10, this.pos.y + unitSize, this.lastDirection)
                bullets.push(bullet)
                this.canAttack = false
            }
        }
        
        if(this.pearlReady === false)
        {
            this.pearlTimer -= 1 
        }
        if(this.pearlTimer <= 0)
        {
            this.pearlReady = true
            this.pearlTimer = 60
        }

        if (this.pos.y > 5750) //Als de speler van de map af is gevallen, spawnt hij weer terug op de map stil en verliest een leven.
        {
            this.pos.x = playerStartX;
            this.pos.y = playerStarty;
            this.health -= 1;
            this.velocity.y = 0;
            achievementmanager.GitGud();
        }

        if (this.velocity.x >= 10) //Tijdelijke limit op 15 op de x velocity
        {
            this.velocity.x = 10;
        }

        if (this.velocity.x <= -10) //Tijdelijke limit op -15 op de x velocity
        {
            this.velocity.x = -10;
        }
        if(this.velocity.y <= -15) // Voorkomt te grote velocityboost bij double jumpen
        {
            this.velocity.y = -15
        }
        if(this.velocity.y >= 25)
        {
            this.velocity.y = 25
        }
        if(this.velocity.y >= 1) // Als de speler naar beneden beweegt is hij niet gounded
        {
            this.isGrounded = false
        }

        this.invincibilityFrames(); //Zorgt voor invincibility frames als de vijand de speler raakt.
       
        if (this.health <= 0) //Als de health van de speler gelijk is aan 0, roept deze de functie aan die ervoor zorgt dat de speler dood is.
        {
            this.isDead();
        }
        if(this.HPup >= 5) // Healt de player als hij coins oppakt
        {
            this.health += 1 
            this.HPup = 0
        }
        if(this.health > 5) // Voorkomt dat de player te veel health heeft
        {
            this.health = 5
        }
    }

    jump() 
    {
        if(this.velocity.y > 0.5) // Voorkomt een zwakke jump als de speler aan het vallen is
        {
            this.velocity.y = -8
            this.isGrounded = false
        }
        else
        {
            this.velocity.y += this.op;
            this.isGrounded = false;
        }
        
    }

    checkCollision() 
    {
        for (let platform of platformen) 
        {
            if (this.onCollision(platform) == true) //De speler kijkt of deze collisie heeft met een platform 
            {
                if (this.pos.y + 75 <= platform.y) //Als het platform waar collisie mee is zich onder je bevind voert deze code uit
                {
                    this.isGrounded = true;
                    this.lastWall = 0;
                    this.velocity.y = 0;
                    this.pos.y = platform.y - unitSize * 2;
                    this.resetDoubleJump();
                    this.resetDash();
                }
                else if (this.pos.y - 25 >= platform.y && this.velocity.y <= 0) //Als het platform boven je zit en er collision is voert deze code uit
                {
                    this.velocity.y = 0;
                    this.pos.y = platform.y + unitSize;
                }
                else if (this.pos.x <= platform.x) //Als de speler zich rechts van het plaform bevind er er collision plaatsvindt, voert deze code uit
                {
                    if(this.playerState != 4) //Als de state niet earth is, word de speler gewoon tegengehouden door de muur, anders blijft de speler aan de muur hangen
                    {
                        this.velocity.x = 0;
                        this.pos.x = platform.x - unitSize - 0.5;
                        this.isClingingToWall = false;
                    }
                    else if(this.playerState === 4 && this.lastWall != this.lastDirection || this.lastWall === 0)
                    {
                        this.isClingingToWall = true;
                        this.pos.x = platform.x - unitSize - 0.5; 
                        this.lastWallDirection = 1;
                        this.velocity.x = 0;
                        this.velocity.y = 0;
                    }
                    else
                    {
                        this.velocity.x = 0;
                        this.pos.x = platform.x - unitSize - 0.5;
                        this.isClingingToWall = false;
                    }
                }
                else if (this.pos.x >= platform.x) //Als de speler zich links van het plaform bevind er er collision plaatsvindt, voert deze code uit
                {
                    if(this.playerState != 4) //Als de state niet earth is, word de speler gewoon tegengehouden door de muur, anders blijft de speler aan de muur hangen
                    {
                        this.velocity.x = 0;
                        this.pos.x = platform.x + unitSize + 0.5;
                        this.isClingingToWall = false;
                    }
                    else if(this.playerState === 4 && this.lastWall != this.lastDirection || this.lastWall === 0)
                    {
                        
                        this.isClingingToWall = true;
                        this.pos.x = platform.x + unitSize + 0.5;
                        this.lastWallDirection = -1;
                        this.velocity.x = 0;
                        this.velocity.y = 0;
                    }
                    else
                    {
                        this.velocity.x = 0;
                        this.pos.x = platform.x + unitSize + 0.5;
                        this.isClingingToWall = false;
                    }
                    
                }
                
            }
        }
    
        for (let enemy of enemies)
        {
            if(this.invincible === false) //Als de speler niet meer invincible is (wat gebeurd na een hit van de enemy) voert deze code uit
            {
                if (this.onCollision(enemy) == true) //Als er collision is met een enemy, krijgt de speler schade van 1 en gaan de invincibility frames weer aan
                {
                    this.takeDamage(1);
                    this.soundEffect();
                    this.invincible = true;
                }  
            }
        }

        if(this.onCollision(victoryZone) == true) //Tijdelijk: Als de speler de victory zone raakt, respawnt de speler
        {
            gameEnd.gameWon = true
            achievementmanager.Speedrunner();
            achievementmanager.Trash();
            achievementmanager.NotIntended();
            achievementmanager.AlmostPacifist();
            
            if(loggedIn === true && playLevel === 1)
            {
                let currentScore = Hud.playerScore;
                let currentTime = round(Hud.elapsedTime, 2);

                if(currentTime <= completionTime)
                {
                    completionTime = currentTime;
                    databasemanager.updateSession(playerId, playerName, password, currentTime, currentScore, databasemanager.getAchievement())
                }
                if(currentScore >= score)
                {
                    score = currentScore;
                    databasemanager.updateSession(playerId, playerName, password, currentTime, currentScore, databasemanager.getAchievement())
                }
                
            }
            enemies.length = 0;
            orbs.length = 0;
            coins.length = 0;
            unlockedStates = [true, false, false, false, false];
            gameState = 'GameEnd'
        }
        
    }

    wallJump() //Als de speler walljumpt, springt hij schuin omhoog weg van de muur
    {
        this.isClingingToWall = false;
        this.velocity.y += this.op;
        this.isGrounded = false;
        this.velocity.x = this.wallJumpAmount * -this.lastWallDirection; 
    }

    previousState() //Als deze functie word aangeroepen word er gekeken of het vorige element al ontgrendeld is, als dit zo is kan de speler dit element worden. Anders niet
    {
        do 
        {
            this.playerState = (this.playerState - 1 + allStates.length) % allStates.length;
        } 
        while(!unlockedStates[this.playerState]);
        this.checkState();
    }

    nextState() //Als deze functie word aangeroepen word er gekeken of het volgende element al ontgrendeld is, als dit zo is kan de speler dit element worden. Anders niet
    {
        do 
        {
            this.playerState = (this.playerState + 1) % allStates.length;
        } 
        while (!unlockedStates[this.playerState]);
        this.checkState();
    }

    startDash() //Deze functie zorgt ervoor dat de speler kan gaan dashen en dit goed verloopt door de duration en velocity goed neer te zetten
    {
        if (!this.isDashing) 
        {
            this.isDashing = true;
            this.dashTimer = this.dashDuration;
            this.velocity.x = this.dashSpeed * this.lastDirection;
            this.velocity.y = 0; 
        }
    }
    
    dash() //Als de dash timer groter dan 0 is kan de speler nog dashen, Anders word de speler even stilgezet en kan hij niet meer dashen
    {
        if (this.dashTimer > 0) 
        {
            this.dashTimer--;
        } 
        else 
        {
            this.isDashing = false;
            //this.velocity.x = 0; 
        }
    }

    resetDoubleJump() //Deze functie wanneer aangeroepen reset de double jump als de speler het "Air" Element is
    {
        if (this.playerState === 1)  
        { 
            this.canDoubleJump = true;
        }
    }

    resetPearl() //Deze functie wanneer aangeroepen reset de pearl ability als de speler het "Water" Element is
    {
        if (this.playerState === 2)  
        { 
            this.canPearl = true;
        }
    }

    resetDash() //Deze functie wanneer aangeroepen reset de dash ability als de speler het "Vuur" Element is
    {
        if (this.playerState === 3) 
        { 
            this.canDash = true;
        }
    }


    takeDamage(DMG) //Als deze functie aangeroepen is, word de speler het aantal schade gedaan wat hier meegegeven wordt
    {
        this.health -= DMG
    }

    invincibilityFrames() //Deze functie regelt de invincibility timer voor de speler, dat deze niet geraakt kan worden tijdens dat de speler invincible is
    {
        if(this.invincible === true)
        {
            this.invincibilityTimer -= 1
            
        }
        if(this.invincibilityTimer <= 0)
        {
            this.invincible = false
            this.invincibilityTimer = 60
            
        }
    }

    isDead() //Als de speler dood gaat worden variabelen hersteld zodat er opnieuw gespeeld kan worden
    {
        gameEnd.gameWon = false
        enemies.length = 0;
        orbs.length = 0;
        coins.length = 0;
        platformen.length = 0;
        signs.length = 0;
        unlockedStates = [true, false, false, false, false];
        gameState = 'GameEnd'
    }

    checkState() //Als de functie aangeroepen word, word gekeken welke state je bent en word de goede afbeelding geladen.
    {
        if (this.playerState !== this.lastPlayerState) 
        {
            this.lastPlayerState = this.playerState; 

            if (this.playerState == 0) 
            {
                playerEffect = playerSprites[0];
            }
    
            if (this.playerState == 1) 
            {
                playerEffect = playerSprites[1];
                this.orbImage = airOrbImg
            }
    
            if (this.playerState == 2) 
            {
                playerEffect = playerSprites[2];
                this.canPearl = true; 
                this.orbImage = waterOrbImg
                
            }
    
            if (this.playerState == 3) 
            {
                playerEffect = playerSprites[3];
                this.orbImage = fireOrbImg
            }
    
            if (this.playerState == 4) 
            {
                playerEffect = playerSprites[4];
                this.canWallClimb = true;
                this.orbImage = earthOrbImg
            }

            if (unlockedStates.slice(1).some(state => state)) // Als de speler een state ontgrendelt heeft, word de "Normal" State uitgezet/niet meer beschrikbaar
            {
                unlockedStates[0] = false; 
            }
        }
    }
    soundEffect()
    {
        let scream = round(random(0, 100))
        if(scream === 69)
        {
            playerScream.play();
        }
        else
        {
            playerHit.play();
        }
    }

}

function keyReleased() //Deze functie word aan geroepen als er een knop word losgelaten
{
    if(gameState === 'Game')
    {
        if(keyCode === 40) //Als het pijltje naar boven wordt losgelaten, gaat de speler een state terug
        {
            player.previousState();
        }
        else if(keyCode === 38) //Als het pijltje naar beneden wordt losgelaten, gaat de speler een state verder
        {
            player.nextState();
        }

        if(keyCode === 68) //Als de "D" toets word losgelaten, voert deze code uit
        {
            if (player.canDash && player.playerState == 3 && dashBlock === false) //Als de speler in de "Vuur" Element zit en kan dashen, dan start de dash en word canDash false gezet
            {
                player.startDash();
                player.canDash = false;
            }
            else if (player.canPearl && player.playerState == 2 && player.pearlReady === true) //Als de speler in de "Water" Element zit en kan pearlen, dan spawned er een nieuwe pearl in en kan de speler niet opnieuw pearlen
            {
                let pearl = new Pearl(player.pos.x + 25, player.pos.y, player.playerState, player.lastDirection);
                pearlArray.push(pearl)
                player.canPearl = false;
                player.pearlReady = false;
            }
        }
        if(keyCode === 70)
        {
            player.canAttack = true
        }

        if(keyCode === 27 && toggleInfo === 0)
        {
            Hud.showInfo = true
            toggleInfo = 1
        }
        else if(keyCode === 27 && toggleInfo === 1)
        {
            Hud.showInfo = false
            toggleInfo = 0
        }
    }

    else
    {
        // Voorkomt doorscrollen in menu's
        if(keyCode === 40)
        {
            mainMenu.keyReady = true; 
            gameEnd.keyReady = true;   
        }
        if(keyCode === 38)
        {
            mainMenu.keyReady = true;
            gameEnd.keyReady = true;
        }
    
        // Voorkomt doorselecteren in het menu
        if(keyCode === 13)
        {
            mainMenu.selectReady = true;
            gameEnd.selectReady = true;
        }
    }
}