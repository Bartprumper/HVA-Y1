using Microsoft.Xna.Framework;
using Blok3Game.Engine.GameObjects;
using System.Runtime.InteropServices;
using Microsoft.Xna.Framework.Input;
using Blok3Game.Engine.Helpers;
using System.Xml.Schema;
using System.Security.Cryptography.X509Certificates;
using Blok3Game.GameStates;


public class BookList : GameObjectList
{

    private Player player;
    private BulletList bulletList;
    private CountTimer gameTimer;
    private Book book;
    private GameState gameState;

    private TextGameObject LibraryText;

    private bool openBook = false;

    private bool press1 = false;

    public bool doubleSpeed = false;
    private int itemCount = 0;
    private int upgradeCost = 10;
    
    public BookList(Player player, BulletList bulletList, CountTimer gameTimer, GameState gameState) : base()
    {
        this.bulletList = bulletList;
        this.player = player;
        this.gameTimer = gameTimer;
        this.gameState = gameState;
        Add(book = new Book(new Vector2(1000, 1000), this, player)); 


    }

    public override void Update(GameTime gameTime)
    {
        base.Update(gameTime);
     
        BookCheck(player);
        if(itemCount >= 4)
        {
            Remove(book);
        }
    }
    public bool CollidesWithBook(Player player)
    {
         foreach (GameObject obj in children)
        {
            if (obj is Book && (obj as Book).CollidesWith(player)) 
            {
             //player.Position = Vector2.Zero;
             
            return true;                
               
            }       
        }    
          
        return false; //checkt alle objecten
    }

    private void BookCheck(Player player)
    {
        if (CollidesWithBook(player) == true && openBook == false){  //ask openbook false is en collide true wordt
        Add(LibraryText = new TextGameObject("Fonts/SpriteFont@20px", 1, "text"));
            LibraryText.Text = $"Press E to upgrade attack (COST = {upgradeCost}s)";
            LibraryText.Position = new Vector2(950, 900);
            openBook = true;

        }
        else if (CollidesWithBook(player) == false && openBook == true) {  //Als openbook true is en collide false wordt
            Remove(LibraryText); 
            openBook = false;
            
             //niet defined als een object            
        }
        
    }

    public override void HandleInput(InputHelper inputHelper)
    {
        
        base.HandleInput(inputHelper);
        
            if(inputHelper.KeyPressed(Keys.E) && openBook == true)
            {               
                // LibraryText.Text = "Press 1 for doublespeed.";       //verandert de text wanneer E wordt ingedrukt     
                // press1 = true;
                bulletList.ManageItems();
                gameTimer.LoseTime(upgradeCost);
                itemCount++;

                gameState.PlayerBuysItem(1);
            }

            if(inputHelper.KeyPressed(Keys.D1) && openBook == true && press1 == true)
            {
               doubleSpeed = true;
               player.moveSpeed = 400;
               Remove(LibraryText);
               press1 = false;
            }

        }
    //De game werkt niet zonder specifiek te zeggen dat de tekst alleen wordt verwijdert als de speler van het boek
    //af stapt.    
}