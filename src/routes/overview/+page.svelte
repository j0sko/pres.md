<script lang="ts">
	import { db } from '$lib/firebase';
	import { user, windowContext } from '$lib/stores';
	import { getDocs, collection, QueryDocumentSnapshot } from 'firebase/firestore/lite';
	import Presentation from '$lib/components/presentation.svelte';
	import { goto } from '$app/navigation';
	import Loading from '$lib/generic/loading.svelte';
	import PageSelector from '$lib/generic/pageSelector.svelte';
  
	let lines: QueryDocumentSnapshot[] = new Array();
  let maxPage = 1;
  const ref =  collection(db, 'users', $user.uid, 'presentations');
	const querySnapshot = getDocs(ref).then(
		(result) => {
			result.forEach((doc) => {
				lines.push(doc);
			});
  maxPage = Math.ceil(lines.length / 10);
		}
	);

  // page switching logic
  let page = 1;
</script>

<main>
	<button on:click={() => {
  windowContext.set(null);
  goto('/editor/presentation');
  }}>+</button>
	{#await querySnapshot}
		<Loading />
	{:then}
		{#each lines.slice((page-1)*10,page*10) as line}
			<Presentation content={line} />
		{/each}
  <PageSelector bind:page={page} maxPage={maxPage} />
	{/await}
</main>
