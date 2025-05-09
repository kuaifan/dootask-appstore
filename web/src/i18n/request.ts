import {getRequestConfig} from 'next-intl/server';

export const locales = ['zh', 'zh-CHT', 'en', 'ko', 'ja', 'de', 'fr', 'id', 'ru'];

export default getRequestConfig(async () => {
  let locale = 'zh';

  if (!locales.includes(locale)) {
    locale = locales[0];
  }

  return {
    locale,
    messages: (await import(`../languages/${locale}.json`)).default
  };
});
