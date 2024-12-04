import { prisma } from '$lib';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

type MC_Response = {
    player : number,
    time: string,
    score: string,
    mps: string

}

export const POST = async ({request}) => {
    try{
    let mc_response = await request.json() as MC_Response;
    let lb_count = await prisma.lB_MemoryCards.count()
    console.log("Point 1: " + lb_count);
    
        if(lb_count == 0 || lb_count < 10){
            console.log("point 2");
            
            let lb_record = await prisma.lB_MemoryCards.create({
                data:{
                    player_id: mc_response.player,
                    mps: parseFloat(mc_response.mps),
                    score: parseInt(mc_response.score),
                    time: mc_response.time,
                }
            })
            return json({success:true})
        }else if(lb_count == 10){
            let all_records = await prisma.lB_MemoryCards.findMany({});
            let potential_delete_id
            let isHigher:boolean = false
            all_records.forEach(({score})=>{
                if(parseInt(mc_response.score) > score){
                    isHigher = true
                }
            })
            if (isHigher) {
                console.log("HIGH SCORE!");
                
            }else{
                console.log("NOT HIGH ENOUGH!");
                
            }
            console.log("point 3");
            return json({success: true});
        }
    }catch(e){
        console.log(e);
        throw error(500,"An error has occured!")
    }
};