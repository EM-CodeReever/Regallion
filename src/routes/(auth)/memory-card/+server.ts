import { prisma } from '$lib';
import { error, json } from '@sveltejs/kit';


type MC_Response = {
    player : number,
    time: string,
    score: string,
    mps: string

}

export const POST = async ({request,cookies}) => {
    try{
        const authHeader = request.headers.get('Authorization');
        if (!authHeader) {
            return new Response('Unauthorized', { status: 401 });
        }
        const token = authHeader.split(' ')[1];
        if(token === cookies.get("sessionToken")){
            let mc_response = await request.json() as MC_Response;
            let lb_count = await prisma.lB_MemoryCards.count()
            let isHighScore = false
            if(lb_count == 0 || lb_count < 10){
                let lb_record = await prisma.lB_MemoryCards.create({
                    data:{
                        player_id: mc_response.player,
                        mps: parseFloat(mc_response.mps),
                        score: parseFloat(mc_response.score),
                        time: mc_response.time,
                    }
                })
                isHighScore = true;
                return json({success:true,isHighScore});
            }else if(lb_count == 10){
                let all_records = await prisma.lB_MemoryCards.findMany({});
                let isHigher:boolean = false
                all_records.forEach(({score})=>{
                    if(parseFloat(mc_response.score) > score){
                        isHigher = true
                    }
                })
                if (isHigher) {
                    let sortedBySmallestFirst = all_records.sort((a,b)=> a.score - b.score)
                    await prisma.lB_MemoryCards.delete({
                        where:{
                            id:sortedBySmallestFirst[0].id
                        }
                    })
                    await prisma.lB_MemoryCards.create({
                        data:{
                            player_id: mc_response.player,
                            mps: parseFloat(mc_response.mps),
                            score: parseFloat(mc_response.score),
                            time: mc_response.time,
                        }
                    })
                    isHighScore = true;
                }else{
                    console.log("NOT HIGH ENOUGH!");
                }
                return json({success: true, isHighScore});
            }
        }else{
            return new Response('Unauthorized', { status: 401 });
        }
    }catch(e){
        console.log(e);
        throw error(500,"An error has occured!")
    }
};