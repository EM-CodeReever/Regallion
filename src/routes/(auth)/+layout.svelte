<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
  import MainNavbar from "$components/MainNavbar.svelte";
  import SideNavbar from "$components/SideNavbar.svelte";

    export let data;
    let { session, supabase,userProfile } = data;
    $: ({ session, supabase,userProfile } = data);
    let currentPath = $page.route.id;
    $: currentPath = $page.route.id;
    
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

  <section class="flex flex-col misty-waves w-full h-fit min-h-screen p-5 screen-400:p-4 screen-400:pb-0">
    <MainNavbar userProfile={userProfile} supabase={supabase}/>
      <SideNavbar {currentPath}>
        <slot />
        </SideNavbar>
  </section>

  <!-- <RiddleBox/> -->
 