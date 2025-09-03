let scoreRequired = 100;
let trashTimeCounter = 360;
let maxCoins = 116;
let currentCoinAmount = 0;
let totalNormalEnemies = 26;
let currentDefeatedEnemies = 0;
let currentBossDefeated = 0;
let totalBossEnemies = 4;
let totalEnemies = totalNormalEnemies + totalBossEnemies;
let speedRunTimer = 180; 
let elementCounter = 0;


class AchievementManager
{
    constructor()
    {

    }

    Greedy()
    {
        if(currentCoinAmount == maxCoins)
        {
            if(loggedIn === true && playLevel === 1)
            {
                if(GreedyAchievement === 0)
                {
                    popup.unlockedAchievement = true;
                    achievement.play();
                }
                GreedyAchievement = 1;
                databasemanager.updateSession(playerId, playerName, password, completionTime, score, databasemanager.getAchievement());
                this.Dedicated();
            }     
        } 
    }

    ExcessiveViolence()
    {
        if((currentDefeatedEnemies + currentBossDefeated) >= totalEnemies)
        {
            if(loggedIn === true && playLevel === 1)
            {
                if(ExcessiveViolenceAchievement === 0)
                {
                    popup.unlockedAchievement = true;
                    achievement.play();
                }
                ExcessiveViolenceAchievement = 1;
                databasemanager.updateSession(playerId, playerName, password, completionTime, score, databasemanager.getAchievement());
                this.Dedicated();
            } 
        }
        
    }

    Speedrunner()
    {
        if(Hud.elapsedTime <= speedRunTimer)
        {
            if(loggedIn === true && playLevel === 1)
            {
                if(SpeedrunnerAchievement === 0)
                {
                    popup.unlockedAchievement = true;
                    achievement.play();
                }
                SpeedrunnerAchievement = 1;
                databasemanager.updateSession(playerId, playerName, password, completionTime, score, databasemanager.getAchievement());
                this.Dedicated();
            } 
        }
    }

    GitGud()
    {
        if(loggedIn === true && playLevel === 1)
        {
            if(GitGudAchievement === 0)
            {
                popup.unlockedAchievement = true;
                achievement.play();
            }
            GitGudAchievement = 1;
            databasemanager.updateSession(playerId, playerName, password, completionTime, score, databasemanager.getAchievement());
            this.Dedicated();
        } 
    }

    AlmostPacifist()
    {
        if(currentDefeatedEnemies === 0)
        {
            if(loggedIn === true && playLevel === 1)
            {
                if(AlmostPacifistAchievement === 0)
                {
                    popup.unlockedAchievement = true;
                    achievement.play();
                }
                AlmostPacifistAchievement = 1;
                databasemanager.updateSession(playerId, playerName, password, completionTime, score, databasemanager.getAchievement());
                this.Dedicated();
            }     
        } 
    }

    Trash()
    {
        if(Hud.elapsedTime >= trashTimeCounter)
        {
            if(loggedIn === true && playLevel === 1)
            {
                if(TrashAchievement === 0)
                {
                    popup.unlockedAchievement = true;
                    achievement.play();
                }
                TrashAchievement = 1;
                databasemanager.updateSession(playerId, playerName, password, completionTime, score, databasemanager.getAchievement());
                this.Dedicated();
            } 
        } 
    }

    NotIntended()
    {
        if(elementCounter != 4)
        {
            if(loggedIn === true && playLevel === 1)
            {
                if(NotIntendedAchievement === 0)
                {
                    popup.unlockedAchievement = true;
                    achievement.play();
                }
                NotIntendedAchievement = 1;
                databasemanager.updateSession(playerId, playerName, password, completionTime, score, databasemanager.getAchievement());
                this.Dedicated();
            } 
        }
    }

    ThanksForPlaying()
    {
        if(Hud.playerScore == scoreRequired)
        {
            if(loggedIn === true && playLevel === 1)
            {
                if(ThanksForPlayingAchievement === 0)
                {
                    popup.unlockedAchievement = true;
                    achievement.play();
                }
                ThanksForPlayingAchievement = 1;
                databasemanager.updateSession(playerId, playerName, password, completionTime, score, databasemanager.getAchievement());
                this.Dedicated();
            } 
        }
    }

    Dedicated()
    {
        unlockedAchievements = databasemanager.getAchievement();
        let totalAchievements = unlockedAchievements.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

        if (totalAchievements >= 8) 
        {
            if(loggedIn === true  && playLevel === 1)
            {
                if(DedicatedAchievement === 0)
                {
                    popup.unlockedAchievement = true;
                    achievement.play();
                }
                DedicatedAchievement = 1;
                databasemanager.updateSession(playerId, playerName, password, completionTime, score, databasemanager.getAchievement());
            } 
        }
    }
}