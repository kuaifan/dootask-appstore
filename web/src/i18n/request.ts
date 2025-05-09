import {getRequestConfig} from 'next-intl/server';
import {cookies, headers} from 'next/headers';

export const locales = ['zh', 'zh-CHT', 'en', 'ko', 'ja', 'de', 'fr', 'id', 'ru'];

export const localeNames = {
  'zh': '简体中文',
  'zh-CHT': '繁體中文',
  'en': 'English',
  'ko': '한국어',
  'ja': '日本語',
  'de': 'Deutsch',
  'fr': 'Français',
  'id': 'Indonesia',
  'ru': 'Русский язык',
};

export default getRequestConfig(async () => {
  // 首先尝试从 cookies 获取用户设置的语言
  let locale = 'zh';
  
  try {
    const cookieStore = await cookies();
    const userLocale = cookieStore.get('locale')?.value;
    
    // 然后尝试从请求头中获取语言设置
    const headersList = await headers();
    const acceptLanguage = headersList.get('accept-language');
    
    // 按照优先级确定语言: cookies > accept-language 头 > 默认语言
    
    if (userLocale && locales.includes(userLocale)) {
      locale = userLocale;
    } else if (acceptLanguage) {
      // 简单解析 accept-language, 例如 'en-US,en;q=0.9,zh;q=0.8'
      const languages = acceptLanguage.split(',').map((lang: string) => lang.split(';')[0].trim());
      
      // 找到第一个匹配的语言
      for (const lang of languages) {
        const langCode = lang.split('-')[0]; // 获取主要语言代码
        const matchedLocale = locales.find(l => l === lang || l === langCode);
        if (matchedLocale) {
          locale = matchedLocale;
          break;
        }
      }
    }
  } catch (error) {
    console.error('获取语言设置出错:', error);
    // 出错时使用默认语言
  }

  return {
    locale,
    messages: (await import(`../languages/${locale}.json`)).default
  };
});
