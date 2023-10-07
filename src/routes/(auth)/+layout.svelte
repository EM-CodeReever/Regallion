<script lang="ts">
    import { goto } from "$app/navigation";
    export let data;
    let { session, supabase,userProfile } = data;
    $: ({ session, supabase,userProfile } = data);
    import "$styles";


    function toggleDrawer(name:string) {
      let element = document.getElementById(`drawer-${name}`);
      if (element?.classList.contains('show')) {
          element?.classList.remove('show');
      } else {
          element?.classList.add('show');
      }
    }

    function logOut(){
      supabase.auth.signOut();
      goto("/");
    }

  </script>

  <section class="flex flex-col">
    <nav class="blur-bg fixed px-3 w-full top-0 bg-[#ffffffc0] flex justify-between items-center h-20 z-50">
        <div class="flex justify-center items-center py-5 px-1 hover:bg-[#]">
            <button class="btn ghost bw" on:click={()=>{toggleDrawer('left')}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                  </svg> 
            </button>             
        </div>
        <div class="flex items-center underline">
            <a href="/" class="italic font-extrabold text-3xl text-gray-800">Crestfallen</a>
        </div>
        <div class="p-5">
            <div class="dropdown bw">
            <button class="avatar ring-1" tabindex="0">
                <img alt="avatar" src="https://robohash.org/{userProfile?.username}" />
            </button>
            <div class="menu bottom-left" style="width: 20rem;">
                <p class="subtitle text-center">Signed in as: <span class="font-bold text-success-800">
                  {userProfile?.username}
                </span></p>
                <div class="is-divider" role="separator"></div>
                <button class="item text-sm btn" tabindex="-1" on:click={()=>{goto('dashboard')}}>Dashboard</button>
                <button class="item text-sm btn" tabindex="-1" on:click={()=>{goto('profile')}}>Profile</button>
                <button class="item text-sm btn" tabindex="-1" on:click={()=>{goto('account-settings')}}>Account Settings</button>
                <button class="item text-sm btn" tabindex="-1" on:click={()=>{logOut()}}>Logout</button>
              </div>
            </div>
        </div>
    </nav>
    <div class=" wave-purple h-fit w-full pt-20 flex justify-center items-center">
        <slot />
    </div>
  </section>

  
  <div data-theme="dark">
    <label class="drawer-overlay" on:click={()=>{toggleDrawer('left')}}></label>
    <div class="drawer left" id="drawer-left">
      <div class="content flex flex-col h-full">
        <label class="btn sm circle grapePurple solid absolute right-3 top-3" on:click={()=>{toggleDrawer('left')}}>✕</label>
        <h2 class="text-xl text-white">Projects</h2>
        <div class="is-divider" role="separator"></div>
        <div class="grid grid-cols-2 gap-8 grid-flow-row w-72 mt-10 mx-auto">
          <button class="btn ghost w-32 h-32 bw text-lg rounded-lg col-span-1 flex flex-col" on:click={()=>{
            goto('/ping-pong')
            toggleDrawer('left')
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve">
              <rect x="8.348" y="89.733" style="fill:#A1D8F6;" width="495.304" height="331.386"/>
              <rect x="43.542" y="117.136" style="fill:#0088FF;" width="424.504" height="276.58"/>
              <rect x="255.8" y="117.136" style="fill:#016DF5;" width="212.257" height="276.58"/>
              <rect x="235.976" y="69.398" style="fill:#FFFFFF;" width="41.06" height="373.203"/>
              <path style="fill:#3C3A41;" d="M503.652,81.386H285.38V69.399c0-4.611-3.736-8.348-8.348-8.348h-41.06  c-4.61,0-8.348,3.736-8.348,8.348v11.989H99.981c-4.61,0-8.348,3.736-8.348,8.348s3.738,8.348,8.348,8.348h127.644v10.704h-77.956  H43.542c-4.61,0-8.348,3.736-8.348,8.348v138.864v137.719c0,4.611,3.738,8.348,8.348,8.348h106.126h77.956v10.704H16.696V98.082  h26.852c4.61,0,8.348-3.736,8.348-8.348s-3.738-8.348-8.348-8.348h-35.2C3.738,81.386,0,85.123,0,89.734v331.385  c0,4.611,3.738,8.348,8.348,8.348h219.276v13.134c0,4.611,3.738,8.348,8.348,8.348h41.06c4.611,0,8.348-3.736,8.348-8.348v-13.134  h130.937c4.611,0,8.348-3.736,8.348-8.348c0-4.611-3.736-8.348-8.348-8.348H285.38v-10.704h76.542h106.126  c4.611,0,8.348-3.736,8.348-8.348v-137.72V117.134c0-4.611-3.736-8.348-8.348-8.348H361.922H285.38V98.082h209.924v314.69h-27.248  c-4.611,0-8.348,3.736-8.348,8.348c0,4.611,3.736,8.348,8.348,8.348h35.596c4.611,0,8.348-3.736,8.348-8.348V89.734  C512,85.124,508.263,81.386,503.652,81.386z M51.89,125.482h89.431v122.17H51.89V125.482z M51.89,385.371V264.347h89.431v121.023  H51.89z M158.015,385.371V255.999V125.482h69.609v259.889H158.015z M268.684,434.252H244.32v-13.134v-27.4V117.134v-27.4V77.747  h24.365v11.989v27.4V393.72v27.4V434.252z M370.269,385.371V264.347H459.7v121.023H370.269z M459.7,125.482v122.17h-89.431v-122.17  H459.7z M353.574,125.482v130.518v129.371H285.38V125.482H353.574z"/>
              </svg>
            Ping Pong
          </button>
          <div class="btn ghost w-32 h-32 bw text-lg rounded-lg col-span-1 flex flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Coming soon       
          </div>
          <div class="btn ghost w-32 h-32 bw text-lg rounded-lg col-span-1 flex flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
              Coming soon                  
          </div>
          <div class="btn ghost w-32 h-32 bw text-lg rounded-lg col-span-1 flex flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
            </svg>            
            Coming soon                  
          </div>
        </div>

      </div>
    </div>
  </div>