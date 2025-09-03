let GreedyAchievement = 0;
let ExcessiveViolenceAchievement = 0;
let SpeedrunnerAchievement = 0;
let GitGudAchievement = 0;
let AlmostPacifistAchievement = 0;
let TrashAchievement = 0;
let NotIntendedAchievement = 0;
let ThanksForPlayingAchievement = 0;
let DedicatedAchievement = 0;
let playerId;
let playerName;
let password;
let completionTime = 9999;
let score = 0;
let loggedIn = false;
let unlockedAchievements = [GreedyAchievement, ExcessiveViolenceAchievement, SpeedrunnerAchievement, GitGudAchievement, AlmostPacifistAchievement, TrashAchievement, NotIntendedAchievement, ThanksForPlayingAchievement, DedicatedAchievement];


class DatabaseManager
{
    constructor()
    {
        this.setupDatabase();
        //this.createNewSession("Bart", "UrmWatDeSigma" , 1.24, 2647);
    }

            async setupDatabase()
            {
                HICCloud.API.configure({
                    url:"https://api.hbo-ict.cloud",
                    apiKey:"pb2gdg2425_viiteedoovoo54.FakFDuKQqvyvwcVp",
                    database:"pb2gdg2425_viiteedoovoo54_gamedatabase"
                });
    }

    async createNewSession(playerName, password, completionTime, score)
    {
        try
        {
            const insertQuery = `INSERT INTO gamedatabase(PlayerName, Password, CompletionTime, Score, GreedyAchievement, ExcessiveViolenceAchievement, SpeedrunnerAchievement, GitGudAchievement, AlmostPacifistAchievement, TrashAchievement, NotIntendedAchievement, ThanksForPlayingAchievement, DedicatedAchievement)
            VALUES('${playerName}', '${password}', '${completionTime}', '${score}', '${unlockedAchievements[0]}', '${unlockedAchievements[1]}', '${unlockedAchievements[2]}', '${unlockedAchievements[3]}', '${unlockedAchievements[4]}', '${unlockedAchievements[5]}', '${unlockedAchievements[6]}', '${unlockedAchievements[7]}', '${unlockedAchievements[8]}');`;
        
            const params = [playerName, password, completionTime, score, ...unlockedAchievements];
        
            await HICCloud.API.queryDatabase(insertQuery, params);
        
            const selectQuery = `SELECT LAST_INSERT_ID() AS InsertID;`;
            const response = await HICCloud.API.queryDatabase(selectQuery);
        
            if (response && response.length > 0 && response[0].InsertID) 
            {
                playerId = response[0].InsertID;
                this.handleUserLogin(playerName, password);
            } 
            else 
            {
                console.error("Failed to retrieve Insert ID from response.");
            }
        } 
        catch (error) 
        {
            console.error("Failed to create session:", error);
        }
    }
    
    async getPlayerID(playerName, password)
    {
        try
        {
            const selectQuery = `SELECT id FROM gamedatabase WHERE PlayerName = '${playerName}' AND Password = '${password}';`;
        
            const response = await HICCloud.API.queryDatabase(selectQuery);
            
            if (response && response.length > 0) 
            {
                const retrievedId = response[0].id;
                loggedIn = true;
                return retrievedId;
            } 
            else 
            {
                console.log("No matching user found.");
                return null;
            }
        }
        catch (error)
        {
            console.error("Failed to find user:", error);
            return null;
        }
    }

    async handleUserLogin(playerName, password)
    {
        const ID = await databasemanager.getPlayerID(playerName, password);
        if (ID) 
        {
            playerId = ID;
            await this.getAllPlayerData(playerId);
        } 
        else 
        {
            console.log("Login failed. No matching user found.");
        }
    }

    async getAllPlayerData(playerid)
    {
        try
        {
            const selectQuery = `SELECT * FROM gamedatabase WHERE ID = ${playerid};`;
        
            const response = await HICCloud.API.queryDatabase(selectQuery);
        
            if (response && response.length > 0) 
            {
                response.forEach(row => {
                playerName = row.PlayerName;
                password = row.Password;
                completionTime = row.CompletionTime;
                score = row.Score;
                GreedyAchievement = row.GreedyAchievement;
                ExcessiveViolenceAchievement = row.ExcessiveViolenceAchievement;
                SpeedrunnerAchievement = row.SpeedrunnerAchievement;
                GitGudAchievement = row.GitGudAchievement;
                AlmostPacifistAchievement = row.AlmostPacifistAchievement;
                TrashAchievement = row.TrashAchievement;
                NotIntendedAchievement = row.NotIntendedAchievement;
                ThanksForPlayingAchievement = row.ThanksForPlayingAchievement;
                DedicatedAchievement = row.DedicatedAchievement;

                });
                loggedIn = true;
            } 
            else 
            {
                console.log("No data found.");
            }
        }
        catch (error)
        {
            console.error("Failed to retrieve player data:", error);
        }
    }

    async updateSession(playerId, playerName, password, completionTime, score, achievements) 
    {
        try 
        {
            // Ensure achievements array contains exactly 9 values
            if (achievements.length !== 9) 
            {
                console.error("Error: Exactly 9 achievement values must be provided.");
                console.log(achievements.length)
                return;
            }
    
            // Construct the update query using the provided data
            const updateQuery = `
                UPDATE gamedatabase
                SET 
                    PlayerName = '${playerName}',
                    Password = '${password}',
                    CompletionTime = ${completionTime},
                    Score = ${score},
                    GreedyAchievement = ${achievements[0]},
                    ExcessiveViolenceAchievement = ${achievements[1]},
                    SpeedrunnerAchievement = ${achievements[2]},
                    GitGudAchievement = ${achievements[3]},
                    AlmostPacifistAchievement = ${achievements[4]},
                    TrashAchievement = ${achievements[5]},
                    NotIntendedAchievement = ${achievements[6]},
                    ThanksForPlayingAchievement = ${achievements[7]},
                    DedicatedAchievement = ${achievements[8]}
                WHERE ID = ${playerId};
            `;
    
    
            // Execute the query
            const response = await HICCloud.API.queryDatabase(updateQuery);
    
            if (response) 
            {
                this.getAllPlayerData(playerId);
            } 
            else 
            {
                console.log("No rows were updated. Please check the Player ID.");
            }
        } 
        catch (error) 
        {
            console.error("Failed to update session:", error);
        }
    }
    
    getAchievement()
    {
        return [GreedyAchievement, ExcessiveViolenceAchievement, SpeedrunnerAchievement, GitGudAchievement, AlmostPacifistAchievement, TrashAchievement, NotIntendedAchievement, ThanksForPlayingAchievement, DedicatedAchievement];
    }
}

   