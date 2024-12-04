import { prisma } from "$lib";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({}) => {
    let lb_memory_cards = await prisma.lB_MemoryCards.findMany({
        include:{
            Profile : true
        }
    })
    lb_memory_cards = lb_memory_cards.sort((b,a) => a.score - b.score)
    return { lb_memory_cards }
}