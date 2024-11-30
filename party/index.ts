import type * as Party from "partykit/server";

export default class Server implements Party.Server {
  constructor(readonly room: Party.Room) {}

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    this.room.broadcast(`[Server]: ${conn.id} joined the room`);
  }

  onClose(conn: Party.Connection): void | Promise<void> {
    this.room.broadcast(`[Server]: ${conn.id} has left the room`)
  }

  onMessage(message: string, sender: Party.Connection) {
    this.room.broadcast(
      `${sender.id}: ${message}`,
      // ...except for the connection it came from
      // [sender.id]
    );
  }
}

Server satisfies Party.Worker;
