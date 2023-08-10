<script lang="ts">
	import { db } from '$lib/firebase';
	import { user, windowContext } from '$lib/stores';
	import { getDocs, collection, QueryDocumentSnapshot } from 'firebase/firestore/lite';
	import Presentation from '$lib/components/presentation.svelte';
	import { goto } from '$app/navigation';
	import Loading from '$lib/generic/loading.svelte';
  
	let lines: QueryDocumentSnapshot[] = new Array();
  const ref =  collection(db, 'users', $user.uid, 'presentations');
	const querySnapshot = getDocs(ref).then(
		(result) => {
			result.forEach((doc) => {
				lines.push(doc);
			});
		}
	);
</script>

<main>
	<button on:click={() => {
  windowContext.set(null);
  goto('/editor/presentation');
  }}>+</button>
	{#await querySnapshot}
		<Loading />
	{:then}
		{#each lines as line}
			<Presentation content={line} />
		{/each}
	{/await}
</main>
