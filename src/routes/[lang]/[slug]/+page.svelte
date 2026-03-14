<script>
	import '$lib/styles/pages/_blog.scss';

	const { data } = $props();

	console.log(data);
</script>

<main>
	<a href="/{data.lang}" class="back-to">
		<img src="/assets/icons/arrow.svg" alt="" />
		Back to all blogs
	</a>
	<div class="blog-info">
		<h1>This page shows only generation example</h1>
		<div class="title"><span>Title:</span>{data.blog?.title}</div>
		<div class="tag"><span>Tag:</span> {data.blog?.tag}</div>
		<div class="meta"><span>Meta description:</span> {data.blog?.meta}</div>
	</div>
	<hr />
	<div class="content">{@html data.blog?.content}</div>
</main>
