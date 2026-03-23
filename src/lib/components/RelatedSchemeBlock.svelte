<script lang="ts">
	import '$lib/styles/components/_related-scheme-block.scss';
	import type { NormalizedBlog } from '$lib/NormalizedBlogType.js';
	let {
		blog,
		currentBlogId,
		lang,
		isPillar
	}: { blog: NormalizedBlog; currentBlogId: number; lang: string; isPillar: boolean } = $props();
</script>

<div class="related-scheme-block {blog.id === currentBlogId ? 'current' : ''}">
	{#if isPillar}
		<span class="tag">Pillar</span>
	{:else}
		<span class="tag">Cluster</span>
	{/if}
	<a
		href="/{lang}/{blog.slug}"
		target="_blank"
		rel="noreferrer noopener"
		class={isPillar ? 'pillar' : ''}
	>
		{blog.title}
	</a>
</div>
