using System;
using System.Text.Json.Serialization;
using Blok3Game.Engine.GameObjects;
using Blok3Game.Engine.JSON;
using Blok3Game.Engine.SocketIOClient;
using Client.GameObjects;
using System.Collections.Concurrent;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Blok3Game.Game.UI;

namespace Client.GameStates
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Team // Representeert de teams in de game
    {
        Nederland,
        Belgie
    }

    public class GameManager : GameObjectList
    {
        // Gamevariabelen
        public int TurnCounter { get; private set; } = 1; // Beurtenteller voor het spel, begint bij 1
        public Team CurrentPlayer { get; private set; } = Team.Nederland; // De huidige speler, begint bij Nederland

        public int IdMatch { get; private set; } // Match-ID, wordt ingesteld bij het starten van het spel
        public string RoomId { get; private set; } // Kamer-ID, wordt ingesteld bij het starten van het spel
        public Team Team { get; private set; } // Het team van de speler, wordt ingesteld bij het starten van het spel
        public string Direction { get; private set; } = "Standaard"; // Standaard draairichting
        public int DropTotal { get; private set; } // Totaal aantal drops
        public int RotationTotal { get; private set; } // Totaal aantal rotaties
        public int CloseCallTotal { get; private set; } // Totaal aantal close calls
        public string WinningTeam { get; private set; } // Het winnende team
        public int TotalNLwins { get; private set; } // Totaal aantal wins van Nederland
        public int TotalBEwins { get; private set; } // Totaal aantal wins van Belgie
        private string _nextDirectionText = "Standaard"; // Volgende richting tekst, standaard is "Standaard"
        private int _turnLimit = 8;
        public static GameManager Instance { get; private set; } // Singleton instantie van GameManager
        private GameStateText _gameStateText; // GameStateText voor het tonen van de spelstatus
        private TextGameObject _teamText; // TextGameObject voor het tonen van het team van de speler
        private TextGameObject _turnText; // TextGameObject voor het tonen van de huidige beurt
        private TextGameObject _nextDirection;
        private int _sideTextX = 10; // X-positie voor de zijtekst
        private int _teamtextY = 100; // Y-positie voor de teamtekst
        private int _turntextY = 50; // Y-positie voor de beurttekst
        private ConcurrentQueue<Action> _mainThreadActions = new ConcurrentQueue<Action>(); // Wachtrij voor acties die op de hoofdthread moeten worden uitgevoerd
        public AnimatedPlayer nederlandPlayer;
        public AnimatedPlayer belgiePlayer;
        public ChatBalk chatBalk;

        public GameManager() : base()
        {
            Instance = this; // Singleton-instantie initialiseren
            _gameStateText = new GameStateText("Fonts/SpriteFont@20px"); // GameStateText voor het tonen van de spelstatus aanmaken
            _teamText = new TextGameObject("Fonts/SpriteFont@20px", 0, "TeamText") // TextGameObject voor het tonen van het team van de speler aanmaken
            {
                Text = "Team: " + Team.ToString(),
                Position = new Vector2(_sideTextX, _teamtextY),
                Color = Color.White,
                Visible = true
            };
            _turnText = new TextGameObject("Fonts/SpriteFont@20px", 0, "TurnText") // TextGameObject voor het tonen van de huidige beurt aanmaken
            {
                Text = $"Rotatie in " + _turnLimit  + " beurten",
                Position = new Vector2(_sideTextX, _turntextY),
                Color = Color.White,
                Visible = true
            };
            _nextDirection = new TextGameObject("Fonts/SpriteFont@20px", 1, "text")
            {
                Color = Color.White,
                Position = new Vector2(_sideTextX, 0),
                Text = $"Next direction: Standaard"
            };
            Add(_gameStateText);
            Add(_teamText);
            Add(_turnText);
            Add(_nextDirection);
            Initialize();
        }

        private void Initialize()
        {
            // Abonneer op datapakketten van de server
            SocketClient.Instance.SubscribeToDataPacket<StartGameData>(OnStartGameDataReceived);
            SocketClient.Instance.SubscribeToDataPacket<MoveData>(OnMoveDataReceived);
            SocketClient.Instance.SubscribeToDataPacket<TurnSwitchData>(OnTurnSwitchDataReceived);
            SocketClient.Instance.SubscribeToDataPacket<DirectionData>(OnDirectionDataReceived);
            SocketClient.Instance.SubscribeToDataPacket<MatchData>(OnMatchDataReceived);
            SocketClient.Instance.SubscribeToDataPacket<GlobalWinData>(OnGlobalDataReceived);
            SocketClient.Instance.SubscribeToDataPacket<EmoteData>(OnEmoteDataReceived);
            SocketClient.Instance.SubscribeToDataPacket<ChatMessageData>(OnChatMessageReceived);
        }

        private void OnMoveDataReceived(MoveData data)
        {
            // Voer de actie uit op de hoofdthread
            _mainThreadActions.Enqueue(() =>
            {
                if (data.team != Team) // Controleer of de ontvangen data van de andere speler is
                {
                    Grid.Instance.SpawnBall(data.selectedColumn, data.team); // Spawn de bal in de grid voor de andere speler
                }
                SendTurnSwitchData(data.team, GetNextTeam(data.team), data.turn); // Stuur een bericht om de beurt te wisselen
            }); 
        }

        private Team GetNextTeam(Team fromTeam)
        {
            return fromTeam == Team.Nederland ? Team.Belgie : Team.Nederland; // Bepaal het volgende team op basis van het huidige team
        }

        private void SendTurnSwitchData(Team fromTeam, Team toTeam, int turn)
        {
            // Maak een TurnSwitchData-object aan en stuur het naar de server
            TurnSwitchData switchData = new TurnSwitchData
            {
                game = IdMatch,
                turn = turn,
                fromTeam = fromTeam,
                toTeam = toTeam
            };
            SocketClient.Instance.SendDataPacket(switchData);
        }

        private void OnStartGameDataReceived(StartGameData data)
        {
            // Initialiseer de game met de ontvangen data
            IdMatch = data.IdMatch;
            RoomId = data.RoomId;
            Team = data.Team;
            CurrentPlayer = Team.Nederland;
            _teamText.Text = "Team " + Team.ToString(); // Zet de teamtekst
            RequestDirectionData();
        }

        private void OnTurnSwitchDataReceived(TurnSwitchData data)
        {
            // Als de beurt wordt gewisseld, werk de huidige speler en beurt bij
            CurrentPlayer = data.toTeam;
            TurnCounter = data.turn;
            _turnText.Text = "Rotatie in " + (_turnLimit - Grid.Instance.dropCounter) + " beurten";
            ShowMessage($"Beurt gewisseld: {data.fromTeam} → {data.toTeam}");
        }

        public void SendMoveData(int SelectedColumn)
        {
            // Stuur de MoveData naar de server
            MoveData moveData = new MoveData
            {
                game = IdMatch,
                turn = TurnCounter,
                team = Team,
                selectedColumn = SelectedColumn
            };

            SocketClient.Instance.SendDataPacket(moveData);
        }

        public void handleMoveText()
        {
            if (Team != CurrentPlayer) // Als het team van de speler niet gelijk is aan de huidige speler
            {
                ShowMessage("Wachten op andere speler..."); // Toon een bericht dat de speler moet wachten op de andere speler
            }
            else
            {
                ShowMessage($"Jouw beurt: {CurrentPlayer}"); // Toon een bericht dat het de beurt van de speler is
            }
        }

        public void RequestDirectionData() // Vraag de rotatierichting op van de server
        {
            DirectionData rotationData = new DirectionData
            {
                direction = Direction
            };
            SocketClient.Instance.SendDataPacket(rotationData);
        }

        private void OnDirectionDataReceived(DirectionData data)
        {
            Grid.Instance.SetDirection(data.direction); // Zet de richting van de rotatie in de grid
            if (data.direction == "clockwise")
            {
                _nextDirectionText = "Met de klok mee";
            }
            else if (data.direction == "counterclockwise")
            {
                _nextDirectionText = "Tegen de klok in";
            }
            _nextDirection.Text = $"Volgende draairichting: {_nextDirectionText}";
            _turnText.Text = "Rotatie in " + (_turnLimit - Grid.Instance.dropCounter) + " beurten";
        }

        public void SendMatchData(int drops, int rotations, int closecalls, string team) // Verstuur match data naar de server
        {
            MatchData matchData = new MatchData
            {
                game_idMatch = IdMatch,
                totalDrops = drops,
                totalRotations = rotations,
                nearWins = closecalls,
                winner = team
            };
            SocketClient.Instance.SendDataPacket(matchData);
        }

        public void OnMatchDataReceived(MatchData data) // Ontvang matchdata van uit de server
        {
            DropTotal = data.totalDrops;
            RotationTotal = data.totalRotations;
            CloseCallTotal = data.nearWins;
            WinningTeam = data.winner;
            RequestGlobalData();
        }

        public void RequestGlobalData() // Vraag het totaal aantal wins van beide teams op
        {
            GlobalWinData globalWinData = new GlobalWinData
            {
                nlwins = 0,
                bewins = 0
            };
            SocketClient.Instance.SendDataPacket(globalWinData);
        }

        public void OnGlobalDataReceived(GlobalWinData data) // Ontvang het totaal aantal wins van beide teams
        {
            TotalNLwins = data.nlwins;
            TotalBEwins = data.bewins;
            EndGameScreen.Instance.CreateTexts(); // Update de teksten in het eindscherm
        }


        private void OnEmoteDataReceived(EmoteData data)
        {
            // Speel emote af voor zowel zender als ontvanger
            if (data.senderTeam == Team.Nederland)
            {
                nederlandPlayer.PlayEmote(data.emote, data.duration);
            }
            else if (data.senderTeam == Team.Belgie)
            {
                belgiePlayer.PlayEmote(data.emote, data.duration);
            }
        }

        public void SendChatMessage(string message)
        {
            ChatMessageData chatMessageData = new ChatMessageData
            {
                game = IdMatch,
                fromTeam = Team, // Bepaal het team van de afzender
                toTeam = GetNextTeam(Team),
                message = message
            };
            SocketClient.Instance.SendDataPacket(chatMessageData);
        }

        private void OnChatMessageReceived(ChatMessageData data)
        {
            _mainThreadActions.Enqueue(() =>
            {
                if (data.fromTeam == Team.Nederland) // Controleer of het bericht van de andere speler is
                {
                    chatBalk.CreateChatBubble(data.message, data.fromTeam); // Maak een chatballon aan voor het ontvangen bericht
                }
                else
                {
                    chatBalk.CreateChatBubble(data.message, data.fromTeam); // Maak een chatballon aan voor het eigen bericht
                }
            }); 
        }

        public void ShowMessage(string message)
        {
            _gameStateText.ShowCheckText(message);
        }

        public override void Update(GameTime gameTime)
        {
            // Voer alle acties uit die op de UI-thread moeten gebeuren
            while (_mainThreadActions.TryDequeue(out var action))
            {
                action();
            }
            base.Update(gameTime);
            handleMoveText(); // Behandel de tekst voor de beurten
        }
    }
}
