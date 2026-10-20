export type JourneyEntry = {
  id: string;
  badge: { fr: string; en: string };
  title: { fr: string; en: string };
  period: string;
  description: { fr: string; en: string };
};

/* ============================================================
   PARCOURS — données réelles (source : CV)
   ============================================================ */

export const journeyEntries: JourneyEntry[] = [
  {
    id: "bepc",
    badge: { fr: "Scolarité", en: "Education" },
    title: {
      fr: "Obtention du BEPC",
      en: "Junior High School Certificate (BEPC)",
    },
    period: "2017 — 2018",
    description: {
      fr: "Fin du premier cycle secondaire et ouverture vers les matières scientifiques et techniques.",
      en: "Completion of junior high school and opening up to scientific and technical subjects.",
    },
  },
  {
    id: "cap-el",
    badge: { fr: "Diplôme technique", en: "Technical diploma" },
    title: {
      fr: "Obtention du CAP EL — Électricité",
      en: "CAP EL — Electricity vocational certificate",
    },
    period: "2020 — 2021",
    description: {
      fr: "Premier diplôme technique : bases solides en installation et maintenance électrique, confort et sécurité.",
      en: "First technical diploma: solid foundations in electrical installation and maintenance, comfort and safety.",
    },
  },
  {
    id: "bac-f3",
    badge: { fr: "Diplôme technique", en: "Technical diploma" },
    title: {
      fr: "Obtention du Baccalauréat F3 — Électrotechnique",
      en: "High School Diploma (F3) — Electrotechnics",
    },
    period: "2022 — 2023",
    description: {
      fr: "Baccalauréat technique en électrotechnique : électricité, électronique de puissance et machines électriques. Cap vers l'enseignement supérieur technique.",
      en: "Technical high school diploma in electrotechnics: electricity, power electronics and electrical machines. Headed for technical higher education.",
    },
  },
  {
    id: "l1-iim",
    badge: { fr: "Université", en: "University" },
    title: {
      fr: "1ère année — Informatique Industrielle et Maintenance (IIM)",
      en: "1st year — Industrial Computing & Maintenance (IIM)",
    },
    period: "2023 — 2024",
    description: {
      fr: "Début du cursus à l'Université Catholique de l'Afrique de l'Ouest (UCAO) : informatique, électronique, automatisme et systèmes industriels.",
      en: "Started the program at the Catholic University of West Africa (UCAO): computing, electronics, automation and industrial systems.",
    },
  },
  {
    id: "l2-iim",
    badge: { fr: "Université", en: "University" },
    title: {
      fr: "2ème année — Informatique Industrielle et Maintenance (IIM)",
      en: "2nd year — Industrial Computing & Maintenance (IIM)",
    },
    period: "2024 — 2025",
    description: {
      fr: "Approfondissement à l'UCAO : programmation, réseaux, maintenance industrielle et premiers projets pratiques appliqués.",
      en: "Advanced coursework at UCAO: programming, networks, industrial maintenance and first practical hands-on projects.",
    },
  },
  {
    id: "l3-iim",
    badge: { fr: "Université", en: "University" },
    title: {
      fr: "3ème année — Informatique Industrielle et Maintenance (IIM)",
      en: "3rd year — Industrial Computing & Maintenance (IIM)",
    },
    period: "2025 — 2026",
    description: {
      fr: "Année en cours à l'UCAO : spécialisation avancée, projets techniques (IoT, supervision) et préparation du projet de fin d'études.",
      en: "Current final year at UCAO: advanced specialization, technical projects (IoT, supervision) and preparation of the final-year project.",
    },
  },
];
