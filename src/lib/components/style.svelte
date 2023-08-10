<script lang="ts">
	import { updateDoc, type QueryDocumentSnapshot } from 'firebase/firestore/lite';
  import { goto } from '$app/navigation';
	import { windowContext, moving } from '$lib/stores';
	import Loading from '$lib/generic/loading.svelte';

	export let content: QueryDocumentSnapshot; 
  $: data = content.data();
  $: preview = data.preview;
  
  // go to editor for this style
function edit() {
    moving.set(true);
  windowContext.set(content);
  goto('/editor/styles');
}
  // set the style to the presentation defined in windowContext
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
    <!-- show preview if available -->
      {#if typeof(preview) != 'undefined'}
        <div class="preview" style={preview.background}>
          <div class='slide' style={preview.slide}>
          <h2 style={preview.title}>Title</h2>
          <p style={preview.text}>Lorem ipsum dolor sit</p>
          </div>
        </div>
    {:else}
      <p>Error</p>
    {/if}
      <p>{data.name}</p>
      <button on:click={edit}>Edit</button> 
    {#if $windowContext != null && !$moving}
      <button on:click={setStyle}>Set style</button>
    {#if typeof(promise) != 'undefined'}
    {#await promise}
      <Loading />
    {:then}
      Success!
    {:catch}
      Error
    {/await}
    {/if}
    {/if}
		</div>
