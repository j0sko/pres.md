<script lang="ts">
	import { db } from '$lib/firebase';
	import { user } from '$lib/stores';
	import { getDocs, collection, QueryDocumentSnapshot } from 'firebase/firestore/lite';
	import Presentation from '$lib/components/presentation.svelte';
	import { goto } from '$app/navigation';
	import Loading from '$lib/generic/loading.svelte';
	let lines: QueryDocumentSnapshot[] = new Array();
	const querySnapshot = getDocs(collection(db, 'users', $user.uid, 'presentations')).then(
		(result) => {
			result.forEach((doc) => {
				lines.push(doc);
			});
		}
	);
</script>

<main>
	<button on:click={() => goto('/editor/presentation/new')}>+</button>
	{#await querySnapshot}
		<Loading />
	{:then}
		{#each lines as line}
			<Presentation content={line} />
		{/each}
	{/await}
</main>
