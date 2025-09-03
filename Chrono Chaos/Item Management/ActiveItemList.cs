using System.Collections.Generic;
using Blok3Game.Engine.GameObjects;
using Microsoft.Xna.Framework;

public class ActiveItemList : GameObjectList
{
    private int nextItem = 1;
    public ActiveItemList() : base()
    {
        
    }

    public override void Update(GameTime gameTime)
    {
        base.Update(gameTime);
        
    }

    public void ActivateItem()
    {
        switch(nextItem)
        {
            case 1: Add(new DoubleShot()); break;
            case 2: Add(new MirrorShot()); break;
            case 3: Add(new Boomerang()); break;
            case 4: Add(new ScatterShot()); break;
        }
        nextItem++;
    }
    public void RemoveItem()
    {
        switch(nextItem)
        {
            case 1: Remove(new DoubleShot()); break;
            case 2: Remove(new MirrorShot()); break;
            case 3: Remove(new Boomerang()); break;
            case 4: Remove(new ScatterShot()); break;
        }
        nextItem--;
    }

    
    


}