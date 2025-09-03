using System.Collections.Generic;
using Blok3Game.Engine.Helpers;
using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;

namespace Blok3Game.Engine.GameObjects
{
	public class GameObjectList : GameObject
	{
		protected List<GameObject> children;
		private Queue<GameObject> gameObjectsToRemove;

		public GameObjectList(int layer = 0, string id = "") : base(layer, id)
		{
			children = new List<GameObject>();
			gameObjectsToRemove = new Queue<GameObject>();
		}

		public List<GameObject> Children
		{
			get { return children; }
		}

		public void Add(GameObject obj)
		{
    		if (obj == null)
    		    throw new System.ArgumentNullException(nameof(obj), "Cannot add null GameObject to GameObjectList.");

    		obj.Parent = this;
    		for (int i = 0; i < children.Count; i++)
    		{
        		if (children[i] == null)
            		throw new System.InvalidOperationException("Null child found in GameObjectList. Check where nulls are added.");

        		if (children[i].Layer > obj.Layer)
        		{
            		children.Insert(i, obj);
            		return;
        		}
    		}
    		children.Add(obj);
		}

		public void Remove(GameObject obj)
		{
			gameObjectsToRemove.Enqueue(obj);
		}

		public GameObject Find(string id)
		{
			foreach (GameObject obj in children)
			{
				if (obj.Id == id)
				{
					return obj;
				}
				if (obj is GameObjectList)
				{
					GameObjectList objList = obj as GameObjectList;
					GameObject subObj = objList.Find(id);
					if (subObj != null)
					{
						return subObj;
					}
				}
			}
			return null;
		}

		public override void HandleInput(InputHelper inputHelper)
		{
			base.HandleInput(inputHelper);
			for (int i = children.Count - 1; i >= 0; i--)
			{
				children[i].HandleInput(inputHelper);
			}
		}

		public override void Update(GameTime gameTime)
		{
			base.Update(gameTime);

			//use a queue to remove game objects to prevent concurrent modification exceptions
			while (gameObjectsToRemove.Count > 0)
			{
				GameObject obj = gameObjectsToRemove.Dequeue();
				children.Remove(obj);
				obj.Parent = null;
			}

			// Maak een kopie van de lijst zodat wijzigingen geen exception veroorzaken
			foreach (GameObject obj in new List<GameObject>(children))
			{
			    if (obj == null)
			    {
			        System.Diagnostics.Debug.WriteLine("Null child found in GameObjectList during Update!");
			    }
 			    else
			    {
			        obj.Update(gameTime);
			    }
			}
		}

		public override void Draw(GameTime gameTime, SpriteBatch spriteBatch)
		{
			if (!visible)
			{
				return;
			}

			foreach (GameObject obj in children)
			{
				obj.Draw(gameTime, spriteBatch);
			}
		}

		public override void Reset()
		{
			base.Reset();
			foreach (GameObject obj in children)
			{
				obj.Reset();
			}
		}
	}
}