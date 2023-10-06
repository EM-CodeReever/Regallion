import { redirect } from "@sveltejs/kit";
// import { prisma } from '$lib/index';

export async function load ({ locals: { getSession } }) {
    const session = await getSession();    
    if (!session?.user) {
        throw redirect(303,"/login");
    }
    let userProfile
    // if (session?.user) {
    //     userProfile = await prisma.profile.findFirst({
    //         where: {
    //             auth_email: session.user.email
    //         }
    //     });
    // }
    return {userProfile};
}
