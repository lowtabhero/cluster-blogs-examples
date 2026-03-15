<script lang="ts">
	import '$lib/styles/components/_pagination.scss';

	let { handleClickNextPage, handleClickPrevPage, canNext, canPrev } = $props();
</script>

<div class="pagination">
	<button onclick={handleClickPrevPage} disabled={!canPrev}>Prev</button>
	<button onclick={handleClickNextPage} disabled={!canNext}>Next</button>
</div>
