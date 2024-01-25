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
    let obj = {}
    ///assign all values fomr this.Game into obj individually, this.Game has private properties
    // socket: null | PartySocket = null
    // showOptionsModal = false
    // #playerPaddleColor = "#0091FF"
    // #computerPaddleColor = "#F76808"
    // #ballColor = "#ffffff"
    // #ballSpeed = 10;
    // #ballSize = 10;
    // #paddleSpeed = 4;
    // #difficulty: "easy" | "hard" | "unfair" = "easy";
    // #paused = false;
    // #scoreDisplay = false
    // #gameStarted = false
    // #gameEnded = false
    // #winner = ""
    // pointsToWin: number = 3;
    // #canvasWidth = 800

    // #player1Score = 0;
    // #player2Score = 0;

    obj["gameStarted"] = this.Game.gameStarted;
    obj["player1"] = this.Game.player1;
    obj["player2"] = this.Game.player2;
    obj["paused"] = this.Game.paused;
    obj["scoreDisplay"] = this.Game.scoreDisplay;
    obj["gameEnded"] = this.Game.gameEnded;
    obj["winner"] = this.Game.winner;
    obj["pointsToWin"] = this.Game.pointsToWin;
    obj["canvasWidth"] = this.Game.canvasWidth;
    obj["player1Score"] = this.Game.player1Score;
    obj["player2Score"] = this.Game.player2Score;
    obj["ballSpeed"] = this.Game.ballSpeed;
    obj["ballSize"] = this.Game.ballSize;
    obj["paddleSpeed"] = this.Game.paddleSpeed;
    obj["difficulty"] = this.Game.difficulty;
    obj["playerPaddleColor"] = this.Game.playerPaddleColor;
    obj["computerPaddleColor"] = this.Game.computerPaddleColor;
    obj["ballColor"] = this.Game.ballColor;
    obj["showOptionsModal"] = this.Game.showOptionsModal;
    obj["socket"] = this.Game.socket;
    

    console.log("obj",obj);
    
    
    
    
    console.log("Player 1",JSON.stringify(this.Game.player1));
    console.log("Player 2",JSON.stringify(this.Game.player2));
    conn.send(JSON.stringify({type: "gameInstance", game: obj} as ServerAction) )


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
