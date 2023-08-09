<script lang="ts">
	import { updateDoc, type QueryDocumentSnapshot} from 'firebase/firestore/lite';
  import { goto } from '$app/navigation';
	import { windowContext, moving } from '$lib/stores';
	import Loading from '$lib/generic/loading.svelte';

	export let content: QueryDocumentSnapshot;
  const data = content.data();

function edit() {
    moving.set(true);
  windowContext.set(content);
  goto('/editor/styles')
}
    
let promise: Promise<void> | undefined;
async function setStyle() {
    if ($windowContext != null) {
   promise = updateDoc($windowContext?.ref, {style: content.ref})
    .then(() => {
    goto('/editor/presentation');
      })}
}
</script>

<div>
  <p>{data.name}</p>
 <button on:click={edit}>Edit</button> 
  {#if $windowContext != null && !$moving}
  {#if typeof(promise) != 'undefined'}
  {#await promise}
  <Loading />
  {:then}
    Success!
  {:catch}
    Error
  {/await}
  {/if}
  <button on:click={setStyle}>Set style</button>
  {/if}
</div>
