<script lang="ts">
  import Preview from '$lib/components/style.svelte';
	import Userstyle from '$lib/components/userstyle.svelte';
	import { db } from '$lib/firebase';
	import Loading from '$lib/generic/loading.svelte';
	import { user } from '$lib/stores';
	import { QueryDocumentSnapshot, collection, getDocs } from 'firebase/firestore/lite';
  import { goto } from '$app/navigation';
	import PageSelector from '$lib/generic/pageSelector.svelte';

	let defaultStyles: QueryDocumentSnapshot[] = new Array();
	const defaultsSnapshot = getDocs(collection(db, 'styles'))
		.then((r) => {
			r.forEach((doc) => defaultStyles.push(doc));
      defaultsMaxPage = Math.ceil(defaultStyles.length / 10);
		})
		.catch((e) => {
			console.error(e);
		});
	let userStyles: QueryDocumentSnapshot[] = new Array();
	const userSnapshot = getDocs(collection(db, `users/${$user.uid}/styles`))
		.then((r) => {
			r.forEach((doc) => userStyles.push(doc));
      userMaxPage = Math.ceil(userStyles.length / 10);
		})
		.catch((e) => {
			console.error(e);
		});

  // logic for switching styles from user styles and default ones
  let userstyles = false;
  
  // page changing logic
  let defaultsMaxPage = 1;
  let userMaxPage = 1;

  let page = 1;
</script>

<main>
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
			{#each defaultStyles.slice((page - 1)*10,page*10) as content}
				<Preview {content} />
			{/each}
		{/await}
	</div>
  {:else}
  <div>
    {#await userSnapshot}
      <Loading />
      {:then}
      {#each userStyles.slice((page - 1)*10,page*10) as content}
        <Userstyle {content} />
      {/each}
      
    {/await}   
  </div>
  {/if}
    <PageSelector bind:page={page} maxPage={userstyles ? userMaxPage : defaultsMaxPage}/>
</main>
