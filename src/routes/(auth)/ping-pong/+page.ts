import PartySocket from 'partysocket';
import type { PageLoad } from './$types';
import { dev } from '$app/environment';

export const load = (async ({url}) => {


    let roomId = url.searchParams.get("roomId") 
    if(roomId){
        const ws = new PartySocket({
            host: dev ? "localhost:1999": "regallion-party.mcole-k9.partykit.dev",   //"project-name.username.partykit.dev", // or localhost:1999 in dev
            room:  roomId, // or "ping-pong" in dev
            // add an optional id to identify the client,
            // if not provided, a random id will be generated
            // note that the id needs to be unique per connection,
            // not per user, so e.g. multiple devices or tabs need a different id
            id: crypto.randomUUID(),
          
            // optionally, specify the party to connect to.
            // if not provided, will connect to the "main" party defined in partykit.json
            party: "main",
        
          });
          
          return {
            ws,
            roomId
          }
          
    }
   
}) satisfies PageLoad;