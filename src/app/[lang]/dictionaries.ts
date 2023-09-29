import { locales } from '@/middleware';
import 'server-only';

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  ko: () => import('@/dictionaries/en.json').then((module) => module.default),
};

export const getDictionary = async (locale?: keyof typeof dictionaries) =>
  dictionaries[locale ?? locales[0]]();

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
