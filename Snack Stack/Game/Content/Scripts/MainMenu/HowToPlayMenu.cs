using Blok3Game.Engine.GameObjects;
using Blok3Game.Engine.UI;
using Blok3Game.GameStates;
using Microsoft.Xna.Framework;

public class HowToPlayMenu : MovableMenuItem
{
    private Button _buttonReturn;
    private TextGameObject _HowToPlayText;
    private SpriteGameObject _gameLogo;
    private float _logoScale = 0.25f;
    private int _logoXPos = 415;
    private int _logoYPos = 90;
    private int _howToPlayXpos = 350;
    private int _howToPlayYpos = 350;
    private int _buttonReturnXPos = 520;
    private int _buttonReturnYPos = 800;
    public HowToPlayMenu() : base()
    {
        CreateLogo();
        CreateTexts();
        CreateButtons();
    }
    
    private void CreateLogo()
    {
        _gameLogo = new SpriteGameObject("Images/UI/SnackStackLogo", 1 , "Logo");
        _gameLogo.Scale = _logoScale;
        _gameLogo.Position = new Vector2(_logoXPos, _logoYPos);
        Add(_gameLogo);
    }

    private void CreateTexts()
    {
        _HowToPlayText = CreateText("Fonts/SpriteFont@20px", new Vector2(_howToPlayXpos, _howToPlayYpos),
            "1. Gebruik de pij ltj es toetsen om van rij  te wisselen.\n" +
            "2. Gebruik spatie om een zet te doen.\n" +
            "3. Je kan alleen een zet doen als er in het\n" +
            "     scherm staat dat het j ouw beurt is.\n" +
            "4. Om de 4 beurten draait het bord.\n" +
            "     de kant op die linksboven in het scherm staat.\n" +
            "5. De eerste speler met 4 op een rij  wint!\n" +
            "6. Gebruik 1-4 om een emote af te spelen!\n" +
            "7. Gebruik de chatbalk om te chatten met j e tegenstander!");
    }

    private void CreateButtons()
    {
        _buttonReturn = CreateButton(new Vector2(_buttonReturnXPos, _buttonReturnYPos), "Terug", OnButtonReturnClicked);
    }

    private void OnButtonReturnClicked(UIElement element)
    {
        GameEnvironment.AssetManager.AudioManager.PlaySoundEffect("button_cancel");
        nextScreenName = GameStateManager.MAIN_MENU_STATE;
        SwitchToNextScreen();
    }

}