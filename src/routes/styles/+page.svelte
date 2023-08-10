<script lang="ts">
  import Preview from '$lib/components/style.svelte';
	import Userstyle from '$lib/components/userstyle.svelte';
	import { db } from '$lib/firebase';
	import Loading from '$lib/generic/loading.svelte';
	import { user } from '$lib/stores';
	import { QueryDocumentSnapshot, collection, getDocs } from 'firebase/firestore/lite';
  import { goto } from '$app/navigation';

	let defaultStyles: QueryDocumentSnapshot[] = new Array();
	const defaultsSnapshot = getDocs(collection(db, 'styles'))
		.then((r) => {
			r.forEach((doc) => defaultStyles.push(doc));
		})
		.catch((e) => {
			console.error(e);
		});
	let userStyles: QueryDocumentSnapshot[] = new Array();
	const userSnapshot = getDocs(collection(db, `users/${$user.uid}/styles`))
		.then((r) => {
			r.forEach((doc) => userStyles.push(doc));
		})
		.catch((e) => {
			console.error(e);
		});

  // logic for switching styles from user styles and default ones
  let userstyles = false;
  
</script>

<main>
  <button on:click={() => goto('/editor/styles')}>+</button>
  <button on:click={() => {userstyles = !userstyles}}>{!userstyles ? 'Your' : 'System'} styles</button>
  {#if !userstyles}
	<div>
		{#await defaultsSnapshot}
			<Loading />
		{:then}
			{#each defaultStyles as content}
				<Preview {content} />
			{/each}
		{/await}
	</div>
  {:else}
  <div>
    {#await userSnapshot}
      <Loading />
      {:then}
      {#each userStyles as content}
        <Userstyle {content} />
      {/each}
      
    {/await}   
  </div>
  {/if}
</main>
