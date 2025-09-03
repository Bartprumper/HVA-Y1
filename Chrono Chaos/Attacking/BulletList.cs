using System;
using System.Reflection.Metadata;
using Blok3Game.Engine.GameObjects;
using Blok3Game.Engine.Helpers;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Input;

public class BulletList : GameObjectList
{
    private bool shotReady = true;
    private bool currentlyShooting = true;
    private int attackSpeed;
    private int readySpeed;
    private int toggleHelper = 0;
    private Player player;
    private Vector2 target;
    private Vector2 mouseDirection;
    private ActiveItemList activeItemList;
    private Vector2[] directions = [new Vector2(0, -1), new Vector2(1, 0), new Vector2(0, 1), new Vector2(-1, 0)];
    private int angle = 0;
    public BulletList(Player player) : base()
    {
        this.player = player;
        attackSpeed = 40;
        Add(activeItemList = new ActiveItemList());
    }

    public override void Update(GameTime gameTime)
    {
        base.Update(gameTime);
        ReadyShot();
        GetDirection();
        //ToggleShooting();
        Attack();
        
        

        
    }

    private void Attack()
    {
        if(currentlyShooting)
        {
            if(shotReady)
            {
                Add(new Bullet(player.Position, mouseDirection, true));
                ShotEffects();
                shotReady = false;
            }
        }
    }

    public void ShotEffects()
    {
        foreach(GameObject obj in activeItemList.Children)
        {
            if(obj is ItemInterface item)
            {
                switch(item.itemID)
                {
                    case 1: DoubleShot();   break;
                    case 2: MirrorShot();   break;
                }
            }
        }
    }

    public void OnHitEffects()
    {
        angle = 0;
        foreach(GameObject obj in activeItemList.Children)
        {
            if(obj is ItemInterface item)
            {
                switch(item.itemID)
                {
                    case 3: Boomerang();    break;
                    case 4: ScatterShot();  break;
                    
                }
            }
        }
    }

    public void ManageItems()
    {
        activeItemList.ActivateItem();
    }

    private void ReadyShot()
    {
        if(shotReady == false)
        {
            readySpeed--;
        }
        if(readySpeed <= 0)
        {
            shotReady = true;
            readySpeed = attackSpeed;
        }
    }

    private void GetDirection()
    {
        MouseState mouseState = Mouse.GetState();
        target = mouseState.Position.ToVector2();
        target -= BulletManager.cameraPosition;
        mouseDirection = target - player.Position;
        mouseDirection.Normalize();
    }

    private void ToggleShooting()
    {
        MouseState mouseState = Mouse.GetState();
        if(mouseState.LeftButton == ButtonState.Pressed && toggleHelper == 0)
        {
            currentlyShooting = !currentlyShooting;
            toggleHelper = 1;
        }
        if(mouseState.LeftButton == ButtonState.Released)
        {
            toggleHelper = 0;
        }
    }

    private void DoubleShot()
    {
        Add(new Bullet(player.Position + mouseDirection * 25, mouseDirection, true));
    }

    private void MirrorShot()
    {
        Add(new Bullet(player.Position, mouseDirection * -1, true));
    }

    private void ScatterShot()
    {
        foreach(Vector2 direction in directions)
        {
            Add(new Bullet(BulletManager.onHitLocation, directions[angle], false));
            angle += 1;
        }
    }

    private void Boomerang()
    {
        BulletManager.playerPosition -= BulletManager.onHitLocation;
        BulletManager.playerPosition.Normalize();
        Add(new Bullet(BulletManager.onHitLocation, BulletManager.playerPosition, false));
    }
}

