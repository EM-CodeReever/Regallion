<script lang="ts">
        import Badge from '$components/Badge.svelte';
import type { PageData } from './$types';
        export let data: PageData;
        let { supabase, session,userProfile } = data;

</script>

<svelte:head>
        <title>Profile</title>
</svelte:head>
 
<section class="w-full flex justify-center lg:px-28 lg:space-x-8">

        <div class="flex flex-col w-full max-w-fit h-fit justify-center space-y-3 ">
            <div class="w-full h-fit flex flex-col items-center justify-center rounded-xl space-y-3 p-3 bg-oxfordBlue-300">
                <img class="mt-0 w-24 z-10  left-5 bg-gray-700 aspect-square border object-cover rounded-full " src="https://robohash.org/{userProfile?.username}" alt="User Avatar">
                    <div class="flex flex-col items-center w-full h-fit space-y-3">
                        <div class="flex flex-col justify-center items-center w-full">
                            <h1 class="text-lg lg:text-2xl font-bold text-gray-200 ">@{userProfile?.username}</h1>
                            <p class="text-sm font-semibold text-gray-200 ">{userProfile?.first_name} {userProfile?.last_name}</p>
                        </div>
                        <div class="w-full max-w-xl h-fit rounded-lg grid gap-5 grid-cols-3">
                            <div class="flex flex-col items-center blur-bg bg-[#000000aa] p-2 rounded-xl">
                                <h1 class="text-lg font-bold text-white">0</h1>
                                <p class="text-xs text-gray-400">Posts</p>
                            </div>
                            <div class="flex flex-col items-center blur-bg bg-[#000000aa] p-2 rounded-xl">
                                <h1 class="text-lg font-bold text-white">0</h1>
                                <p class="text-xs text-gray-400">Badges</p>
                            </div>
                            <div class="flex flex-col items-center blur-bg bg-[#000000aa] p-3 rounded-xl lg:w-fit">
                                <h1 class="font-bold text-white">{userProfile?.created_at?.toLocaleDateString()}</h1>
                                <p class="text-xs text-gray-400">Date Joined</p>
                            </div>
                        </div>
                </div>
            </div>
            <div>
                <div class="flex justify-center h-fit w-full max-w-xl">
                    <div class="bg-[#000000aa] rounded-xl w-full h-fit grid grid-cols-6 grid-rows-6 gap-3 p-3 text-gray-300">
                        
                        <Badge bgColor="bg-orangeWeb-800" type="new-user" />
                        <Badge bgColor="bg-gray-600" type="initial-ping-pong" />
                        <Badge bgColor="bg-gray-600" type="ping-pong-master" />

                    </div>
                    
                </div>
   

            </div>
        </div>
        
</section>

<style>

</style>