<script lang="ts">
export let messageData: {
    username: string | undefined | null;
    message: string;
    self: boolean;
};
</script>

<p class="flex max-w-2xl select-none mt-auto {messageData.self ? 'self-end' : ''}">
    {#if !messageData.self}
    <span class="bg-red-600 h-fit px-1 rounded-sm mr-1 ">{messageData.username}:</span>
    {/if}
    <span>
        {messageData.message}
    </span>
</p>