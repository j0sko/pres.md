<script lang='ts'>
import { windowContext } from "$lib/stores";  
import { goto } from "$app/navigation";

function route(path: string) {
  windowContext.set(null);
  goto(path)
}
</script>
<div>
    <button on:click={() => route('/')}>Home</button>
    <button on:click={() => route('/overview')}>Overview</button>
    <button on:click={() => route('/styles')}>Styles</button>

</div>
