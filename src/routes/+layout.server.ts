import { redirect } from '@sveltejs/kit';
import { loadDict } from '$lib';

export async function load({ params }) {
  const acceptedLanguages = ['en', 'ru', 'es'];
  if (!acceptedLanguages.includes(params.lang)) redirect(301, '/en');
  const translation = await loadDict(params.lang);

  return {
    lang: params.lang,
    translation: translation
  };
}