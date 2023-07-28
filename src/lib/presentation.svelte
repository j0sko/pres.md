<script lang="ts">
	import { getDoc, type QueryDocumentSnapshot } from 'firebase/firestore/lite';

	export let content: QueryDocumentSnapshot;
	const presContent = content.data().content;
	const styleRef = content.data().style;
    let state: 'Loading' | 'Idle' | 'Error' = 'Idle';
	function openPres() {
        state = 'Loading'
		const docSnap = getDoc(styleRef).then((doc) => {
			if (doc.exists()) {
				const css = (<any>doc).data().value;
				const pres = window.open('/slides.html');
				if (pres) {
					(<any>pres).content = presContent;
					(<any>pres).style = css;
				}
                state = 'Idle';
			} else {
                state = 'Error';
			}
		});
	}
</script>

<button on:click={openPres}>
    {#if state == 'Idle'}
    {content.data().name}
    {:else if state == 'Loading'}
        Loading...
    {:else}
        Error
    {/if}
</button>
