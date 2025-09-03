using System;

namespace Blok3Game.Engine.JSON;

    public class LogInData : DataPacket
    {
    
        public string UserName {get; set;}
        public string Password {get; set;}
   
        public LogInData() : base()
        {
            EventName = "log in";
         
        
        }
        public string MyProperty {get; set;}
  
    }
