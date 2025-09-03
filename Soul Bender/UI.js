class UI // Algemene UI Class
{
    constructor()
    {
        this.buttonTextX = width / 2
        this.buttonTextY = 360
        this.buttonTextOffset = 140
        this.selectorPosX = width / 2
        this.selectorPosY = 350
        this.keyReady = true
    }
    draw()
    {

    }

    update()
    {

    }

    backdrop() // Achtergrond in de menu's
    {
        background(menuBackground)
        image(gameTitle, 380, 20)
    }

    buttons() // Uiterlijk van de knoppen
    {
        rectMode(CENTER)
        stroke(255)
        strokeWeight(2)
        fill(0, 0, 0, 180)
        for(var i = 0; i < 3; i++)
        {
            rect(width / 2, 350 + 140 * i, 375, 75)
        }
        rectMode(CORNER)
    }

    selector() // Uiterlijk van de selector
    {
        this.selectorPulse = map(sin(frameCount / 20), -1, 1, 1, 30)
        rectMode(CENTER)
        stroke(255, 255, 0)
        strokeWeight(5)
        fill(0, 0, 0, 0)
        rect(this.selectorPosX, this.selectorPosY, 375 + this.selectorPulse, 75 + this.selectorPulse)

        // line(this.selectorPosX, this.selectorPosY - 75, this.selectorPosX - 30, this.selectorPosY - 60)
        // line(this.selectorPosX, this.selectorPosY - 75, this.selectorPosX + 30, this.selectorPosY - 60)
        // line(this.selectorPosX, this.selectorPosY + 75, this.selectorPosX - 30, this.selectorPosY + 60)
        // line(this.selectorPosX, this.selectorPosY + 75, this.selectorPosX + 30, this.selectorPosY + 60)

        rectMode(CORNER)
    }

    selectorControl() // Besturing van de selector
    {
         // Omlaag scrollen in het menu
         if(keyIsDown(40))
            {
                if(this.selectorPosY <= 400 && this.keyReady === true)
                {
                    this.selectorPosY += 140
                    this.keyReady = false
                }
                else if(this.selectorPosY <= 600 && this.keyReady === true)
                {
                    this.selectorPosY += 140
                    this.keyReady = false
                }
                else if(this.selectorPosY <= 700 && this.keyReady === true)
                {
                    this.selectorPosY -= 280
                    this.keyReady = false
                }
            }
    
            // Omhoog scrollen in het menu
            if(keyIsDown(38))
            {
                if(this.selectorPosY <= 400 && this.keyReady === true)
                {
                    this.selectorPosY += 280
                    this.keyReady = false
                }
                else if(this.selectorPosY <= 600 && this.keyReady === true)
                {
                    this.selectorPosY -= 140
                    this.keyReady = false
                }
                else if(this.selectorPosY <= 700 && this.keyReady === true)
                {
                    this.selectorPosY -= 140
                    this.keyReady = false
                }
            }
    }
}

class MainMenu extends UI // Class voor het gehele hoofdmenu
{
    constructor()
    {
        super()
        this.account = false;
        this.showLevelselect = false;
        this.viewAchievements = false
        this.selectReady = true;
        this.createAccount = false;
        this.signInAccount = false;
        this.controlX = 160
        this.controlY = 170
        this.controlOffset = 40;
        this.achievementX = 240
        this.achievementX2 = 500
        this.achievementY = 150
        this.achievementOffset = 50
        this.iconX = 180
        this.iconY = 125
        this.loggedInText = 'not signed in';
        this.canLogIn = true;

        // Input fields
        this.usernameInput = null;
        this.passwordInput = null;
    }

    draw()
    {
        this.backdrop();
        this.buttons();
        this.selector();
        this.buttonText();
        this.credits();
        this.logInText();
        
        if(this.account === true)
        {
            this.manageAccount();
        }

        else if(this.showLevelselect === true)
        {
            this.levelselect();
        }

        else if(this.createAccount === true)
        {
            this.makeAccount();
        }

        else if(this.signInAccount === true)
        {
            this.signIn();
        } 

        else if(this.viewAchievements === true)
        {
            this.showAchievements();
        }
    }

    saveAndRemoveInputs() {
        // Handle the username input
        let validName = false;
        let validPassword = false;
        if (this.usernameInput) {
            let usernameValue = this.usernameInput.value().trim();
            // Check if the username input is empty
            if (usernameValue === '') {
                console.log('Username is empty');
                this.canLogIn = true;
                validName = false;
            } else {
                // Save the value to playerName variable
                playerName = usernameValue;
                validName = true;
            }
            
            // After processing, remove the username input field
            this.usernameInput.remove(); 
            this.usernameInput = null; // Set it to null to ensure no lingering references
        }
    
        // Handle the password input
        if (this.passwordInput) {
            let passwordValue = this.passwordInput.value().trim();
            // Check if the password input is empty
            if (passwordValue === '') {
                console.log('Password is empty');
                this.canLogIn = true;
                validPassword = false;
            } else {
                // Save the value to password variable
                password = passwordValue;
                validPassword = true;
            }
    
            // After processing, remove the password input field
            this.passwordInput.remove();
            this.passwordInput = null; // Ensure it's removed correctly
        }
    
        // Handle the password toggle button
        if (this.togglePasswordButton) {
            this.togglePasswordButton.remove();
            this.togglePasswordButton = null;
        }
        
        if (validName && validPassword)
        {
            return true;
        }
        return null
    }
    
    

    buttonText() // Text op de knoppen in het hoofdmenu
    {
        textFont(gameUI)
        textAlign(CENTER)
        textSize(35)
        noStroke()
        fill(255)
        text('Start Game', this.buttonTextX, this.buttonTextY)
        text('Manage Account', this.buttonTextX, this.buttonTextY + this.buttonTextOffset)
        text('View Achievements', this.buttonTextX, this.buttonTextY + this.buttonTextOffset * 2)
        
        textAlign(RIGHT)
        text('Navigate Menu:', width - 10, 30);
        text('Arrow Keys', width - 10, 70);
        text('Enter', width - 10, 110);
        textAlign(CENTER)
    }

    

    manageAccount() // Scherm wat te zien is als 'Controls' geselecteerd is
    {
        background(menuBackground)
        this.buttons();
        this.selector();
        noStroke()
        fill(255)
        text('Create Account', this.buttonTextX, this.buttonTextY)
        text('Sign in', this.buttonTextX, this.buttonTextY + this.buttonTextOffset)
        text('Return', this.buttonTextX, this.buttonTextY + this.buttonTextOffset * 2)
        rectMode(CENTER)
        stroke(255)
        strokeWeight(2)
        fill(0)
        //rect(width / 2, 320, 900, 450)
        //this.controlMap();
        rectMode(CORNER)
    }

    controlMap() // Bevat alle uitleg over de controls
    {
        
        textAlign(LEFT);
        fill(255);
        noStroke();
        text('Gameplay Controls', this.controlX, 130);
        rect(this.controlX + 70, 140, 150, 2);
        textSize(25);
        text('Move Player: Left & Right Arrow Keys', this.controlX, this.controlY);
        text('Jump: Spacebar', this.controlX, this.controlY + this.controlOffset);
        text('Attack: F', this.controlX, this.controlY + this.controlOffset * 2);
        text('Switch Element: Up & Down Arrow Keys', this.controlX, this.controlY + this.controlOffset * 3);
        text('Dash / Pearl: D', this.controlX, this.controlY + this.controlOffset * 4);
        text('Doublejump / Walljump: Spacebar', this.controlX, this.controlY + this.controlOffset * 5);
        
    }

    levelselect() // Scherm wat te zien is als 'Start Game' geselecteerd is
    {
        background(menuBackground);
        this.buttons();
        this.selector();
        noStroke();
        fill(255);
        text('Tutorial', this.buttonTextX, this.buttonTextY);
        text('Level 1', this.buttonTextX, this.buttonTextY + this.buttonTextOffset);
        text('Return', this.buttonTextX, this.buttonTextY + this.buttonTextOffset * 2);

    }

    credits() // Kleine tekst onderin het hoofdmenu
    {
        textSize(20)
        text('Created by: Menno Weerman & Bart Prumper', 990, 790)
        text('Version 1.0.1', 60, 790)
        textSize(35)
    }

    makeAccount()
    {
        background(menuBackground);
        this.buttons();
        this.selector();
        rectMode(CENTER)
        stroke(255)
        strokeWeight(2)
        fill(0)
        rect(width / 2, 320, 900, 450)
        noStroke();
        fill(255);

        text('Username:', width / 2 - 200, 300);
        text('Password:', width / 2 - 200, 360);

        if (!this.usernameInput) {
            this.usernameInput = createInput('');
            this.usernameInput.position(width / 2 - 80, 280);
            this.usernameInput.style('color', '#FFF'); // Text color to black
            this.usernameInput.style('background', 'transparent'); // Background remains transparent
            this.usernameInput.style('border', '1px solid #FFF'); // Optional: Border style
            this.usernameInput.size(200);
        }
        
        if (!this.passwordInput) {
            this.passwordInput = createInput('', 'password');
            this.passwordInput.position(width / 2 - 80, 340);
            this.passwordInput.style('color', '#FFF');
            this.passwordInput.style('background', 'transparent');
            this.passwordInput.style('border', '1px solid #FFF');
            this.passwordInput.size(200);
        
            // Create the toggle button for the password
            this.togglePasswordButton = createButton('👁️'); // Eye icon or any other label
            this.togglePasswordButton.position(width / 2 + 130, 340); // Adjust position as needed
            this.togglePasswordButton.style('background', '#FFF');
            this.togglePasswordButton.style('color', '#000');
            this.togglePasswordButton.style('border', '1px solid #FFF');
            this.togglePasswordButton.mousePressed(() => {
                // Toggle the password input type
                if (this.passwordInput.attribute('type') === 'password') {
                    this.passwordInput.attribute('type', 'text'); // Make password visible
                    this.togglePasswordButton.html('🙈'); // Change icon or text to indicate hidden
                } else {
                    this.passwordInput.attribute('type', 'password'); // Hide password
                    this.togglePasswordButton.html('👁️'); // Change icon or text back
                }
            });
        }
        

        noStroke();
        fill(255);
        text('Return', this.buttonTextX, this.buttonTextY + this.buttonTextOffset * 2);
    }

    signIn()
    {
        background(menuBackground);
        this.buttons();
        this.selector();
        rectMode(CENTER)
        stroke(255)
        strokeWeight(2)
        fill(0)
        rect(width / 2, 320, 900, 450)

        noStroke();
        fill(255);
        text('Username:', width / 2 - 200, 300);
        text('Password:', width / 2 - 200, 360);
        if (!this.usernameInput) {
            this.usernameInput = createInput('');
            this.usernameInput.position(width / 2 - 80, 280);
            this.usernameInput.style('color', '#FFF'); // Text color to black
            this.usernameInput.style('background', 'transparent'); // Background remains transparent
            this.usernameInput.style('border', '1px solid #FFF'); // Optional: Border style
            this.usernameInput.size(200);
        }
        
        if (!this.passwordInput) {
            this.passwordInput = createInput('', 'password');
            this.passwordInput.position(width / 2 - 80, 340);
            this.passwordInput.style('color', '#FFF');
            this.passwordInput.style('background', 'transparent');
            this.passwordInput.style('border', '1px solid #FFF');
            this.passwordInput.size(200);
        
            // Create the toggle button for the password
            this.togglePasswordButton = createButton('👁️'); // Eye icon or any other label
            this.togglePasswordButton.position(width / 2 + 130, 340); // Adjust position as needed
            this.togglePasswordButton.style('background', '#FFF');
            this.togglePasswordButton.style('color', '#000');
            this.togglePasswordButton.style('border', '1px solid #FFF');
            this.togglePasswordButton.mousePressed(() => {
                // Toggle the password input type
                if (this.passwordInput.attribute('type') === 'password') {
                    this.passwordInput.attribute('type', 'text'); // Make password visible
                    this.togglePasswordButton.html('🙈'); // Change icon or text to indicate hidden
                } else {
                    this.passwordInput.attribute('type', 'password'); // Hide password
                    this.togglePasswordButton.html('👁️'); // Change icon or text back
                }
            });
        }
        

        noStroke();
        fill(255);
        text('Return', this.buttonTextX, this.buttonTextY + this.buttonTextOffset * 2);
    }

    showAchievements()
    {
        background(menuBackground);
        this.buttons();
        this.selector();
        gameEnd.selector();
        rectMode(CENTER);
        stroke(255);
        strokeWeight(2);
        fill(0);
        rect(width / 2, 310, 900, 520);
        noStroke();
        fill(255);
        textSize(35)
        textAlign(CENTER)
        text('Return', this.buttonTextX, this.buttonTextY + this.buttonTextOffset * 2);
        text('Best Time: ' + completionTime, width / 2 - 200, this.achievementY - this.achievementOffset)
        text('Highest score: ' + score, width / 2 + 200, this.achievementY - this.achievementOffset)

        textAlign(LEFT);
        textSize(25)
        text('Greedy', this.achievementX, this.achievementY);
        text('- Collect All Coins', this.achievementX2, this.achievementY);
        text('Excessive Violence', this.achievementX, this.achievementY + this.achievementOffset);
        text('- Defeat All Enemies', this.achievementX2, this.achievementY + this.achievementOffset);
        text('SpeedRunner', this.achievementX, this.achievementY + this.achievementOffset * 2);
        text('- Beat the game in under 3 minutes', this.achievementX2, this.achievementY + this.achievementOffset * 2);
        text('Git Gud', this.achievementX, this.achievementY + this.achievementOffset * 3);
        text('- Fall off the map', this.achievementX2, this.achievementY + this.achievementOffset * 3);
        text('Almost Pacifist', this.achievementX, this.achievementY + this.achievementOffset * 4);
        text('- Spare all small Enemies', this.achievementX2, this.achievementY + this.achievementOffset * 4);
        text('Trash', this.achievementX, this.achievementY + this.achievementOffset * 5);
        text('- Take longer than 6 minutes to beat the game', this.achievementX2, this.achievementY + this.achievementOffset * 5);
        text('Not Intended', this.achievementX, this.achievementY + this.achievementOffset * 6);
        text('- Beat the game without collecting all Elements', this.achievementX2, this.achievementY + this.achievementOffset * 6);
        text('Thanks for Playing', this.achievementX, this.achievementY + this.achievementOffset * 7);
        text('- Achieve a score of at least 100', this.achievementX2, this.achievementY + this.achievementOffset * 7);
        text('Dedicated', this.achievementX, this.achievementY + this.achievementOffset * 8);
        text('- Unlock all Achievements', this.achievementX2, this.achievementY + this.achievementOffset * 8);

        this.achievementIcons()
    }    

    achievementIcons()
    {
        image(lockIcon, this.iconX, this.iconY, 35, 35)
        image(lockIcon, this.iconX, this.iconY + this.achievementOffset, 35, 35)
        image(lockIcon, this.iconX, this.iconY + this.achievementOffset * 2, 35, 35)
        image(lockIcon, this.iconX, this.iconY + this.achievementOffset * 3, 35, 35)
        image(lockIcon, this.iconX, this.iconY + this.achievementOffset * 4, 35, 35)
        image(lockIcon, this.iconX, this.iconY + this.achievementOffset * 5, 35, 35)
        image(lockIcon, this.iconX, this.iconY + this.achievementOffset * 6, 35, 35)
        image(lockIcon, this.iconX, this.iconY + this.achievementOffset * 7, 35, 35)
        image(lockIcon, this.iconX, this.iconY + this.achievementOffset * 8, 35, 35)

        if(GreedyAchievement === 1)
        {
            image(trophy, this.iconX, this.iconY, 35, 35)
        }
        if(ExcessiveViolenceAchievement === 1)
        {
            image(trophy, this.iconX, this.iconY + this.achievementOffset, 35, 35)
        }
        if(SpeedrunnerAchievement === 1)
        {
            image(trophy, this.iconX, this.iconY + this.achievementOffset * 2, 35, 35)
        }
        if(GitGudAchievement === 1)
        {
            image(trophy, this.iconX, this.iconY + this.achievementOffset * 3, 35, 35)
        }
        if(AlmostPacifistAchievement === 1)
        {
            image(trophy, this.iconX, this.iconY + this.achievementOffset * 4, 35, 35)
        }
        if(TrashAchievement === 1)
        {
            image(trophy, this.iconX, this.iconY + this.achievementOffset * 5, 35, 35)
        }
        if(NotIntendedAchievement === 1)
        {
            image(trophy, this.iconX, this.iconY + this.achievementOffset * 6, 35, 35)
        }
        if(ThanksForPlayingAchievement === 1)
        {
            image(trophy, this.iconX, this.iconY + this.achievementOffset * 7, 35, 35)
        }
        if(DedicatedAchievement === 1)
        {
            image(trophy, this.iconX, this.iconY + this.achievementOffset * 8, 35, 35)
        }
    }

    update()
    {
        this.selectorControl();
        
        if(keyIsDown(13)) // Functionaliteit van de Selector wanneer ENTER ingedrukt wordt
        {
            // Bovenste positie
            if(this.selectorPosY <= 400 && this.selectReady === true)
            {
                if(this.account === false && this.showLevelselect === false && this.viewAchievements === false)
                {
                    this.selectReady = false;
                    this.showLevelselect = true;
                    
                }
                else if(this.account === true)
                {
                    this.selectReady = false;
                    this.createAccount = true;
                    this.account = false;
                }
                else if(this.showLevelselect === true)
                {
                    playLevel = 0;
                    gameState = 'Game'
                    this.selectReady = false
                    this.showLevelselect = false
                }
                
            }

            // Middelste positie
            else if(this.selectorPosY <= 600 && this.selectReady === true)
            {
                if(this.account === false && this.showLevelselect === false && this.viewAchievements === false)
                {
                    this.account = true
                    this.selectReady = false
                }
                else if(this.account === true)
                {
                    this.selectReady = false
                    this.signInAccount = true;
                    this.account = false;
                }
                else if(this.showLevelselect === true)
                {
                    playLevel = 1;
                    gameState = 'Game'
                    this.selectReady = false
                    this.showLevelselect = false
                }
                
            }

            // Onderste positie
            else if(this.selectorPosY <= 700 && this.selectReady === true)
            {
                if(this.account === false && this.showLevelselect === false && this.createAccount === false && this.signInAccount === false && this.viewAchievements === false) 
                {
                    this.viewAchievements = true
                    this.selectReady = false
                }
                else if(this.account === true)
                {
                    this.account = false;
                    this.selectReady = false;
                }
                else if(this.showLevelselect === true)
                {
                    this.showLevelselect = false;
                    this.selectReady = false;
                }
                else if(this.viewAchievements === true)
                {
                    this.viewAchievements = false
                    this.selectReady = false
                }
                else if(this.createAccount === true)
                {
                    if(this.canLogIn)
                    {
                        this.canLogIn = false;
                        if(!loggedIn)
                        {
                            this.saveAndRemoveInputs();
                            if(this.saveAndRemoveInputs)
                            {
                                databasemanager.createNewSession(playerName, password , 999999, score);
                            }
                        }
                        this.usernameInput = null;
                        this.passwordInput = null;
                        this.selectReady = false;
                        this.createAccount = false;
                        this.showLevelselect = true;
                    }
                    else
                    {   
                        this.usernameInput = null;
                        this.passwordInput = null;
                        this.selectReady = false;
                        this.createAccount = false;
                        this.showLevelselect = true;
                    }
                    
                }
                else if(this.signInAccount === true)
                {
                    if(this.canLogIn)
                    {
                        this.canLogIn = false
                        if(!loggedIn)
                        {
                            this.saveAndRemoveInputs();
        
                            if(this.saveAndRemoveInputs)
                            {
                                databasemanager.handleUserLogin(playerName, password);
                            }
                               
                        }
                        this.usernameInput = null;
                        this.passwordInput = null;
                        this.selectReady = false;
                        this.signInAccount = false;
                        this.showLevelselect = true;
                    }
                    
                }
            }   
        }
    }

    logInText()
    {
        if(loggedIn)
        {
            this.loggedInText = "Username: " + playerName;
        }
        else
        {
            this.loggedInText = "Not Logged In"
        }

        textAlign(LEFT)
        noStroke()
        fill(255)
        text(this.loggedInText, 50, 50, 50)
        textAlign(CENTER)
    }
}



class GameEnd extends UI // Class voor het GameEnd scherm
{
    constructor()
    {
        super()
        this.selectReady = true;
        this.gameWon = false;
        this.viewAchievements = false
    }

    draw()
    {
        this.backdrop();
        this.buttons();
        this.selector();
        this.buttonText();
        this.showResults();
        this.gameResult();

        if(this.viewAchievements === true)
        {
            mainMenu.showAchievements();
        }
    }

    backdrop()
    {
        background(menuBackground)
    }

    gameResult()
    {
        textAlign(CENTER)
        textSize(85)
        if(this.gameWon === false)
        {
            text('GameOver', width/ 2, 150)
        }
        else
        {
            text('Victory!', width/ 2, 150)
        }
        textAlign(LEFT)
    }

    update() // Bepaald wat de selector doet 
    {
        this.selectorControl();

        if(keyIsDown(13))
            {
                // Bovenste positie
                if(this.selectorPosY <= 400 && this.selectReady === true)
                {
                    if(this.viewAchievements === false)
                    {
                        levelLoaded = false;
                        gameState = 'Game';
                        this.selectReady = false;
                    }
                }
    
                // Middelste positie
                else if(this.selectorPosY <= 600 && this.selectReady === true)
                {
                    if(this.viewAchievements === false)
                    {
                        mainMenu.selectReady = false;
                        levelLoaded = false;
                        this.selectReady = false;
                        gameState = 'MainMenu';
                    }
                }
    
                // Onderste positie
                else if(this.selectorPosY <= 700 && this.selectReady === true)
                {
                    if(this.viewAchievements === false)
                    {
                        this.viewAchievements = true;
                        this.selectReady = false;
                    }
                    else if(this.viewAchievements === true)
                    {
                        this.viewAchievements = false;
                        this.selectReady = false;
                    }
                }
            }
    }

    buttonText() // Tekst op de knoppen
    {
        textAlign(CENTER)
        textSize(35)
        noStroke()
        fill(255)
        text('Retry Level', this.buttonTextX, this.buttonTextY)
        text('Return to menu', this.buttonTextX, this.buttonTextY + this.buttonTextOffset)
        text('View Achievements', this.buttonTextX, this.buttonTextY + this.buttonTextOffset * 2)
    }

    showResults() // Laad de resultaten zien
    {
        stroke(255)
        strokeWeight(2)
        fill(0, 0, 0, 180)
        rect(1, 250, 300, 400)
        textAlign(LEFT)
        noStroke()
        fill(255)
        text('Results: ', 25, 300)
        text('Time: ' + round(Hud.elapsedTime, 2), 25, 400)
        text('Score: ' + Hud.playerScore, 25, 500)
    }
}

