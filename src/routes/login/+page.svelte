<script lang="ts">
	import Login from "$lib/login.svelte"
	import { user } from '$lib/stores.js'
	//TODO: Replace with fetches from db for user
	const content = 'Hello';
	const css = '.remark-container{background:linear-gradient(red, blue);}';
	function openPres() {
		// open in new tab
		const pres = window.open('/slides.html');
        if (pres) {
		    (<any> pres).content = content;
		    (<any> pres).style = css;
		}
	}
</script>

<body>
	{#if $user}
		Hello, {$user.displayName}!
		<button on:click={openPres}>Proceed to placeholder testing presentation</button>
	{:else}
		<Login />
	{/if}
</body>
