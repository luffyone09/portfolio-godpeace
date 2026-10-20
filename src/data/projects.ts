export type Localized = { fr: string; en: string };

/* ============================================================
   PROJETS — ajoute simplement un objet ici.
   - `visual` : rendu du visuel (energy | platform | web)
   - `demoUrl` / `githubUrl` : null = bouton masqué
   ============================================================ */

export type Project = {
  id: string;
  index: string;
  name: Localized;
  description: Localized;
  tech: string[];
  visual: "energy" | "platform" | "web";
  demoUrl: string | null;
  githubUrl: string | null;
};

export const projects: Project[] = [
  {
    id: "energy",
    index: "01",
    name: {
      fr: "Système intelligent de gestion énergétique",
      en: "Smart Energy Management System",
    },
    description: {
      fr: "Système intelligent gérant plusieurs sources d'énergie (solaire, réseau SBEE, groupe électrogène) et optimisant automatiquement leur utilisation, avec supervision web.",
      en: "Intelligent system managing multiple energy sources (solar, SBEE grid, generator) with automatic optimization and web supervision.",
    },
    tech: ["ESP32", "IoT", "Sensors", "Automation", "Firebase", "Next.js"],
    visual: "energy",
    demoUrl: null,
    githubUrl: null,
  },
  {
    id: "saas",
    index: "02",
    name: {
      fr: "Solutions SaaS pour PME",
      en: "SaaS Solutions for SMBs",
    },
    description: {
      fr: "Solution numérique destinée à aider les petites et moyennes entreprises à centraliser leurs clients, commandes, communications et opérations.",
      en: "Digital solution helping small and medium businesses centralize their clients, orders, communications and operations.",
    },
    tech: ["SaaS", "Web", "Automation", "AI"],
    visual: "platform",
    demoUrl: null,
    githubUrl: null,
  },
  {
    id: "web",
    index: "03",
    name: {
      fr: "Sites Web modernes",
      en: "Modern Websites",
    },
    description: {
      fr: "Création de sites web modernes et responsives adaptés aux besoins des entreprises, entrepreneurs et projets personnels.",
      en: "Building modern, responsive websites tailored to businesses, entrepreneurs and personal projects.",
    },
    tech: ["Frontend", "UI/UX", "Responsive Design"],
    visual: "web",
    demoUrl: null,
    githubUrl: null,
  },
  {
    id: "savanna",
    index: "04",
    name: {
      fr: "Savanna — bibliothèque pédagogique intelligente",
      en: "Savanna — Smart educational library",
    },
    description: {
      fr: "Plateforme web centralisant cours, épreuves, TD, TP et corrigés expliqués étape par étape dans un langage simple, avec lecteur PDF intégré (zoom, pages, plein écran).",
      en: "Web platform centralizing courses, exams, tutorials and step-by-step corrections explained in plain language, with an integrated PDF reader (zoom, pages, fullscreen).",
    },
    tech: ["React", "Vite", "Tailwind CSS", "pdf.js", "TypeScript"],
    visual: "platform",
    demoUrl: "https://savanna-pedagogique.netlify.app",
    githubUrl: "https://github.com/luffyone09/savanna",
  },
];
