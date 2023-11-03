<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
    let { supabase, session, userProfile } = data;
</script>

<section class="text-white flex flex-col justify-center dusk-waves-inverse items-center w-full px-4 py-16 h-screen">
    <h1 class="text-4xl font-bold mb-24 text-gray-200">Account Settings</h1>
    <div class="w-full max-w-3xl py-12 px-5 md:px-16 text-gray-800 flex flex-col  h-96 rounded-xl blur-bg bg-[#ffffffc0] custom-box-shadow">
        <div class="bg-[#E5E5F7]  flex justify-center items-center rounded-full aspect-square w-36 mx-auto absolute -top-20" style="left: calc(50% - 4.5rem);">
            <img src="https://robohash.org/{userProfile?.username}" alt="" class="rounded-full custom-box-shadow" >
            <div class="rounded-full w-36 aspect-square bg-gray-800 opacity-0 hover:opacity-100 hover:bg-opacity-40 cursor-pointer z-10 absolute my-auto mx-auto flex flex-col justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-10 h-10">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>                  
                  <p class="text-xs font-semibold text-white">Change Avatar</p>
            </div>            
        </div>
        <div class="flex p-3 justify-between items-center">
            <p>Username</p>
            <p class="font-semibold">{userProfile?.username}</p>
        </div>
        <div class="flex p-3 justify-between items-center">
            <p>Name</p>
            <p class="font-semibold">{userProfile?.first_name} {userProfile?.last_name}</p>
        </div>
        <div class="flex p-3 justify-between items-center">
            <p>Email address</p>
            <p class="font-semibold">{userProfile?.auth_email}</p>
        </div>
        <div class="flex p-3 justify-between items-center">
            <p>Gender</p>
            <p class="font-semibold">{userProfile?.gender?.toLocaleLowerCase()}</p>
        </div>
        <div class="flex p-3 justify-between items-center">
            <p>Birthdate</p>
            <p class="font-semibold">{userProfile?.date_of_birth?.toLocaleDateString()}</p>
        </div>
    </div>
</section>
