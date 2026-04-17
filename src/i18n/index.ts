import type { Translations } from './en';
import { translations as en } from './en';
import { translations as it } from './it';
import { translations as de } from './de';
import { translations as es } from './es';
import { translations as fr } from './fr';

const all: Record<string, Translations> = { en, it, de, es, fr };

export function useTranslations(lang: string): Translations {
  return all[lang] ?? all.en;
}
