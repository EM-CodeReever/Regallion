<script lang="ts">
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    let loading = false;
</script>
<svelte:head>
    <title>Register</title>
</svelte:head>
<section class="wave-blue h-screen flex items-center justify-center" data-theme="custom">
    <div class="w-fit blur-bg bg-[#ffffff91] h-fit flex items-center flex-col space-y-5 px-5 py-10 custom-box-shadow rounded-xl relative">
        <h1 class="text-center text-3xl font-bold text-black">Account Creation</h1>
        <p class="text-center font-semibold text-black">Enter your personal information</p>

        <form class="grid gap-5 grid-cols-4 px-5 mt-10 max-w-xl" style="width: 50rem;">


            <input class="input solid info col-span-2" placeholder="First name" />
            <input class="input solid info col-span-2" placeholder="Last name" />
            <input class="input solid info col-span-4" placeholder="Email" />
            <!-- <input class="input solid info col-span-3" placeholder="Choose Username" /> -->

            <div class="input solid info col-span-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>                  
                <input  placeholder="Choose Username" />
                <!-- X icon svg -->
                {#if loading}
                <svg 
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                    />
                </svg>
                {/if}
                <!-- Tick icon svg -->
                {#if loading}
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z"
                        fill="green"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                    />
                </svg>
                {/if}
            </div>

            <select class="select solid info col-span-1">
                <option selected disabled>Gender</option>
                <option>Male</option>
                <option>Female</option>
            </select>
            <div class="flex col-span-4 justify-between items-center">
                <p class="text-red-700 font-semibold">error message and stuff</p>
                <button class="btn solid fire col-span-1 justify-self-end" on:click={()=>{goto('main')}}>Submit</button>
            </div>
            
        </form>
    </div>
</section>

<style>
    ::placeholder {
  color: #e5e7ebbb;
  opacity: 1; /* Firefox */
}

</style>