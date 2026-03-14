<script lang="ts">
	import '$lib/styles/style.scss';
	import HeaderGlobal from '$lib/components/HeaderGlobal.svelte';
	import { onMount } from 'svelte';
	let { children, data } = $props();

	// GA4/GTM
	// const GA_ID = 'G-LND7NJ9NB6';
	// onMount(() => {
	// 	if (
	// 		document.querySelector(`script[src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"]`)
	// 	) {
	// 		return;
	// 	}

	// 	const script = document.createElement('script');
	// 	script.async = true;
	// 	script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
	// 	document.head.appendChild(script);

	// 	window.dataLayer = window.dataLayer || [];
	// 	window.gtag = function () {
	// 		window.dataLayer.push(arguments);
	// 	};

	// 	window.gtag('js', new Date());
	// 	window.gtag('config', GA_ID);
	// });
</script>

<HeaderGlobal t={data.translation.header} lang={data.lang} />
{@render children?.()}
