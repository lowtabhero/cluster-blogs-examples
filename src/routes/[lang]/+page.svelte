<script lang="ts">
	import '$lib/styles/pages/_home.scss';

	import { goto } from '$app/navigation';
	import BlogsGrid from '$lib/components/BlogsGrid.svelte';
	import BlogCard from '$lib/components/BlogCard.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	const { data } = $props();

	let filterValue = $state(data.filter ?? 'all');
	let page = $derived(data.page ?? 1);
	let canNext = $derived(data.blogs && data.blogs.length >= 10);
	let canPrev = $derived(page > 1);

	$effect(() => {
		if (page <= 1 || !Number.isInteger(page)) {
			const url = new URL(window.location.href);
			url.searchParams.delete('page');
			goto(url);
		}
	});

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

	function handleClickNextPage() {
		const url = new URL(window.location.href);
		url.searchParams.set('page', (page + 1).toString());
		goto(url);
	}

	function handleClickPrevPage() {
		const url = new URL(window.location.href);
		url.searchParams.set('page', (page - 1).toString());
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
	<Pagination {handleClickNextPage} {handleClickPrevPage} {canNext} {canPrev} />
</main>
