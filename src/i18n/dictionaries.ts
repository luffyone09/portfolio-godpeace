import type { Locale } from "./config";

import frCommon from "@/locales/fr/common.json";
import frHome from "@/locales/fr/home.json";
import frAbout from "@/locales/fr/about.json";
import frSkills from "@/locales/fr/skills.json";
import frProjects from "@/locales/fr/projects.json";
import frJourney from "@/locales/fr/journey.json";
import frProcess from "@/locales/fr/process.json";
import frContact from "@/locales/fr/contact.json";
import frFooter from "@/locales/fr/footer.json";
import frMeta from "@/locales/fr/meta.json";

import enCommon from "@/locales/en/common.json";
import enHome from "@/locales/en/home.json";
import enAbout from "@/locales/en/about.json";
import enSkills from "@/locales/en/skills.json";
import enProjects from "@/locales/en/projects.json";
import enJourney from "@/locales/en/journey.json";
import enProcess from "@/locales/en/process.json";
import enContact from "@/locales/en/contact.json";
import enFooter from "@/locales/en/footer.json";
import enMeta from "@/locales/en/meta.json";

export const fr = {
  common: frCommon,
  home: frHome,
  about: frAbout,
  skills: frSkills,
  projects: frProjects,
  journey: frJourney,
  process: frProcess,
  contact: frContact,
  footer: frFooter,
  meta: frMeta,
};

export const en = {
  common: enCommon,
  home: enHome,
  about: enAbout,
  skills: enSkills,
  projects: enProjects,
  journey: enJourney,
  process: enProcess,
  contact: enContact,
  footer: enFooter,
  meta: enMeta,
};

const dictionaries = { fr, en } as const;

export type Dictionary = typeof fr;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
