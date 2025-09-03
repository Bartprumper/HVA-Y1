class HUD extends UI
{
    constructor()
    {
        super()
        this.elapsedTime = 0;
        this.playerScore = 0;
        this.selectY = - 100
        this.controlX = 160
        this.controlX2 = width - 160
        this.controlY = 200
        this.controlY2 = 450
        this.controlOffset = 40
        this.showInfo = false
        
    }

    draw()
    {
        this.playerHealthbar();
        this.healPlayer();
        this.gameTimer();
        this.abilityReady();
        this.score();
        this.currentElement();
        this.controlMap();
    }

    cameraPosition() // Canvas volgt de speler
    {
        this.cameraX = -player.pos.x + width / 2 - 25;
        this.cameraY = -player.pos.y + height / 2;
        translate(this.cameraX, this.cameraY);
    }

    playerHealthbar() // Healthbar van de speler
    {
        resetMatrix();
        fill(100, 100, 100, 140)
        stroke(0)
        strokeWeight(2)
        rect(-10, -10, 330, 100)
        // Kleur veranderd als speler damage krijgt
        if(player.health <= 10)
        {
           fill(120, 255, 50) 
        }
        if(player.health <= 3)
        {
            fill(255, 185, 0)
        }
        if(player.health <= 1)
        {
            fill(255, 0, 0)
        }
        
        rect(10, 10, player.health * 60, 25)

        // Omtrek healthbar
        stroke(0)
        strokeWeight(2)
        fill(0, 0, 0, 0)
        rect(10, 10, 300, 25)

        // Secties van de healthbar
        fill(0)
        for(var i = 0; i < 5; i++)
        {
            rect(10 + i * 60, 10, 1, 25)
        }
        
    }

    healPlayer()
    {
        fill(255, 255, 0)
        rect(10, 70, player.HPup * 50, 10)

        stroke(0)
        strokeWeight(2)
        fill(0, 0, 0, 0)
        rect(10, 70, 250, 10)

        fill(0)
        for(var i = 0; i < 5; i++)
        {
            rect(10 + i * 50, 70, 1, 10)
        }
    }

    abilityReady() // Balk die aangeeft of je ability beschikbaar is
    {
        if(player.canDash === true && player.playerState === 3)
        {
            fill(255, 0, 0)
        }
        else if(player.canPearl === true && player.playerState === 2 && player.pearlReady === true)
        {
            fill(0, 0, 255)
        }
        else if(player.canDoubleJump === true && player.playerState === 1)
        {
            fill(255, 255, 255)
        }
        else if(player.canWallClimb === true && player.playerState === 4)
        {
            fill(150, 100, 0)
        }
        else
        {
            fill(0, 0, 0, 0)
        }
        
        rect(10, 45, 200, 15)
        stroke(0)
        strokeWeight(2)
        fill(0, 0, 0, 0)
        rect(10, 45, 200, 15)
    }

    gameTimer() // Timer
    { 
        this.elapsedTime += deltaTime / 1000
        if(round(this.elapsedTime, 2) == trashTimeCounter)
        {
            achievementmanager.Trash()
        }
        fill(0, 0, 0, 180)
        stroke(255)
        strokeWeight(2)
        rectMode(CENTER)
        rect(width / 2, 0, 120, 50)
        rectMode(CORNER)
        fill(255);
        noStroke();
        textAlign(LEFT);
        textSize(25)
        text(round(this.elapsedTime, 2), width/2 - 25, 20)
    }

    score() // Geeft de score aan op het scherm
    {
        fill(100, 100, 100, 140)
        stroke(0)
        strokeWeight(2)
        rect(1100, -10, 330, 80)
        fill(255);
        noStroke();
        textSize(35)
        textAlign(CENTER)
        text(this.playerScore, 1150, 50)
    }

    currentElement() // Geeft de ontgrendelde elementen weer op het scherm en laat de volgorde van switchen zien
    {
        fill(100, 100, 100, 140)
        stroke(0)
        strokeWeight(2)
        rect(-10, 300, 80, 300)

        fill(155)
        for(var i = 0; i < 4; i++)
        {
            image(lockIcon, 10, 320 + 70 * i, unitSize, unitSize)
        }

        if(unlockedStates[1] === true)
        {
            this.airIcon();
        }
        if(unlockedStates[2] === true)
        {
           this.waterIcon(); 
        }
        if(unlockedStates[3] === true)
        {
            this.fireIcon();
        }
        if(unlockedStates[4] === true)
        {
            this.earthIcon();
        }
        
        
        
        this.elementSelect();
    }

    elementSelect() // Geeft aan wat het huidige element is
    {
        fill(0, 0, 0, 0)
        stroke(255, 255, 0)
        strokeWeight(4)
        rect(10, this.selectY, unitSize, unitSize)
        strokeWeight(2)
        if(player.playerState === 0)
        {
            this.selectY = -100
        }
        if(player.playerState === 1)
        {
            this.selectY = 530
        }
        if(player.playerState === 2)
        {
            this.selectY = 460
        }
        if(player.playerState === 3)
        {
            this.selectY = 390
        }
        if(player.playerState === 4)
        {
            this.selectY = 320
        }
    }

    waterIcon() // Icoon voor water 
    {
        image(waterIcon, 10, 460, unitSize, unitSize)
    }

    earthIcon() // Icoon voor aarde
    {
        image(earthIcon, 10, 320, unitSize, unitSize)
    }

    fireIcon() // Icoon voor vuur
    {
        image(fireIcon, 10, 390, unitSize, unitSize)
    }

    airIcon() // Icoon voor lucht
    {
        image(airIcon, 10, 530, unitSize, unitSize)
    }

    controlMap() // Laat een overzicht van de controls zien als de speler 'Esc' ingedrukt houdt
    {
        if(this.showInfo === true)
        {
            stroke(255)
            fill(0, 0, 0, 200)
            rect(this.controlX - 20, this.controlY - 80, 920, 600)
            rect(width / 2, this.controlY - 80, 2, 600);
            textAlign(LEFT);
            fill(255);
            noStroke();
            text('Gameplay Controls', this.controlX, this.controlY - 40);
            rect(this.controlX, this.controlY - 30, 270, 2);
            textSize(25);
            text('Move Player: Left & Right Arrow Keys', this.controlX, this.controlY);
            text('Jump: Spacebar', this.controlX, this.controlY + this.controlOffset);
            text('Attack: F', this.controlX, this.controlY + this.controlOffset * 2);
            text('Switch Element: Up & Down Arrow Keys', this.controlX, this.controlY + this.controlOffset * 3);
            this.abilityOverview();
            this.objectives();
            this.rules();
            textAlign(CENTER)
        }
    }

    abilityOverview() // Laat een overzicht van de abilities zien als de speler 'Esc'ingedrukt houdt
    {
        textSize(35)
        text('Elemental Abilities', this.controlX, this.controlY2)
        rect(this.controlX, this.controlY2 + 15, 270, 2);
        textSize(25)
        if(unlockedStates[3] === false)
        {
            text('Fire: ???', this.controlX, this.controlY2 + this.controlOffset)
        }
        else
        {
            text('Fire: press D to dash', this.controlX, this.controlY2 + this.controlOffset)
        }
        if(unlockedStates[1] === false)
        {
            text('Air: ???', this.controlX, this.controlY2 + this.controlOffset * 2)
        }
        else
        {
            text('Air: press Spacebar to double jump', this.controlX, this.controlY2 + this.controlOffset * 2)
        }
        if(unlockedStates[2] === false)
        {
            text('Water: ???', this.controlX, this.controlY2 + this.controlOffset * 3)
        }
        else
        {
            text('Water: press D to throw a teleport orb',this.controlX, this.controlY2 + this.controlOffset * 3)
        }
        if(unlockedStates[4] === false)
        {
            text('Earth: ???', this.controlX, this.controlY2 + this.controlOffset * 4)
        }
        else
        {
            text('Earth: able to cling to walls,',this.controlX, this.controlY2 + this.controlOffset * 4)
            text('press Spacebar to walljump', this.controlX + 65, this.controlY2 + this.controlOffset * 5)
        }
    }

    objectives()
    {
        textAlign(RIGHT)
        textSize(35)
        text('Objectives', this.controlX2, this.controlY - 40)
        rect(this.controlX + 610, this.controlY - 30, 270, 2);
        textSize(25)
        text('Defeat large slimes', this.controlX2, this.controlY)
        text('Gather all Elemental Abilities', this.controlX2, this.controlY + this.controlOffset)
        text('Use the Abilities to overcome obstacles', this.controlX2, this.controlY + this.controlOffset * 2)
        text('Reach the exit', this.controlX2, this.controlY + this.controlOffset * 3)
    }

    rules()
    {
        textSize(35)
        text('Rules', this.controlX2, this.controlY2)
        rect(this.controlX + 610, this.controlY2 + 15, 270, 2);
        textSize(25)
        text('Large slimes drop orbs of their Element.', this.controlX2, this.controlY2 + this.controlOffset)
        text('Collect orbs to gain their Elements.', this.controlX2, this.controlY2 + this.controlOffset * 2)
        text('Recover HP for every 5 coins collected.', this.controlX2, this.controlY2 + this.controlOffset * 3)
        text('Signs point to possible paths.', this.controlX2, this.controlY2 + this.controlOffset * 4)
        text('Blue barriers can only be crossed with a', this.controlX2, this.controlY2 + this.controlOffset * 5) 
        text('teleport orb.', this.controlX2, this.controlY2 + this.controlOffset * 6)
    }
}

class Popup extends HUD
{
    constructor()
    {
        super()
        this.unlockedAbility = false;
        this.abilityTimer = 300;
        this.unlockedAchievement = false;
        this.achievementTimer = 300;
    }

    draw()
    {
        this.abilityUnlock();
        this.achievementUnlock();
    }

    abilityUnlock() // Er komt een popup op het scherm te staan wanneer de speler een nieuwe ability unlocked
    {
        textSize(40)
        if(this.unlockedAbility === true)
        {
            this.abilityTimer -= 1;
            this.popupBox(875, 100);
            noStroke();
            fill(255);
            text('New ability unlocked! Press Escape to view abilities', width / 2, this.controlY);
        }
        if(this.abilityTimer <= 0)
        {
            this.unlockedAbility = false;
            this.abilityTimer = 300;
        }
        
    }

    popupBox(boxWidth, boxHeight) // Een semi transparante rechthoek als achtergrond voor de pop-up tekst
    {
        rectMode(CENTER);
        fill(0, 0, 0, 150);
        stroke(255);
        rect(width / 2, this.controlY, boxWidth, boxHeight);
        rectMode(CORNER);
    }

    achievementUnlock()
    {
        textSize(40)
        if(this.unlockedAchievement === true)
        {
            this.achievementTimer -= 1;
            this.popupBox(920, 90);
            noStroke();
            fill(255);
            textAlign(CENTER)
            text('Achievement unlocked! View achievements in the Menu', width / 2, this.controlY);
            textAlign(LEFT)
        }
        if(this.achievementTimer <= 0)
        {
            this.unlockedAchievement = false;
            this.achievementTimer = 300;
        }
    }
}