<script lang="ts">
	import { user } from '$lib/stores';
	import { page } from '$app/stores';
	import {
		DocumentReference,
		doc,
		getDoc,
		serverTimestamp,
		updateDoc
	} from 'firebase/firestore/lite';
	import { db } from '$lib/firebase';
	import { addPres, type Pres } from '$lib/generic/helper';
	import { goto } from '$app/navigation';
	import BtnAsync from '$lib/generic/btnAsync.svelte';
	import { error } from '@sveltejs/kit';

	const urlParam = $page.url.toString().split('/').pop();
	let docRef = doc(db, `users/${$user.uid}/presentations/${urlParam}`);
	let content: string;
	let name: string;

	let docPromise = getDoc(docRef).then((r) => {
		content = r.data()?.content ?? '';
		name = r.data()?.name ?? 'Untitled';
	});

	let promise: Promise<any> | undefined;
	async function sendDoc() {
		if (urlParam == 'new') {
			return addPres($user, {
				name: name,
				content: content,
				style: doc(db, 'styles/default_light')
			});
		} else {
			return updateDoc(docRef, { content: content, name: name, edited: serverTimestamp() });
		}
	}
</script>

<main>
	{#if urlParam == 'new'}
		<input type="text" bind:value={name} placeholder="Untitled" />
		<textarea contenteditable="true" bind:value={content} />
	{:else}
		{#await docPromise}
			waiting
		{:then}
			<input type="text" bind:value={name} placeholder={name} />
			<textarea contenteditable="true" bind:value={content} />
		{:catch}
			error
		{/await}
	{/if}
	<BtnAsync
		on:click={() => {
			promise = sendDoc();
		}}
		on:finish={(r) => {
			console.log(r);
			goto('/overview');
		}}
		{promise}>Save</BtnAsync
	>
</main>
