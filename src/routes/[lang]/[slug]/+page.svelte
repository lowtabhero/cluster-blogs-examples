<script>
	import '$lib/styles/pages/_blog.scss';

	const { data } = $props();
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
		<p class="title"><span>Title:</span>{data.blog?.title}</p>
		<p class="tag"><span>Tag:</span> {data.blog?.tag}</p>
		<p class="meta"><span>Meta description:</span> {data.blog?.meta}</p>
	</div>
	<hr />
	<div class="content">{@html data.blog?.content}</div>
</main>
