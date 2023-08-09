<script lang="ts">
	import { user, windowContext } from '$lib/stores';
	import {
	deleteDoc,
		updateDoc
	} from 'firebase/firestore/lite';
	import { addStyle } from '$lib/generic/helper';
	import { goto } from '$app/navigation';
	import BtnAsync from '$lib/generic/btnAsync.svelte';
  import Editor from '$lib/components/csseditor.svelte'
  import preview from '$lib/preview';
	import { onMount } from 'svelte';
  
  let name = $windowContext?.data()?.name ?? 'Untitled';
  let value = $windowContext?.data()?.value ?? '';
  const path = $windowContext?.ref.path ?? '';
  const editable: Boolean = path.includes('users');

  // the editor

  //the code for the preview
  let iframe:HTMLIFrameElement | undefined;
  let iframeWindow:Window | undefined | null;

  function sendStyle(style: string) {
  iframeWindow?.postMessage({type: 'applyStyles', style: style}, '*');
  }
  onMount(() => {
  iframeWindow = iframe?.contentWindow;
  })
  $: sendStyle(value);
  
  // save doc
	let promise: Promise<any> | undefined;
	async function sendDoc() {
    // add new doc if style doesn`t exist already
		if ($windowContext == null || !editable) {
			return addStyle($user, {
				name: name,
				value: value,
			});
		} else {
			return updateDoc($windowContext.ref, { value: value, name: name });
		}
	}

  // delete the style if not system
  let deletePromise: Promise<void> | undefined;
  async function deleteStyle() {
    const style = $windowContext?.ref ?? null;
    if (style != null) {
      if (editable) {
      return deleteDoc(style)
      } else {
        throw new Error('Content is not editable.')
      }
      }
    else {
        throw new Error('Document not found.');
    }
  }
</script>

<main>
		<input type="text" bind:value={name} placeholder="Untitled" />

  <!-- the editor for the css -->
  <Editor bind:value={value}/>
  <!-- the live preview of the css -->
  <iframe
    title="Preview"
    sandbox='allow-scripts'
    srcdoc={preview}
    width="400"
    height="600"
    bind:this={iframe}
    on:load={() => sendStyle(value)}
    ></iframe>

  <!-- delete style if it is not default -->
  {#if editable}
<BtnAsync
    on:click={() => {
      deletePromise = deleteStyle();
    }}
    on:finish={() => {
      goto('/styles');
    }}
    promise={deletePromise}
    >Delete style</BtnAsync>
  {/if}
	<BtnAsync
		on:click={() => {
			promise = sendDoc();
		}}
		on:finish={() => {
			goto('/styles');
		}}
		{promise}>Save{!editable ? ' a copy' : ''}</BtnAsync
	>
</main>
