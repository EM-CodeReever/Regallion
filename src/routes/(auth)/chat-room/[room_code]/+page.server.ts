import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { prisma } from "$lib";

export const load: PageServerLoad = async ({params}) => {
    console.log(params.room_code);
    if(params.room_code != "global"){
        try {
            let room = await prisma.chatRoom.findFirstOrThrow({
                where : {
                    code: params.room_code
                }
            })
            console.log(room);
            let roomOwnerProfile = await prisma.profile.findFirst({
                where : {
                    auth_user_id : room.owner
                }
            })
            return {roomName: room.name, roomOwner: roomOwnerProfile?.username, roomCode: room.code, isGlobal:false }
        } catch (error) {
            console.log(error);
            throw redirect(302,"/error/room-not-found")
        }
    }else{
        return {isGlobal:true}
    }
}
