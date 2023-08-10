<script lang="ts">
	import { user, windowContext, moving } from '$lib/stores';
	import {
	deleteDoc,
		doc,
		serverTimestamp,
		updateDoc
	} from 'firebase/firestore/lite';
	import { db } from '$lib/firebase';
	import { addPres } from '$lib/generic/helper';
	import { goto } from '$app/navigation';
	import BtnAsync from '$lib/generic/btnAsync.svelte';
  
  let name = $windowContext?.data()?.name ?? 'Untitled';
  let content = $windowContext?.data()?.content ?? '';
  
	let promise: Promise<any> | undefined;
	async function sendDoc() {
    // add new doc if presentation doesnt exist already
		if ($windowContext == null) {
			return addPres($user, {
				name: name,
				content: content,
				style: doc(db, 'styles/default_light')
			});
		} else {
			return updateDoc($windowContext.ref, { content: content, name: name, edited: serverTimestamp() });
		}
	}

  function pickStyle() {
    moving.set(false);
    goto('/styles')
  }

  // delete the presentation
  let deletePromise: Promise<void> | undefined;
  async function deletePres() {
    const pres = $windowContext?.ref ?? null;
    if (pres != null) {
      return deleteDoc(pres)
      }
    else {
        throw new Error('Document not found.');
    }
  }
</script>

<main>
		<input type="text" bind:value={name} placeholder="Untitled" />
		<textarea contenteditable="true" bind:value={content} />
    <button on:click={pickStyle}>Pick a style</button>

  {#if $windowContext}
    
<BtnAsync
    on:click={() => {
      deletePromise = deletePres();
    }}
    on:finish={() => {
      goto('/overview');
    }}
    promise={deletePromise}
    >Delete presentation</BtnAsync>
  {/if}

	<BtnAsync
		on:click={() => {
			promise = sendDoc();
		}}
		on:finish={() => {
			goto('/overview');
		}}
		{promise}>Save</BtnAsync
	>
</main>
