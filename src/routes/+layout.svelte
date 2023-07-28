<script>
    import { page } from "$app/stores";
	import Sidebar from "$lib/sidebar.svelte";
    console.log($page.url.pathname);
</script>
{#if $page.url.pathname != '/'}
    <Sidebar />
{/if}
<slot />