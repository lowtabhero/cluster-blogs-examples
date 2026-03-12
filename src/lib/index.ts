const langLoaders = {
  en: () => import('$lib/translations/en.js'),
  ru: () => import('$lib/translations/ru.js'),
  es: () => import('$lib/translations/es.js')
}

export async function loadDict(lang) {
  const load = langLoaders[lang] || langLoaders['en'];
  const module = await load(lang);
  return await module.translation;
}