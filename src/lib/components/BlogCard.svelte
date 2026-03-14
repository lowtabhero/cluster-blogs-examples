<script>
	import '$lib/styles/components/_blog-data.scss';
	let { data, lang } = $props();
	$inspect(data);
</script>

<a href="/{lang}/{data.id}" class="blog-card">
	<div class="featured-image">
		<img src="https://i.scdn.co/image/ab67616d00001e02e27ec71c111b88de91a51600" alt="" />
	</div>
	<div class="info">
		<div class="up">
			<span class="tag">tag</span>
			<p class="title">{data.title?.rendered}</p>
		</div>
		<p class="short-desc">{data.meta?.rank_math_description}</p>
	</div>
</a>
