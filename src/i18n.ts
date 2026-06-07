/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import koTranslation from './locales/ko.json';
import enTranslation from './locales/en.json';

const resources = {
  ko: {
    translation: koTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

// Detect language by looking up pathname first, then localStorage, then browser settings
export const detectInitialLanguage = (): 'ko' | 'en' => {
  const path = window.location.pathname;
  if (path.startsWith('/en')) {
    return 'en';
  }
  if (path.startsWith('/ko')) {
    return 'ko';
  }

  const savedLang = localStorage.getItem('lang') as 'ko' | 'en' | null;
  if (savedLang === 'ko' || savedLang === 'en') {
    return savedLang;
  }

  const browserLang = (window.navigator.language || '').toLowerCase();
  if (browserLang.startsWith('ko')) {
    return 'ko';
  }
  return 'en';
};

const initialLanguage = detectInitialLanguage();

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage,
    fallbackLng: 'ko',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

// Store selection in localStorage and update URL pathname to match language if needed
export const syncLanguageUrl = (lng: string) => {
  localStorage.setItem('lang', lng);
  
  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;
  
  if (lng === 'en') {
    if (!currentPath.startsWith('/en')) {
      const baseClean = currentPath.replace(/^\/(en|ko)/, '') || '/';
      const newPath = '/en' + (baseClean === '/' ? '' : baseClean);
      window.history.pushState(null, '', newPath + currentHash);
    }
  } else {
    if (currentPath.startsWith('/en') || currentPath.startsWith('/ko')) {
      const baseClean = currentPath.replace(/^\/(en|ko)/, '') || '/';
      window.history.pushState(null, '', baseClean + currentHash);
    }
  }
};

// Initial sync on module load
syncLanguageUrl(initialLanguage);

export default i18n;
