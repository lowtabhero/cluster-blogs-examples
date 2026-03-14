import { redirect } from '@sveltejs/kit';
import { isLang, loadDict } from '$lib/translations/translationsType.js';

export async function load({ params }) {
  const lang = params.lang;
  if (!isLang(lang)) redirect(301, '/en');

  const translation = await loadDict(lang);

  return {
    lang: lang,
    translation: translation
  };
}