<script lang="ts">
	import { db } from '$lib/firebase';
	import { user, windowContext } from '$lib/stores';
	import { getDocs, collection, QueryDocumentSnapshot, query, orderBy } from 'firebase/firestore/lite';
	import Presentation from '$lib/components/presentation.svelte';
	import { goto } from '$app/navigation';
	import Loading from '$lib/generic/loading.svelte';
	import PageSelector from '$lib/generic/pageSelector.svelte';
  
	let lines: QueryDocumentSnapshot[] = new Array();
  let maxPage = 1;
  const ref =  collection(db, 'users', $user.uid, 'presentations');
  const q = query(ref, orderBy('edited', 'desc'));
	const querySnapshot = getDocs(q).then(
		(result) => {
			result.forEach((doc) => {
				lines = [...lines, doc];
			});
		}
	);

  // page switching logic
  let page = 1;

  //search logic
  let search = '';
  let linesAfterSearch: any[];
  $: linesAfterSearch = lines.filter((x) => x.data().name.toLowerCase().includes(search.toLowerCase()));
  $: maxPage = Math.max(1, Math.ceil(linesAfterSearch.length / 10));
</script>

<main>
  <input type="text" placeholder="search..." bind:value={search} />
	<button on:click={() => {
  windowContext.set(null);
  goto('/editor/presentation');
  }}>+</button>
	{#await querySnapshot}
		<Loading />
	{:then}
		{#each linesAfterSearch.slice((page-1)*10,page*10-1) as line}
			<Presentation content={line} />
		{/each}
  <PageSelector bind:page={page} {maxPage} />
	{/await}
</main>
