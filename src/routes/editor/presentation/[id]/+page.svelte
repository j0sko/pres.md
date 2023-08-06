<script lang="ts">
	import { user } from '$lib/stores';
	import { page } from '$app/stores';
	import { doc, getDoc, updateDoc, collection} from 'firebase/firestore/lite';
	import { db } from '$lib/firebase';
	import { addPres } from '$lib/adder';

	const urlParam = $page.url.toString().split('/').pop();
	let docRef = doc(db, `users/${$user.uid}/presentations/${urlParam}`);
	let content: string;
	let name: string;
	function sendDoc() {
		if (urlParam == 'new') {
			addPres($user, {name: name, content: content, style: doc(db, 'styles/default_light')})
		}
		updateDoc(docRef, {content: content})
	}
</script>
{#if urlParam == 'new'}
<textarea contenteditable="true" bind:innerText={content} />
<input type="text" bind:value={name} placeholder='Untitled'>
{:else}
	{#await getDoc(docRef)}
	waiting
	{:then docSnap}
	<input type="text" bind:value={name} placeholder={docSnap.data()?.name ?? 'Untitled'}>
	<textarea contenteditable="true" bind:innerText={content}>{docSnap.data()?.content ?? ''}</textarea>
	{:catch}
	error
	{/await}
{/if}
<button on:click={sendDoc}>Save</button>

