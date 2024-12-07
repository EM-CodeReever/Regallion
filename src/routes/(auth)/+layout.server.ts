import { redirect } from "@sveltejs/kit";
import { prisma } from '$lib/index';

export async function load ({ locals: { getSession }, cookies }) {
    const session = await getSession();    
    if (!session?.user) {
        throw redirect(303,"/login");
    }
    let userProfile
    if (session?.user) {
        cookies.set("sessionToken",session.access_token,{
            path: "/memory-card",
            httpOnly: true,
        })
        userProfile = await prisma.profile.findFirst({
            where: {
                auth_email: session.user.email
            }
        });
    }
    return {userProfile};
}
