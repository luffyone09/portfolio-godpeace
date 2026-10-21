export type ProcessStep = {
  id: string;
  title: { fr: string; en: string };
  description: { fr: string; en: string };
};

export const processSteps: ProcessStep[] = [
  {
    id: "understand",
    title: { fr: "Comprendre", en: "Understand" },
    description: {
      fr: "Analyser le besoin, le contexte et les contraintes avant toute ligne de code.",
      en: "Analyze the need, context and constraints before writing any code.",
    },
  },
  {
    id: "design",
    title: { fr: "Concevoir", en: "Design" },
    description: {
      fr: "Structurer l'architecture, l'expérience et les interfaces, sur le papier d'abord.",
      en: "Structure the architecture, experience and interfaces — on paper first.",
    },
  },
  {
    id: "build",
    title: { fr: "Développer", en: "Build" },
    description: {
      fr: "Coder proprement en petites itérations testables, avec l'IA comme accélérateur : revue, tests, documentation et automatisation.",
      en: "Write clean code in small testable iterations, with AI as an accelerator: review, tests, documentation and automation.",
    },
  },
  {
    id: "test",
    title: { fr: "Tester", en: "Test" },
    description: {
      fr: "Vérifier le comportement réel sur le matériel et en conditions réelles.",
      en: "Verify real behavior on the hardware and in real conditions.",
    },
  },
  {
    id: "deploy",
    title: { fr: "Déployer", en: "Deploy" },
    description: {
      fr: "Mettre en production, surveiller, puis améliorer en continu.",
      en: "Ship to production, monitor, then keep improving.",
    },
  },
];
