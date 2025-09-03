using System;
using Blok3Game.Engine.GameObjects;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Content;
using System.Collections.Generic;

public class BulletSlot : GameObject
{
    private Texture2D weaponSlots;
    new Vector2 position; 
    private Texture2D [] item = new Texture2D[5];
    private List<int> boughtItems = new List<int>();
    public BulletSlot(ContentManager content, Vector2 position)
    {
        this.position = position;
        LoadContent(content);
    }

    public void LoadContent(ContentManager content)
    {
        weaponSlots = content.Load<Texture2D>("inventory1"); 
        item[1] = content.Load<Texture2D>("bullet0"); 
        item[2] = content.Load<Texture2D>("bullet0");
        item[3] = content.Load<Texture2D>("bullet0");
        item[4] = content.Load<Texture2D>("bullet0"); 
    }

    public void ActivateSlot(int itemID)
    {
        if (itemID >= 1 && itemID <= 4)
        {
            boughtItems.Add(itemID);
            Console.WriteLine($"Item {itemID} gekocht!"); 
        }
    }

    public void RemoveAll()
    {
       boughtItems.Clear();
    }

    public void Draw(SpriteBatch spriteBatch)
    {
        spriteBatch.Draw(weaponSlots, new Vector2(position.X, position.Y), Color.White);

        for (int i = 0; i < boughtItems.Count; i++)
        {
            int itemID = boughtItems[i];
            Vector2 slotPosition = new Vector2(position.X + 15, position.Y + 13 +(i * 40));
            spriteBatch.Draw(item[itemID], slotPosition, Color.White);
        }
    }

    internal void Clear()
    {
        throw new NotImplementedException();
    }
}