<script lang="ts">
  import { goto } from "$app/navigation";


  import { LogOut, Menu, Settings, Sidebar } from "lucide-svelte";
  export let userProfile;
  export let supabase;

  function toggleDrawer(name:string) {
      let element = document.getElementById(`drawer-${name}`);
      if (element?.classList.contains('show')) {
          element?.classList.remove('show');
      } else {
          element?.classList.add('show');
      }
    }

</script>


<div class="flex justify-between items-center">
  <span
    class="text-2xl sm:text-3xl font-bold text-gray-200 flex items-center space-x-2"
  >
    <button
      class="btn morningGreen -mb-1 ghost p-2 lg:hidden"
      on:click={() => {
        toggleDrawer("left");
      }}
    >
      <Menu class="w-6 h-6" />
    </button>
    <div class="flex space-x-1 items-center">
      <img
        src="/favicon.ico"
        alt="Regal logo"
        class="w-10 h-10 hidden sm:flex"
      />
      <a
        href="/dashboard"
        class="px-2 py-0.5 rounded-md font-extrabold text-2xl lg:text-3xl text-gray-200"
        >Regallion</a
      >
    </div>
  </span>
  <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <div class="dropdown morningGreen">
    <label
      class="flex space-x-3 p-3 rounded-2xl cursor-pointer hover:bg-morningGreen-200 duration-200"
      tabindex="0"
    >
      <!-- <button class="btn sm:md sm solid orangeWeb" on:click={()=>{aboutModal = !aboutModal}}>
            <p class="hidden screen-500:block">About Regallion</p>
            <AboutInfo/>
            
            </button> -->
      <div class="flex flex-col">
        <p class="font-semibold">{userProfile?.username}</p>
        <p class="text-xs font-thin">{userProfile?.auth_email}</p>
      </div>
      <div class="avatar square ring">
        <img alt="avatar" src="https://robohash.org/{userProfile?.username}" />
      </div>
    </label>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="menu bottom-left !w-[12rem]">
      <!-- svelte-ignore a11y-missing-attribute -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <a class="item text-sm" tabindex="-1" on:click={() => {
        goto("/account-settings");
      }}
        ><Settings class="w-4 h-4" /> Account settings</a
      >
      <!-- svelte-ignore a11y-missing-attribute -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <a
        class="item text-sm"
        tabindex="-1"
        on:click={() => {
          supabase.auth.signOut();
          goto("/");
        }}><LogOut class="w-4 h-4" /> Log-out</a
      >
    </div>
  </div>
</div>
