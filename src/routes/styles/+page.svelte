<script lang="ts">
  import Preview from '$lib/components/style.svelte';
	import Userstyle from '$lib/components/userstyle.svelte';
	import { db } from '$lib/firebase';
	import Loading from '$lib/generic/loading.svelte';
	import { user } from '$lib/stores';
	import { QueryDocumentSnapshot, collection, getDocs, query, orderBy } from 'firebase/firestore/lite';
  import { goto } from '$app/navigation';
	import PageSelector from '$lib/generic/pageSelector.svelte';

	let defaultStyles: QueryDocumentSnapshot[] = new Array();
  const defaultQuery = query(collection(db, 'styles'), orderBy('name'));
	const defaultsSnapshot = getDocs(defaultQuery)
		.then((r) => {
			r.forEach((doc) => {defaultStyles = [...defaultStyles, doc]});
		})
		.catch((e) => {
			console.error(e);
		});
	let userStyles: QueryDocumentSnapshot[] = new Array();
  const userQuery = query(collection(db, `users/${$user.uid}/styles`), orderBy('name'));
	const userSnapshot = getDocs(userQuery)
		.then((r) => {
			r.forEach((doc) => {userStyles = [...userStyles, doc];console.log(doc.data().name)});
		})
		.catch((e) => {
			console.error(e);
		});

  // logic for switching styles from user styles and default ones
  let userstyles = false;
  
  // page changing logic
  let page = 1;

  //search logic
  let search = '';
  $: maxPage = Math.max(1, Math.ceil((userstyles ? userStyles : defaultStyles).length / 10));
  $: linesAfterSearch = (userstyles ? userStyles : defaultStyles).filter((x) => x.data().name.toLowerCase().includes(search.toLowerCase()));

</script>

<main>
  <input type="text" placeholder="search..." bind:value={search} />
  <button on:click={() => goto('/editor/styles')}>+</button>
  <button on:click={() => {
    userstyles = !userstyles;
    page = 1;
  }}>{!userstyles ? 'Your' : 'System'} styles</button>
  {#if !userstyles}
	<div>
		{#await defaultsSnapshot}
			<Loading />
		{:then}
			{#each linesAfterSearch.slice((page - 1)*10,page*10-1) as content}
				<Preview {content} />
			{/each}
		{/await}
	</div>
  {:else}
  <div>
    {#await userSnapshot}
      <Loading />
      {:then}
      {#each linesAfterSearch.slice((page - 1)*10,page*10-1) as content}
        <Userstyle {content} />
      {/each}
    {/await}   
  </div>
  {/if}
    <PageSelector bind:page={page} {maxPage}/>
</main>
