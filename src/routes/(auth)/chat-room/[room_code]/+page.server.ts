import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib";

export const load: PageServerLoad = async ({params}) => {
    console.log(params.room_code);
    if(params.room_code != "global"){
        throw redirect(302,"/error/room-not-found")
    }
    try {
        let room = prisma.chatRoom.findFirstOrThrow({
            where : {
                uuid: 'iefhj'
            }
        })
    } catch (error) {
        
    }
    
}
