<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
  import MainNavbar from "$components/MainNavbar.svelte";
  import SideNavbar from "$components/SideNavbar.svelte";
    import SideNavItem from "$components/SideNavItem.svelte";
    import Chatroom from "$components/svg/Chatroom.svelte";
    import Home from "$components/svg/Home.svelte";
    import Logout from "$components/svg/Logout.svelte";
    import Overview from "$components/svg/Overview.svelte";
    import Profile from "$components/svg/Profile.svelte";
    import Project from "$components/svg/Project.svelte";
    import Settings from "$components/svg/Settings.svelte";
    import Sidebar from "$components/svg/Sidebar.svelte";
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
 