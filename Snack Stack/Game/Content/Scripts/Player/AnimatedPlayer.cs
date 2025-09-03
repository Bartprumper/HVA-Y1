using Blok3Game.Engine.GameObjects;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;
using Client.GameStates;
using Blok3Game.Engine.SocketIOClient;

public class AnimatedPlayer : AnimatedGameObject
{
    public Team Team { get; private set; }
    private bool _wasMyTurn = false;
    private KeyboardState _previousKeyboardState;
    private bool _isEmoting = false;
    private float _emoteTimer = 0f;
    private string _lastAnimation = "idle";
    private string _currentAnimationId { get; set; }

    private static readonly Vector2 _nederlandPosition = new Vector2(-30, 500);
    private static readonly Vector2 _belgiePosition = new Vector2(925, 500);

    public AnimatedPlayer(Team team, Vector2? startPosition = null)
        : base(0, "AnimatedPlayer")
    {
        Team = team;
        Scale = 1.0f;

        // Standaard posities van de teams
        if (startPosition.HasValue)
            Position = startPosition.Value;
        else if (team == Team.Nederland)
            Position = _nederlandPosition;
        else if (team == Team.Belgie)
            Position = _belgiePosition;

        // Load team-based animations
        if (team == Team.Nederland)
        {
            LoadAnimation("Images/Sprites/PlayerIdleAnimations/Nederland/AdPatatIdle@10x1", "idle", true, 1.0f);
            LoadAnimation("Images/Sprites/PlayerIdleAnimations/Nederland/AdPatatThinking@10x1", "thinking", true, 1.5f);
            LoadAnimation("Images/Sprites/PlayerEmotes/Nederland/AdPatatSpin@9x1", "emote_spin", false, 0.1f);
            LoadAnimation("Images/Sprites/PlayerEmotes/Nederland/AdPatatAngry@13x1", "emote_angry", false, 0.1f);
            LoadAnimation("Images/Sprites/PlayerEmotes/Nederland/AdPatatSad@14x1", "emote_sad", false, 0.05f);
            LoadAnimation("Images/Sprites/PlayerEmotes/TheRockEmoteResize@7x1", "emote_the_rock", false, 0.15f);
        }
        else if (team == Team.Belgie)
        {
            LoadAnimation("Images/Sprites/PlayerIdleAnimations/Belgie/PietFrietIdle@10x1", "idle", true, 1.0f);
            LoadAnimation("Images/Sprites/PlayerIdleAnimations/Belgie/PietFrietThinking@10x1", "thinking", true, 1.5f);
            LoadAnimation("Images/Sprites/PlayerEmotes/Belgie/PietFrietSpin@9x1", "emote_spin", false, 0.15f);
            LoadAnimation("Images/Sprites/PlayerEmotes/Belgie/PietFrietAngry@13x1", "emote_angry", false, 0.1f);
            LoadAnimation("Images/Sprites/PlayerEmotes/Belgie/PietFrietSad@14x1", "emote_sad", false, 0.05f);
            LoadAnimation("Images/Sprites/PlayerEmotes/TheRockEmoteResize@7x1", "emote_the_rock", false, 0.15f);
        }

        PlayAnimation("idle");
    }

    public override void Update(GameTime gameTime)
    {
        base.Update(gameTime);

        var keyboardState = Keyboard.GetState();

        if (!_isEmoting && GameManager.Instance.Team == Team)
        {
            if (keyboardState.IsKeyDown(Keys.D1) && !_previousKeyboardState.IsKeyDown(Keys.D1))
                SendEmote("emote_spin", 1.0f);
            else if (keyboardState.IsKeyDown(Keys.D2) && !_previousKeyboardState.IsKeyDown(Keys.D2))
                SendEmote("emote_angry", 2.0f);
            else if (keyboardState.IsKeyDown(Keys.D3) && !_previousKeyboardState.IsKeyDown(Keys.D3))
                SendEmote("emote_sad", 1.0f);
            else if (keyboardState.IsKeyDown(Keys.D4) && !_previousKeyboardState.IsKeyDown(Keys.D4))
                SendEmote("emote_the_rock", 1.0f);
        }

        if (_isEmoting)
        {
            _emoteTimer -= (float)gameTime.ElapsedGameTime.TotalSeconds;

            if (_emoteTimer <= 0)
            {
                _isEmoting = false;
                PlayAnimation(_lastAnimation);
            }
            _previousKeyboardState = keyboardState;
            return;
        }

        // Beurten bepalen van de teams
        bool isMyTurn = GameManager.Instance != null && Team == GameManager.Instance.CurrentPlayer;
        if (isMyTurn != _wasMyTurn)
        {
            SetTurnState(isMyTurn);
            _wasMyTurn = isMyTurn;
        }

        _previousKeyboardState = keyboardState;
    }

    // Nieuwe animatie afspelen
    public new void PlayAnimation(string id, bool forceRestart = false, int startSheetIndex = 0)
    {
        base.PlayAnimation(id, forceRestart, startSheetIndex);
        _currentAnimationId = id;
    }

    public void PlayEmote(string emoteName, float duration = 1.0f)
    {
        if (!_isEmoting && animations.ContainsKey(emoteName))
        {
            _lastAnimation = _currentAnimationId ?? "idle"; // Animatie frame dat voor de emote afspeelde
            PlayAnimation(emoteName, true);
            _isEmoting = true;
            _emoteTimer = duration;
        }
    }

    public void SetTurnState(bool isMyTurn)
    {
        if (isMyTurn)
            PlayAnimation("thinking");
        else
            PlayAnimation("idle");
    }

    private void SendEmote(string emoteName, float duration)
    {

        // verstuurder en ontvanger teams bepalen
        Team senderTeam = GameManager.Instance.Team;
        Team receiverTeam = senderTeam == Team.Nederland ? Team.Belgie : Team.Nederland;

        // Verstuur naar de server
        var emoteData = new EmoteData
        {
            game = GameManager.Instance.IdMatch,
            senderTeam = senderTeam,
            receiverTeam = receiverTeam,
            emote = emoteName,
            duration = duration
        };
        SocketClient.Instance.SendDataPacket(emoteData);
    }
}