<script lang="ts">

export let page = 1;
export let maxPage = 1;
</script>
<div>
  <button on:click={() => {if(page > 1) {page -= 1}}}>&lt;</button>
  <input type="number" min="1" max={maxPage} step="1"
  bind:value={page} />/{maxPage}
  <button on:click={() => {if(page < maxPage) {page += 1}}}>&gt;</button>


</div>
