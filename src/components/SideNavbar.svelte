<script lang="ts">
  import { Club, DiamondPercent, House, ListOrdered, MessageSquareMore, Sticker } from "lucide-svelte";


  import SideNavItem from "./SideNavItem.svelte";
  import Project from "./svg/Project.svelte";

  export let currentPath: string | null;

  let staticPath = "/(auth)";

</script>


<div class="w-full h-fit flex flex-col space-y-5 mt-4 lg:space-x-5 ping-pong-breakpoint:space-y-0 ping-pong-breakpoint:flex-row">
    <div class="w-full max-w-[14rem] text-gray-200 p-3 h-fit rounded-xl justify-start items-center space-y-3 flex-col hidden lg:flex">

        <SideNavItem title="Dashboard" isActive={(currentPath === staticPath + "/dashboard")} linkTo="/dashboard">
            <Project/>
        </SideNavItem>
        <SideNavItem title="Ping Pong" isActive={(currentPath === staticPath + "/ping-pong")} linkTo="/ping-pong">
          <DiamondPercent/>
        </SideNavItem>
        <SideNavItem title="Memory Cards" isActive={(currentPath === staticPath + "/memory-card")} linkTo="/memory-card">
            <Sticker/>
        </SideNavItem>
        <SideNavItem title="Regalore" isActive={(currentPath === staticPath + "/chat-room")} linkTo="/chat-room">
          <MessageSquareMore/>
        </SideNavItem>
        <SideNavItem title="Leaderboard" isActive={(currentPath === staticPath + "/leaderboard")} linkTo="/leaderboard">
          <ListOrdered/>
        </SideNavItem>
        <SideNavItem title="Homepage" isActive={false} linkTo="/">
          <House/>
        </SideNavItem>
      </div>
      <div class="w-full ">
        <slot />
      </div>
</div>