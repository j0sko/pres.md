<script>
    import { page } from "$app/stores";
	import Sidebar from "$lib/sidebar.svelte";
</script>
{#if $page.url.pathname != '/'}
    <Sidebar />
{/if}
<slot />