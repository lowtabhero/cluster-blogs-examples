export type Translation = {
  header: {
    examplesLink: string,
    contactsLink: string,
  }
}
export type Lang = 'en' | 'ru' | 'es';

export const acceptedLanguages: Array<Lang> = ['en', 'ru', 'es'];
export function isLang(lang: string): lang is Lang {
  return acceptedLanguages.includes(lang as Lang);
}

const langLoaders = {
  en: () => import('$lib/translations/en.js'),
  ru: () => import('$lib/translations/ru.js'),
  es: () => import('$lib/translations/es.js')
}

export async function loadDict(lang: Lang): Promise<Translation> {
  const load = langLoaders[lang] || langLoaders['en'];
  const module = await load();
  return module.translation;
}