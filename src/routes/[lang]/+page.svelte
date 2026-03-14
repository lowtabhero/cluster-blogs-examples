<script lang="ts">
	import '$lib/styles/pages/_home.scss';

	import BlogsGrid from '$lib/components/BlogsGrid.svelte';
	import BlogCard from '$lib/components/BlogCard.svelte';

	const { data } = $props();
</script>

<main>
	<div>
		<h1>title</h1>
		<p>This page is for generation examples</p>
	</div>
	<BlogsGrid>
		{#each data.blogs as blog}
			<BlogCard data={blog} lang={data.lang} />
		{/each}
	</BlogsGrid>
</main>
