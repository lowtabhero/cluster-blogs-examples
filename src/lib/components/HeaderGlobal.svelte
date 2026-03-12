<script>
	import '$lib/styles/components/_header-global.scss';
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	let { t, lang } = $props();
	let langSelected = $derived(lang);

	$effect(() => {
		if (!browser) return;
		if (langSelected === lang) return;

		const urlParts = page.url.pathname.split('/');
		urlParts[1] = langSelected;
		const nextUrl = urlParts.join('/');
		goto(nextUrl);
	});
</script>

<header>
	<div class="wrapper">
		<a href="https://internal.stockscout.eu/{lang}" class="logo">
			<img src="/assets/icons/logo-header.svg" alt="Logo" />
		</a>
		<nav>
			<div class="links">
				<a href="https://examples.stockscout.eu/{lang}">{t.examplesLink}</a>
				<a href="https://internal.stockscout.eu/{lang}/#contacts">{t.contactsLink}</a>
			</div>
			<select name="lang" id="lang" class="language-selector" bind:value={langSelected}>
				<option value="en">EN</option>
				<option value="es">ES</option>
				<option value="ru">RU</option>
			</select>
		</nav>
	</div>
</header>
