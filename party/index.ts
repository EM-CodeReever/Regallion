import type * as Party from "partykit/server";
import Game, { GameAction, ServerAction } from "../src/routes/(auth)/ping-pong/Game"

export default class Server implements Party.Server {


  private  Game: Game;

  constructor(readonly room: Party.Room) {
    this.Game = new Game("multiplayer-online");
    this.Game.gameStarted = true;
  }

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // A websocket just connected!
    console.log( `Connected: id: ${conn.id} room: ${this.room.id} url: ${new URL(ctx.request.url).pathname}`);

   
    conn.send(JSON.stringify({type: "gameInstance", game: this.Game} as ServerAction) )

    this.room.broadcast(JSON.stringify({type: "userJoined",user:{ id: conn.id, name:'placeholder' }} satisfies ServerAction), [conn.id])
  }

  onMessage(message: string, sender: Party.Connection) {
    // let's log the message
    console.log(`connection ${sender.id} sent message: ${message}`);


    let data  = JSON.parse(message) as GameAction

    switch(data.type){
      case "propertyChange":
  
        if(this.Game[data.property] !== data.value){
            // @ts-ignore
          this.Game[data.property] = data.value;
          this.room.broadcast(message, [sender.id]);
        }
       
        break;

      case "pause":
        this.Game.pauseGame()
        this.room.broadcast(message, [sender.id]);
        break;
      case "resume":
        this.Game.resumeGame()
        this.room.broadcast(message, [sender.id]);
        break;

    }
      
    
    // as well as broadcast it to all the other connections in the room...
    
  }
}

Server satisfies Party.Worker;
