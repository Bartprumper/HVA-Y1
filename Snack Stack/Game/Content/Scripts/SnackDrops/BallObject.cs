using Blok3Game.Engine.GameObjects;
using Client.GameStates;
using Microsoft.Xna.Framework;

public class BallObject : SpriteGameObject  // base spriteGameObject class inheritance
{
    // Variabelen van de basis bal
    public bool falling = true;
    public Vector2 currentCell;
    public float fallSpeed = 5f;
    public string team;


    // bal erft van SpriteGameObject, zodat de bal een (meerdere) sprites toont met basis collisie
    public BallObject(Vector2 position, Team team)
        : base(GetSpritePathForTeam(team), 2, "bal", 0, false)
    {
        this.Position = position;
        scale = 1.0f;
        this.team = team.ToString();
    }

    // sprites op basis van het team
    private static string GetSpritePathForTeam(Team team)
    {
        switch (team)
        {
            case Team.Nederland:
                return "Images/Sprites/SnackDrops/BitterbalSpriteNew2";
            case Team.Belgie:
                return "Images/Sprites/SnackDrops/GehaktBalSpriteNew2";
            default:
                return "Images/Sprites/SnackDrops/BitterbalSpriteNew2";
        }
    }  

    // Sprite setter voor de child classes van de bal
    protected void SetSprite(string spritePath)
    {
        Sprite = new SpriteSheet(spritePath);
    }

    public override void Update(GameTime gameTime)
    {
        base.Update(gameTime);

        if (falling)
        {
            Position += new Vector2(0, fallSpeed);  // Als de bal valt gaat de positie naar beneden dmv. gravity
        }
    }
}