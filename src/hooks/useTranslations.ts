import { useState, useEffect, useCallback } from 'react';
import ptTranslations from '@/dictionaries/pt.json';
import enTranslations from '@/dictionaries/en.json';

type Language = 'pt' | 'en';
export type WorkExperience = { 
  id: number; 
  company: string; 
  period: string;
  role: string;
  description: string[];
};
export type Education = { 
  id: number; 
  school: string; 
  period: string;
  course: string;
  description: string[];
};

const translations = {
  pt: ptTranslations,
  en: enTranslations,
} as const;

export function useTranslations() {
  const [language, setLanguage] = useState<Language>('pt');
  const [dict, setDict] = useState(translations.pt);

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'pt';
    setLanguage(savedLang as Language);
    setDict(translations[savedLang as Language]);
  }, []);

  const changeLanguage = useCallback((newLang: Language) => {
    setLanguage(newLang);
    setDict(translations[newLang]);
    localStorage.setItem('lang', newLang);
  }, []);

  return {
    t: (key: keyof typeof ptTranslations): string => 
      typeof dict[key] === 'string' ? dict[key] as string : '',
    tWorkList: (key: 'work-experience-list'): WorkExperience[] => 
      Array.isArray(dict[key]) ? dict[key] as WorkExperience[] : [],
    tEducationList: (key: 'education-list'): Education[] => 
      Array.isArray(dict[key]) ? dict[key] as Education[] : [],
    language,
    changeLanguage,
  };
}