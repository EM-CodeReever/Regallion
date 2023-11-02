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
    <nav class="blur-bg fixed px-3 w-full top-0 bg-transparent flex justify-between items-center h-20 z-50">
        <div class="flex justify-center items-center py-5 px-1 hover:bg-[#]">
            <button class="btn" on:click={()=>{toggleDrawer('left')}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                  </svg> 
            </button>             
        </div>
        <div class="flex space-x-2 items-center">
          <img src="/favicon.ico" alt="Regal logo" class="w-9 h-9">
          <a href="/" class=" font-extrabold text-2xl lg:text-2xl text-oxfordBlue-200">Regallion</a>
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
    <div class="h-fit w-full flex justify-center items-center">
        <slot />
    </div>
  </section>

  
  <div data-theme="dark">
    <label class="drawer-overlay" on:click={()=>{toggleDrawer('left')}}></label>
    <div class="drawer left" id="drawer-left">
      <div class="content flex flex-col h-full">
        <label class="btn sm circle bw solid absolute right-3 top-3" on:click={()=>{toggleDrawer('left')}}>✕</label>
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
          <button class="btn ghost w-32 h-32 bw text-lg rounded-lg col-span-1 flex flex-col" on:click={()=>{
            goto('/memory-card')
            toggleDrawer('left')
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
            </svg> 
            Memory Cards      
          </button>
          <div class="btn ghost w-32 h-32 bw text-lg rounded-lg col-span-1 flex flex-col">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
              Coming soon                  
          </div>
          <div class="btn ghost w-32 h-32 bw text-lg rounded-lg col-span-1 flex flex-col">   
            <svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M145.424 906.44a381.336 81.488 0 1 0 762.672 0 381.336 81.488 0 1 0-762.672 0Z" fill="#B8CBCD"></path><path d="M817.424 259.928v-96a64 64 0 0 1 128 0v96M817.424 99.928H258.56l-41.136 41.144v622.856h600M753.424 907.928H130.56l-41.136-41.136V763.928h608" fill="#B9E3ED"></path><path d="M689.424 763.928v80a64 64 0 0 0 128 0v-80" fill="#B9E3ED"></path><path d="M753.424 931.928a24 24 0 1 1 0-48c22.056 0 40-17.944 40-40v-680c0-48.52 39.48-88 88-88s88 39.48 88 88v96a24 24 0 0 1-24 24h-104v560c0 48.528-39.48 88-88 88z m88-696h80v-72c0-22.056-17.944-40-40-40s-40 17.944-40 40v72z" fill="#324654"></path><path d="M761.424 923.928c-44.112 0-80-35.888-80-80v-72a16 16 0 0 1 32 0v72c0 26.472 21.528 48 48 48a16 16 0 0 1 0 32z" fill="#324654"></path><path d="M697.424 787.928h-488a16 16 0 0 1 0-32h488a16 16 0 0 1 0 32zM753.424 635.928h-224a16 16 0 0 1 0-32h224a16 16 0 0 1 0 32zM457.424 635.928h-184a16 16 0 0 1 0-32h184a16 16 0 0 1 0 32zM666.12 715.928H457.424a16 16 0 0 1 0-32h208.696a16 16 0 0 1 0 32zM398.64 715.928H273.424a16 16 0 0 1 0-32H398.64a16 16 0 0 1 0 32z" fill="#324654"></path><path d="M161.424 931.928c-48.52 0-88-39.48-88-88v-80a24 24 0 0 1 24-24h96v-576c0-48.52 39.48-88 88-88a24 24 0 1 1 0 48c-22.056 0-40 17.944-40 40v600a24 24 0 0 1-24 24h-96v56c0 22.056 17.944 40 40 40a24 24 0 1 1 0 48z" fill="#324654"></path><path d="M881.424 123.928h-600a24 24 0 1 1 0-48h600a24 24 0 1 1 0 48zM753.424 931.928H158.408a24 24 0 1 1 0-48h595.016a24 24 0 1 1 0 48z" fill="#324654"></path><path d="M466.728 555.928l-30.224-49.28-58.968 12.832 69.368-169.744 89.192 36.432z" fill="#F6E89A"></path><path d="M466.728 571.928a16.016 16.016 0 0 1-13.64-7.632l-24.28-39.6-47.864 10.424a16 16 0 1 1-18.208-21.688l69.36-169.752a16.032 16.032 0 0 1 20.864-8.76l89.192 36.44a16 16 0 0 1 8.76 20.864l-69.368 169.76a15.984 15.984 0 0 1-14.816 9.944z m-30.216-81.28c5.48 0 10.688 2.832 13.64 7.632l13.712 22.368 51.368-125.72-59.576-24.336-51.808 126.792 29.248-6.368c1.144-0.248 2.288-0.368 3.416-0.368z" fill="#8D4520"></path><path d="M559.112 555.928l30.232-49.28 58.96 12.832-69.368-169.744-89.184 36.432z" fill="#F6E89A"></path><path d="M559.112 571.928a16 16 0 0 1-14.808-9.944l-69.36-169.76a16 16 0 0 1 8.76-20.864l89.184-36.44a16.016 16.016 0 0 1 20.864 8.76l68.56 167.784a16 16 0 0 1-13.848 24.024h-0.16c-1.136 0-2.272-0.12-3.408-0.368l-47.856-10.424-24.288 39.6a16.024 16.024 0 0 1-13.64 7.632z m-48.496-177l51.36 125.728 13.728-22.376a16 16 0 0 1 17.048-7.264l29.232 6.368-51.808-126.792-59.56 24.336z" fill="#8D4520"></path><path d="M583.608 435.032l-36.696-2.984-26.92 25.104-31.096-19.688-35.504 9.72-18.384-31.888-35.96-7.888-1.456-36.792-28.168-23.696 15.8-33.24-13.936-34.072 29.448-22.096 3.496-36.648 36.336-5.88 20.128-30.824 34.912 11.68 32.144-17.936 25.48 26.568 36.8-0.944 10.216 35.36 33.024 16.264-7.384 36.064 21.68 29.752-23.304 28.504 5.376 36.408-33.872 14.408z" fill="#F6E89A"></path><path d="M519.984 473.152c-2.96 0-5.928-0.808-8.56-2.488l-25.128-15.912-28.688 7.856a16.024 16.024 0 0 1-18.088-7.44l-14.856-25.768-29.056-6.384a15.992 15.992 0 0 1-12.56-14.992l-1.176-29.728-22.76-19.152a16 16 0 0 1-4.152-19.112l12.768-26.856-11.256-27.528a15.984 15.984 0 0 1 5.208-18.848l23.792-17.848 2.832-29.616a16 16 0 0 1 13.368-14.272l29.36-4.752 16.264-24.904a15.968 15.968 0 0 1 18.472-6.424l28.208 9.44 25.968-14.496a16.032 16.032 0 0 1 19.344 2.888l20.592 21.472 29.736-0.76c7.296-0.416 13.76 4.56 15.776 11.544l8.256 28.568 26.688 13.152a15.984 15.984 0 0 1 8.6 17.56l-5.96 29.144 17.52 24.04a15.984 15.984 0 0 1-0.544 19.544l-18.832 23.032 4.344 29.424a16 16 0 0 1-9.568 17.064l-27.368 11.64-9.824 28.064a15.92 15.92 0 0 1-16.4 10.664l-29.648-2.408-21.752 20.288a15.96 15.96 0 0 1-10.92 4.304z m-31.088-51.688c3 0 5.976 0.84 8.56 2.488l20.656 13.088L536 420.344a15.784 15.784 0 0 1 12.208-4.24l24.376 1.984 8.08-23.08c1.48-4.248 4.696-7.68 8.84-9.448l22.504-9.568-3.568-24.184a15.984 15.984 0 0 1 3.448-12.464l15.48-18.936-14.4-19.768a16 16 0 0 1-2.744-12.632l4.896-23.96-21.936-10.808a15.944 15.944 0 0 1-8.296-9.904l-6.792-23.496-24.456 0.616a16.16 16.16 0 0 1-11.952-4.912l-16.928-17.648-21.352 11.912a15.952 15.952 0 0 1-12.872 1.2l-23.192-7.76-13.376 20.48a16 16 0 0 1-10.832 7.048l-24.144 3.904-2.328 24.352a15.976 15.976 0 0 1-6.328 11.272l-19.56 14.68 9.256 22.632a15.976 15.976 0 0 1-0.36 12.92l-10.496 22.088 18.712 15.744a16 16 0 0 1 5.688 11.608l0.968 24.448 23.888 5.24c4.4 0.96 8.184 3.736 10.432 7.632l12.208 21.184 23.584-6.464c1.4-0.368 2.824-0.552 4.24-0.552z" fill="#8D4520"></path><path d="M508.4 229.296l26.696 54.088 59.688 8.664-43.2 42.104 10.2 59.44-53.384-28.064-53.384 28.064 10.192-59.44-43.192-42.104 59.688-8.664z" fill="#FFFFFF"></path><path d="M561.784 409.592c-2.544 0-5.104-0.608-7.448-1.832l-45.936-24.144-45.936 24.144a15.984 15.984 0 1 1-23.216-16.864l8.768-51.152-37.168-36.24a16 16 0 0 1 8.872-27.288l51.352-7.456 22.976-46.536a16 16 0 0 1 28.688-0.008l22.976 46.544 51.352 7.456a16 16 0 0 1 8.872 27.288l-37.168 36.24 8.776 51.152a16.024 16.024 0 0 1-15.76 18.696zM456.4 303.224l19.976 19.48c3.776 3.672 5.496 8.968 4.6 14.16l-4.712 27.488 24.688-12.984a15.96 15.96 0 0 1 14.888 0l24.688 12.976-4.712-27.488a16.008 16.008 0 0 1 4.6-14.16l19.984-19.48-27.6-4.008a16 16 0 0 1-12.048-8.752l-12.352-25.024-12.344 25.016a16 16 0 0 1-12.048 8.76l-27.608 4.016z" fill="#8D4520"></path></g></svg>       
            Coming soon                  
          </div>
        </div>

      </div>
    </div>
  </div>