using Blok3Game.Engine.GameObjects;
using Blok3Game.Engine.UI;
using Blok3Game.GameStates;
using Microsoft.Xna.Framework;

public class MainMenu : MovableMenuItem
{
    private SpriteGameObject _gameLogo;
    private Button _buttonPlay;
    private Button _ButtonHowToPlay;
    private float _logoScale = 0.4f;
    private int _logoXPos = 300;
    private int _logoYPos = 10;
    private int _buttonXPos = 520;
    private int _buttonPlayYPos = 400;
    private int _buttonHowToPlayYPos = 500;
    

    public MainMenu() : base()
    {
        CreateLogo();
        CreateButtons();
    }

    private void CreateLogo()
    {
        _gameLogo = new SpriteGameObject("Images/UI/SnackStackLogo", 1 , "Logo");
        _gameLogo.Scale = _logoScale;
        _gameLogo.Position = new Vector2(_logoXPos, _logoYPos);
        Add(_gameLogo);
    }
    private void CreateButtons()
    {
        _buttonPlay = CreateButton(new Vector2(_buttonXPos, _buttonPlayYPos), "Start Game", OnButtonPlayClicked);
        _ButtonHowToPlay = CreateButton(new Vector2(_buttonXPos, _buttonHowToPlayYPos ), "Hoe speel ik", OnButtonHowToPlayClicked);
    }

    private void OnButtonPlayClicked(UIElement element)
    {
        GameEnvironment.AssetManager.AudioManager.PlaySoundEffect("button_agree");
        nextScreenName = GameStateManager.LOBBY_JOIN_OR_CREATE_STATE;
        SwitchToNextScreen();
    }

    private void OnButtonHowToPlayClicked(UIElement element)
    {
        GameEnvironment.AssetManager.AudioManager.PlaySoundEffect("button_agree");
        nextScreenName = GameStateManager.HOW_TO_PLAY_STATE;
        SwitchToNextScreen();
    }

}