<script lang="ts">
	import '$lib/styles/components/_blog-data.scss';
	import type { NormalizedBlog } from '$lib/NormalizedBlogType.js';

	let { data, lang }: { data: NormalizedBlog; lang: string } = $props();

	let cardImage: HTMLImageElement;

	function onLoadError() {
		cardImage.src = 'https://wordpress.stockscout.eu/wp-content/uploads/2026/02/1.png';
	}
</script>

<a href="/{lang}/{data.slug}" class="blog-card">
	<div class="featured-image">
		<img src={data.featuredMedia} alt="" onerror={onLoadError} bind:this={cardImage} />
	</div>
	<div class="info">
		<div class="up">
			<span class="tag">{data.tag}</span>
			<p class="title">{data.title}</p>
		</div>
		<div class="short-desc">{@html data.shortDesc}</div>
	</div>
</a>
