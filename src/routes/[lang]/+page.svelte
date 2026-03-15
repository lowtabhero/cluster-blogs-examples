<script lang="ts">
	import '$lib/styles/pages/_home.scss';

	import { goto } from '$app/navigation';
	import BlogsGrid from '$lib/components/BlogsGrid.svelte';
	import BlogCard from '$lib/components/BlogCard.svelte';

	const { data } = $props();

	let filterValue = $state(data.filter ?? 'all');

	function handleChangeFilter() {
		const url = new URL(window.location.href);

		if (filterValue === 'all') {
			url.searchParams.delete('type');
		} else {
			url.searchParams.set('type', filterValue);
		}

		url.searchParams.delete('page');
		goto(url);
	}
</script>

<main>
	<div>
		<h1>{data.translation.home.title}</h1>
		<p>{data.translation.home.paragraph}</p>
	</div>
	<div class="filter">
		<label for="blog-type">{data.translation.home.filter.label}</label>
		<select name="blog-type" id="blog-type" bind:value={filterValue} onchange={handleChangeFilter}>
			<option value="all" selected>{data.translation.home.filter.all}</option>
			<option value="pillars">{data.translation.home.filter.pillars}</option>
			<option value="clusters">{data.translation.home.filter.clusters}</option>
		</select>
	</div>
	<BlogsGrid>
		{#each data.blogs as blog}
			<BlogCard data={blog} lang={data.lang} />
		{/each}
	</BlogsGrid>
	<div class="pagination">pagination here</div>
</main>
