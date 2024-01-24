import type * as Party from "partykit/server";
import Game from "../src/routes/(auth)/ping-pong/Game"

export default class Server implements Party.Server {


  private  Game: Game;

  constructor(readonly room: Party.Room) {
    this.Game = new Game("multiplayer-online");
  }

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    // A websocket just connected!
    console.log( `Connected: id: ${conn.id} room: ${this.room.id} url: ${new URL(ctx.request.url).pathname}`);

    // let's send a message to the connection
    conn.send("hello from server");
  }

  onMessage(message: string, sender: Party.Connection) {
    // let's log the message
    console.log(`connection ${sender.id} sent message: ${message}`);
    // as well as broadcast it to all the other connections in the room...
    this.room.broadcast(`${sender.id}: ${message}`, [sender.id]);
  }
}

Server satisfies Party.Worker;
