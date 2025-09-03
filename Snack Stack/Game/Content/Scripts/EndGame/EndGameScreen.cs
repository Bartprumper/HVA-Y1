using Blok3Game.Engine.GameObjects;
using Blok3Game.Engine.UI;
using Blok3Game.GameStates;
using Client.GameStates;
using Microsoft.Xna.Framework;


public class EndGameScreen : MovableMenuItem
{
    public static EndGameScreen Instance { get; private set; }
    private Button _buttonReturn;
    private TextGameObject _winText;
    private TextGameObject _loseText;
    private TextGameObject _matchData;
    private int _winOrLoseXpos = 550;
    private int _winOrLoseYpos = 250;
    private int _buttonReturnXPos = 520;
    private int _buttonReturnYPos = 800;

    public EndGameScreen() : base()
    {
        CreateButtons();
        Instance = this;
    }

    public void CreateTexts()
    {
        if(GameManager.Instance.Team.ToString() == GameManager.Instance.WinningTeam)
        {
            _winText = CreateText("Fonts/SpriteFont@20px", new Vector2(_winOrLoseXpos, _winOrLoseYpos), "Je hebt gewonnen!");
        }
        else
        {
            _loseText = CreateText("Fonts/SpriteFont@20px", new Vector2(_winOrLoseXpos, _winOrLoseYpos), "Je hebt verloren!");
        }
        
        _matchData = CreateText("Fonts/SpriteFont@20px", new Vector2(500, 350),
        "Match Data:\n" +
        $"Snacks gedropt: {GameManager.Instance.DropTotal}\n" +
        $"Rotaties: {GameManager.Instance.RotationTotal}\n" +
        $"Close calls: {GameManager.Instance.CloseCallTotal}\n" + 
        "\n" +
        "Globale Data:\n" +
        $"Totale Nederland wins: {GameManager.Instance.TotalNLwins}\n" +
        $"Totale Belgie wins: {GameManager.Instance.TotalBEwins}\n"
        );
    }

    private void CreateButtons()
    {
        _buttonReturn = CreateButton(new Vector2(_buttonReturnXPos, _buttonReturnYPos), "Terug naar Hoofdmenu", OnButtonReturnClicked);
    }

    private void OnButtonReturnClicked(UIElement element)
    {
        GameEnvironment.AssetManager.AudioManager.PlaySoundEffect("button_agree");
        nextScreenName = GameStateManager.MAIN_MENU_STATE;
        SwitchToNextScreen();
    }

} 