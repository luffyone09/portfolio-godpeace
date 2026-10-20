export type JourneyEntry = {
  id: string;
  badge: { fr: string; en: string };
  title: { fr: string; en: string };
  period: string;
  description: { fr: string; en: string };
};

export const journeyEntries: JourneyEntry[] = [
  {
    id: "cep",
    badge: { fr: "Scolarité", en: "Education" },
    title: {
      fr: "CEP — Certificat d'Études Primaires",
      en: "CEP — Primary School Certificate",
    },
    period: "2015",
    description: {
      fr: "Début de mon parcours scolaire et construction de mes premières bases académiques.",
      en: "The start of my schooling and the building of my first academic foundations.",
    },
  },
  {
    id: "bepc",
    badge: { fr: "Scolarité", en: "Education" },
    title: {
      fr: "BEPC — Brevet d'Études du Premier Cycle",
      en: "BEPC — Junior High School Certificate",
    },
    period: "2019",
    description: {
      fr: "Poursuite de mon parcours secondaire et développement de ma curiosité pour les sciences et les technologies.",
      en: "Continued secondary education, where my curiosity for science and technology grew.",
    },
  },
  {
    id: "bac",
    badge: { fr: "Scolarité", en: "Education" },
    title: { fr: "Baccalauréat", en: "High School Diploma" },
    period: "2023",
    description: {
      fr: "Une étape importante qui m'a permis de m'orienter vers un domaine technique et informatique.",
      en: "A key milestone that led me toward a technical and computer-science track.",
    },
  },
  {
    id: "licence",
    badge: { fr: "Formation", en: "Studies" },
    title: {
      fr: "Licence Professionnelle — Informatique Industrielle et Maintenance (IIM)",
      en: "Professional Bachelor's Degree — Industrial Computing & Maintenance (IIM)",
    },
    period: "2023",
    description: {
      fr: "UCAO-UUC — École du Génie Électrique et Informatique. Début d'une spécialisation en informatique industrielle, électronique, automatisme, systèmes embarqués et maintenance.",
      en: "UCAO-UUC — School of Electrical and Computer Engineering. Specializing in industrial computing, electronics, automation, embedded systems and maintenance.",
    },
  },
  {
    id: "skills-2024",
    badge: { fr: "Compétences", en: "Skills" },
    title: {
      fr: "Approfondissement technique",
      en: "Deepening technical skills",
    },
    period: "2024",
    description: {
      fr: "Informatique industrielle, électronique, automatisme, programmation, systèmes embarqués, maintenance et réseaux informatiques — avec les premiers projets pratiques en application directe de la formation.",
      en: "Industrial computing, electronics, automation, programming, embedded systems, maintenance and computer networks — with the first hands-on projects applying what I learned.",
    },
  },
  {
    id: "projects-2025",
    badge: { fr: "Projets", en: "Projects" },
    title: {
      fr: "Projets et expériences pratiques",
      en: "Hands-on projects",
    },
    period: "2025",
    description: {
      fr: "Développement de projets mêlant informatique, automatisation, IoT et développement web. Intérêt croissant pour la création de solutions numériques et de projets personnels.",
      en: "Building projects mixing computing, automation, IoT and web development. A growing interest in creating digital solutions and personal projects.",
    },
  },
  {
    id: "pfe",
    badge: { fr: "Projet", en: "Project" },
    title: {
      fr: "Projet de fin de formation — Système intelligent de gestion énergétique (IoT)",
      en: "Final year project — Smart IoT-based energy management system",
    },
    period: "2026",
    description: {
      fr: "Conception d'un système gérant intelligemment plusieurs sources d'énergie (solaire, SBEE, groupe électrogène) : ESP32, capteurs, relais, IoT, automatisation, supervision web et analyse des données.",
      en: "Designing a system that intelligently manages multiple energy sources (solar, SBEE grid, generator): ESP32, sensors, relays, IoT, automation, web supervision and data analysis.",
    },
  },
  {
    id: "horizons",
    badge: { fr: "Objectifs", en: "Goals" },
    title: {
      fr: "Vers de nouveaux horizons",
      en: "Toward new horizons",
    },
    period: "2026",
    description: {
      fr: "Développement continu : web, SaaS, IoT, cloud, DevOps, réseaux et cybersécurité. Objectif : transformer mes connaissances techniques en solutions numériques concrètes, modernes et utiles.",
      en: "Continuous growth: web, SaaS, IoT, cloud, DevOps, networks and cybersecurity. Goal: turn my technical knowledge into concrete, modern and useful digital solutions.",
    },
  },
];
