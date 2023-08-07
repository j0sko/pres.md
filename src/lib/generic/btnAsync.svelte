<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Loading from './loading.svelte';
	export let promise: Promise<any> | undefined;

	const dispatch = createEventDispatcher();
</script>

<div>
	{#if typeof promise == 'undefined'}
		<button
			on:click={() => {
				dispatch('click');
			}}
		>
			<slot />
		</button>
	{:else}
		{#await promise}
			<Loading />
		{:then result}
			{void dispatch('finish', result) ?? ''}
			Success
		{:catch}
			Error
		{/await}
	{/if}
</div>
