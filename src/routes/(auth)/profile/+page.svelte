<script lang="ts">
        import Badge from '$components/Badge.svelte';
import type { PageData } from './$types';
        export let data: PageData;
        let { supabase, session,userProfile } = data;

</script>

<svelte:head>
        <title>Profile</title>
</svelte:head>

<section class="w-full h-full pt-20 lg:pt-40 pb-16 profile-bg">
    <div class="bg-gray-800 w-full max-w-4xl h-fit mx-auto" style="min-height: calc(100vh - 5rem);">
        <div class="flex flex-col w-full justify-center ">
            <div class="w-full wave-yellow h-96 lg:h-64 flex flex-col items-center justify-center rounded-xl relative lg:sticky lg:-top-16">
                <img class="mt-10 lg:mt-0 w-24 lg:w-40 z-10 -bottom-12 lg:-bottom-16 left-5 lg:left-10 bg-gray-700 aspect-square border object-cover rounded-full lg:absolute" src="https://robohash.org/{userProfile?.username}" alt="User Avatar">
                <div class=" w-full h-20 lg:absolute lg:bottom-0">
                    <div class="flex flex-col lg:flex-row items-center h-full">
                        <div class="lg:ml-56 flex flex-col justify-center items-center lg:items-start w-full">
                            <h1 class="text-lg lg:text-2xl font-bold text-gray-200 lg:text-left">@{userProfile?.username}</h1>
                            <p class="text-sm font-semibold text-gray-200 lg:text-left lg:ml-1">{userProfile?.first_name} {userProfile?.last_name}</p>
                        </div>
                        <div class="w-full max-w-xl h-24 rounded-lg grid gap-5 p-5 grid-cols-3 mb-5 lg:mr-5">
                            <div class="flex flex-col items-center blur-bg bg-[#000000aa] p-3 rounded-xl">
                                <h1 class="text-lg font-bold text-white">0</h1>
                                <p class="text-xs text-gray-400">Posts</p>
                            </div>
                            <div class="flex flex-col items-center blur-bg bg-[#000000aa] p-3 rounded-xl">
                                <h1 class="text-lg font-bold text-white">0</h1>
                                <p class="text-xs text-gray-400">Badges</p>
                            </div>
                            <div class="flex flex-col items-center blur-bg bg-[#000000aa] p-3 rounded-xl lg:w-fit">
                                <h1 class="lg:text-lg font-bold text-white">{userProfile?.created_at?.toLocaleDateString()}</h1>
                                <p class="text-xs text-gray-400">Date Joined</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div class="flex justify-center lg:justify-end p-5 lg:pl-56 h-fit ">
                    <div class="bg-gray-900 rounded-xl w-full max-w-2xl h-fit flex justify-start space-x-2 p-2 items-center text-gray-300">
                        No badges yet
                        <!-- <Badge bgColor="bg-gray-200" type="new-user" />
                        <Badge bgColor="bg-gray-200" type="initial-ping-pong" />
                        <Badge bgColor="bg-gray-200" type="ping-pong-master" /> -->
                    </div>
                    
                </div>
                <div class="divider text-xl">Posts</div>
                <div class="w-full h-fit flex flex-col justify-center items-center space-y-5 p-10 ">
                    <!-- No posts yet -->
                    <div class="h-96 w-full max-w-2xl flex-none flex-grow bg-slate-500 rounded-xl mt-10"></div>
                    <div class="divider"></div>
                    <div class="h-96 w-full max-w-2xl flex-none flex-grow bg-slate-500 rounded-xl mt-10"></div>
                    <div class="divider"></div>
                    <div class="h-96 w-full max-w-2xl flex-none flex-grow bg-slate-500 rounded-xl mt-10"></div>
                    <div class="divider"></div>
                    <div class="h-96 w-full max-w-2xl flex-none flex-grow bg-slate-500 rounded-xl mt-10"></div>
                    <div class="divider"></div>

                </div>

            </div>
        </div>
    
    </div>
</section>

<style>
    .profile-bg{
        background-color: #001220;
opacity: 1;
background-image:  radial-gradient(#e5e5f7 2px, transparent 2px), radial-gradient(#e5e5f7 2px, #001220 2px);
background-size: 80px 80px;
background-position: 0 0,40px 40px;
    }
</style>