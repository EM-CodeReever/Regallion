import type { PageServerLoad } from './$types';
// import { prisma } from '$lib/index';


export const load = (async ({locals:{getSession}}) => {
    return {};
}) satisfies PageServerLoad;

export const actions = { updateProfile: async ({ request }) => {
      const formData = await request.formData();
      const firstName = formData.get('firstName');
      const lastName = formData.get('lastName');
      const username = formData.get('username');
      const gender = formData.get('gender');
      const dateOfBirth = formData.get('dateOfBirth');
      const phoneNumber = formData.get('phoneNumber');
      const sessionUserId = formData.get('sessionUserId');
      const sessionUserEmail = formData.get('sessionUserEmail');
        console.log(firstName);
        
        let profile = firstName;
      // let profile = await prisma.profile.create({
      //       data: {
      //          auth_user_id: sessionUserId as string,
      //          auth_email: sessionUserEmail as string,
      //          avatar: '',
      //          created_at: new Date(),
      //          date_of_birth: new Date(dateOfBirth as string),
      //          first_name: firstName as string,
      //          gender: 'RNS',
      //          last_name: lastName as string,
      //          username: username as string,
      //       },
      //   });
        if (profile) {
            console.log(profile);
        
            return { success: true };
        }else{
            return { success: false };
        }
    //   console.log(formData);
      // Process the form data and perform actions
    },
  };