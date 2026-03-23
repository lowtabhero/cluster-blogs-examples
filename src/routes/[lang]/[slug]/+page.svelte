<script>
	import '$lib/styles/pages/_blog.scss';
	import RelatedSchemeBlock from '$lib/components/RelatedSchemeBlock.svelte';

	const { data } = $props();

	let pillars = $derived(data.relatedBlogs?.filter((el) => el.type === 'pillars') || []);
	let clusters = $derived(data.relatedBlogs?.filter((el) => el.type === 'clusters') || []);
</script>

<svelte:head>
	<title>{data.blog?.title ?? 'Generation example'} | StockScout Internal</title>
</svelte:head>

<main>
	<a href="/{data.lang}" class="back-to">
		<img src="/assets/icons/arrow.svg" alt="" />
		{data.translation.blog.backTo}
	</a>
	<div class="blog-info">
		<h1>{data.translation.blog.h1Title}</h1>
		<p class="title"><span>Title:</span> {data.blog?.title}</p>
		<p class="tag"><span>Tag:</span> {data.blog?.tag}</p>
		<p class="meta"><span>Meta description:</span> {data.blog?.meta}</p>
	</div>
	<div class="cluster-scheme">
		{#if pillars.length === 1}
			<RelatedSchemeBlock
				blog={pillars[0]}
				currentBlogId={data.blog?.id || 0}
				lang={data.lang}
				isPillar={true}
			/>
		{/if}
		{#if clusters.length > 0}
			<div class="clusters-wrapper">
				{#each clusters as blog}
					<RelatedSchemeBlock
						{blog}
						currentBlogId={data.blog?.id || 0}
						lang={data.lang}
						isPillar={false}
					/>
				{/each}
			</div>
		{/if}
	</div>
	<hr />
	<div class="content">{@html data.blog?.content}</div>
</main>
