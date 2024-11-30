import type { PageServerLoad } from './$types';
import { prisma } from '$lib/index';


export const load = (async ({locals:{getSession}}) => {
    return {};
}) satisfies PageServerLoad;

export const actions = { updateProfile: async ({ request }) => {
      const formData = await request.formData();
      const firstName = formData.get('firstName');
      const lastName = formData.get('lastName');
      const username = formData.get('username');
      const sessionUserId = formData.get('sessionUserId');
      const sessionUserEmail = formData.get('sessionUserEmail');
      
      let profile = await prisma.profile.create({
            data: {
               auth_user_id: sessionUserId as string,
               auth_email: sessionUserEmail as string,
               avatar: '',
               created_at: new Date(),
               first_name: firstName as string,
               last_name: lastName as string,
               username: username as string,
            },
        });
        if (formData) {
            return { 
                success: true,
                data: profile
            };
        }else{
            return { 
                success: false,
                data: null
             };
        }
    },
  };