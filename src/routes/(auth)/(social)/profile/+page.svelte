<script lang="ts">
        import Badge from '$components/Badge.svelte';
import type { PageData } from './$types';
        export let data: PageData;
        let { supabase, session,userProfile } = data;

</script>

<svelte:head>
        <title>Profile</title>
</svelte:head>
 
<section class="w-full bg-oxfordBlue-700 min-h-screen flex justify-center items-start pt-24 px-28 space-x-8">

        <div class="flex flex-col w-full max-w-fit h-fit justify-center space-y-3 ">
            <div class="w-full h-fit flex flex-col items-center justify-center rounded-xl space-y-3">
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
                    <div class="bg-[#000000aa] rounded-xl w-full h-16 flex justify-center space-x-2 p-3 items-center text-gray-300">
                        
                        <Badge bgColor="bg-orangeWeb-800" type="new-user" />
                        <Badge bgColor="bg-gray-600" type="initial-ping-pong" />
                        <Badge bgColor="bg-gray-600" type="ping-pong-master" />
                    </div>
                    
                </div>
   

            </div>
        </div>
        <div class="w-full max-w-xl h-full blur-bg bg-[#000000aa] rounded-xl flex flex-col items-center justify-start overflow-y-scroll" style="height: 36rem;">
            <h1 class="text-2xl text-gray-200 m-5">Posts</h1>
            <!-- <div class="w-full h-full flex flex-col items-center justify-center">
                <h1 class="text-2xl text-gray-200">No Posts Yet</h1>
                <p class="text-gray-400">Start posting to see your posts here</p>
            </div> -->
            <div class=" w-full h-fit p-5 flex flex-col space-y-3">
                <div class="flex items-center space-x-2">
                    <img src="https://robohash.org/{userProfile?.username}" class="avatar ring-1 w-6 h-6" alt="">
                    <span class="text-gray-400 "> @{userProfile?.username} </span>
                </div>
                <div class="text-gray-200 px-2" >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam voluptatum, voluptate, quibusdam, quia voluptas quos quod voluptatibus quas quidem doloribus.
                </div>
                <div class="flex justify-between w-full">
                    <p>like</p>
                    <p>comment</p>
                    <p>share</p>
                </div>
            </div>
            <div class="divider px-4"></div>
            <div class=" w-full h-fit p-5 flex flex-col space-y-3">
                <div class="flex items-center space-x-2">
                    <img src="https://robohash.org/{userProfile?.username}" class="avatar ring-1 w-6 h-6" alt="">
                    <span class="text-gray-400 "> @{userProfile?.username} </span>
                </div>
                <div class="text-gray-200 px-2" >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam voluptatum, voluptate, quibusdam, quia voluptas quos quod voluptatibus quas quidem doloribus.
                </div>
                <div class="flex justify-between w-full">
                    <p>like</p>
                    <p>comment</p>
                    <p>share</p>
                </div>
            </div>
            <div class="divider px-4"></div>
            <div class=" w-full h-fit p-5 flex flex-col space-y-3">
                <div class="flex items-center space-x-2">
                    <img src="https://robohash.org/{userProfile?.username}" class="avatar ring-1 w-6 h-6" alt="">
                    <span class="text-gray-400 "> @{userProfile?.username} </span>
                </div>
                <div class="text-gray-200 px-2" >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam voluptatum, voluptate, quibusdam, quia voluptas quos quod voluptatibus quas quidem doloribus.
                </div>
                <div class="flex justify-between w-full">
                    <p>like</p>
                    <p>comment</p>
                    <p>share</p>
                </div>
            </div>
            <div class="divider px-4"></div>
            <div class=" w-full h-fit p-5 flex flex-col space-y-3">
                <div class="flex items-center space-x-2">
                    <img src="https://robohash.org/{userProfile?.username}" class="avatar ring-1 w-6 h-6" alt="">
                    <span class="text-gray-400 "> @{userProfile?.username} </span>
                </div>
                <div class="text-gray-200 px-2" >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam voluptatum, voluptate, quibusdam, quia voluptas quos quod voluptatibus quas quidem doloribus.
                </div>
                <div class="flex justify-between w-full">
                    <p>like</p>
                    <p>comment</p>
                    <p>share</p>
                </div>
            </div>
            <div class="divider px-4"></div>
        </div>
</section>

<style>
    body{
        background-color: rgb(16, 78, 202);
    }
</style>