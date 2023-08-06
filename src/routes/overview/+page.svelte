<script lang="ts">
	import { db } from '$lib/firebase';
	import { user } from '$lib/stores';
	import { getDocs, collection, QueryDocumentSnapshot } from 'firebase/firestore/lite';
	import Presentation from '$lib/presentation.svelte';
	import { goto } from '$app/navigation';
	let lines: QueryDocumentSnapshot[] = new Array();
	const querySnapshot = getDocs(collection(db, 'users', $user.uid, 'presentations')).then(
		(result) => {
			result.forEach((doc) => {
				lines.push(doc);
			});
		}
	);
</script>

<button on:click={() => goto('/editor/presentation/new')}>+</button>
{#await querySnapshot}
	waiting..
{:then}
	{#each lines as line}
		<Presentation content={line} />
	{/each}
{/await}
