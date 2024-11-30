import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({request,route}) => {
    
    
    
};

export const actions : Actions = {
    validateRoom : async ({request}) => {
        const formData = await request.formData();
        console.log(formData);
        
    }
};