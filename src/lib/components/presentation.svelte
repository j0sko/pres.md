<script lang="ts">
	import { goto } from '$app/navigation';
	import { getDoc, type QueryDocumentSnapshot } from 'firebase/firestore/lite';
	import Loading from '../generic/loading.svelte';
  import { windowContext } from '$lib/stores';
	export let content: QueryDocumentSnapshot;
	const data = content.data();
	const styleRef = data.style;

	let promise: Promise<any>;
	async function openPres() {
		getDoc(styleRef).then((doc) => {
			if (doc.exists()) {
				const css = (<any>doc).data()?.value ?? '';
				const pres = window.open('/slides.html');
				if (pres) {
					(<any>pres).content = data.content;
					(<any>pres).style = css;
				}
				return Promise.resolve();
			} else {
				throw new Error('Style not found.');
			}
		});
	}
</script>

<div>
	<button
		on:click={() => {
      windowContext.set(content);      
			goto('/editor/presentation');
		}}>edit</button
	>
	<button on:click={openPres}>
		{#if typeof promise == 'undefined'}
			{content.data().name}
		{:else}
			{#await promise}
				<Loading />
			{:then}
				Success!
			{:catch}
				Error
			{/await}
		{/if}
	</button>
</div>
