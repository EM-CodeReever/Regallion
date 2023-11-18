<script lang="ts">
        import Badge from '$components/Badge.svelte';
import type { PageData } from './$types';
        export let data: PageData;
        let { supabase, session,userProfile } = data;

</script>

<svelte:head>
        <title>Profile</title>
</svelte:head>
 
<section class="w-full bg-oxfordBlue-700 min-h-screen flex flex-col lg:flex-row justify-center items-center lg:items-start pt-24 pb-5 space-y-8 lg:space-y-0 lg:px-28 lg:space-x-8">

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
        <div class="w-full max-w-xl h-full blur-bg bg-[#000000aa] lg:rounded-xl flex flex-col items-center justify-start overflow-y-scroll" style="height: 36rem;">
            <h1 class="text-2xl text-gray-200 m-5">Posts</h1>
            <!-- <div class="w-full h-full flex flex-col items-center justify-center">
                <h1 class="text-2xl text-gray-200">No Posts Yet</h1>
                <p class="text-gray-400">Start posting to see your posts here</p>
            </div> -->
            <div class=" w-full h-fit px-5 flex flex-col space-y-3">
                <div class="flex items-e space-x-3">
                    <img src="https://robohash.org/{userProfile?.username}" class="avatar ring-1 w-6 h-6" alt="">
                    <span class="flex flex-col justify-center">
                        <span class="text-gray-400 text-sm font-semibold"> {userProfile?.first_name} {userProfile?.last_name}</span>
                        <span class="text-gray-400 text-xs"> @{userProfile?.username} </span>
                    </span>
                    
                </div>
                <div class="text-gray-200 px-2" >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ren, voluptate, quibusdam, quia voluptas quos quod illi quas quidem doloribus.
                </div>
                <div class="flex justify-end w-full">
                    <button class="btn bg-danger-800"><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM7.00061 16.4209C6.68078 16.1577 6.20813 16.2036 5.94491 16.5234C5.68169 16.8432 5.72758 17.3159 6.04741 17.5791L7.00061 16.4209ZM2.34199 13.4115C2.54074 13.7749 2.99647 13.9084 3.35988 13.7096C3.7233 13.5108 3.85677 13.0551 3.65801 12.6917L2.34199 13.4115ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219ZM9.42605 18.3219C8.63014 17.6945 7.82129 17.0963 7.00061 16.4209L6.04741 17.5791C6.87768 18.2624 7.75472 18.9144 8.49742 19.4999L9.42605 18.3219ZM3.65801 12.6917C3.0968 11.6656 2.75 10.5033 2.75 9.1371H1.25C1.25 10.7746 1.66995 12.1827 2.34199 13.4115L3.65801 12.6917Z" fill="#1C274C"></path> </g></svg></button>
                    
                </div>
            </div>
            <div class="divider px-4"></div>
            <div class=" w-full h-fit px-5 flex flex-col space-y-3">
                <div class="flex items-e space-x-3">
                    <img src="https://robohash.org/{userProfile?.username}" class="avatar ring-1 w-6 h-6" alt="">
                    <span class="flex flex-col justify-center">
                        <span class="text-gray-400 text-sm font-semibold"> {userProfile?.first_name} {userProfile?.last_name}</span>
                        <span class="text-gray-400 text-xs"> @{userProfile?.username} </span>
                    </span>
                    
                </div>
                <div class="text-gray-200 px-2" >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ren, voluptate, quibusdam, quia voluptas quos quod illi quas quidem doloribus.
                </div>
                <div class="flex justify-end w-full">
                    <button class="btn bg-danger-800"><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM7.00061 16.4209C6.68078 16.1577 6.20813 16.2036 5.94491 16.5234C5.68169 16.8432 5.72758 17.3159 6.04741 17.5791L7.00061 16.4209ZM2.34199 13.4115C2.54074 13.7749 2.99647 13.9084 3.35988 13.7096C3.7233 13.5108 3.85677 13.0551 3.65801 12.6917L2.34199 13.4115ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219ZM9.42605 18.3219C8.63014 17.6945 7.82129 17.0963 7.00061 16.4209L6.04741 17.5791C6.87768 18.2624 7.75472 18.9144 8.49742 19.4999L9.42605 18.3219ZM3.65801 12.6917C3.0968 11.6656 2.75 10.5033 2.75 9.1371H1.25C1.25 10.7746 1.66995 12.1827 2.34199 13.4115L3.65801 12.6917Z" fill="#1C274C"></path> </g></svg></button>
                    
                </div>
            </div>
            <div class="divider px-4"></div>
            <div class=" w-full h-fit px-5 flex flex-col space-y-3">
                <div class="flex items-e space-x-3">
                    <img src="https://robohash.org/{userProfile?.username}" class="avatar ring-1 w-6 h-6" alt="">
                    <span class="flex flex-col justify-center">
                        <span class="text-gray-400 text-sm font-semibold"> {userProfile?.first_name} {userProfile?.last_name}</span>
                        <span class="text-gray-400 text-xs"> @{userProfile?.username} </span>
                    </span>
                    
                </div>
                <div class="text-gray-200 px-2" >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam ren, voluptate, quibusdam, quia voluptas quos quod illi quas quidem doloribus.
                </div>
                <div class="flex justify-end w-full">
                    <button class="btn bg-danger-800"><svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM7.00061 16.4209C6.68078 16.1577 6.20813 16.2036 5.94491 16.5234C5.68169 16.8432 5.72758 17.3159 6.04741 17.5791L7.00061 16.4209ZM2.34199 13.4115C2.54074 13.7749 2.99647 13.9084 3.35988 13.7096C3.7233 13.5108 3.85677 13.0551 3.65801 12.6917L2.34199 13.4115ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219ZM9.42605 18.3219C8.63014 17.6945 7.82129 17.0963 7.00061 16.4209L6.04741 17.5791C6.87768 18.2624 7.75472 18.9144 8.49742 19.4999L9.42605 18.3219ZM3.65801 12.6917C3.0968 11.6656 2.75 10.5033 2.75 9.1371H1.25C1.25 10.7746 1.66995 12.1827 2.34199 13.4115L3.65801 12.6917Z" fill="#1C274C"></path> </g></svg></button>
                    
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