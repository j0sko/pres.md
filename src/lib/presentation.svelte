<script lang="ts">
	import { goto } from '$app/navigation';
	import { getDoc, type QueryDocumentSnapshot } from 'firebase/firestore/lite';

	export let content: QueryDocumentSnapshot;
	const data = content.data();
	const styleRef = content.data().style;
    let state: 'Loading' | 'Idle' | 'Error' = 'Idle';
	function openPres() {
        state = 'Loading'
		const docSnap = getDoc(styleRef).then((doc) => {
			if (doc.exists()) {
				const css = (<any>doc).data().value;
				const pres = window.open('/slides.html');
				if (pres) {
					(<any>pres).content = data.content;
					(<any>pres).style = css;
				}
                state = 'Idle';
			} else {
                state = 'Error';
			}
		});
	}
</script>
<div>
<button on:click={() => {goto(`/editor/presentation/${content.id}`)}}>edit</button>
<button on:click={openPres}>
    {#if state == 'Idle'}
    {content.data().name}
    {:else if state == 'Loading'}
        Loading...
    {:else}
        Error
    {/if}
</button>
</div>