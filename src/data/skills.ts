export type SkillCategory = {
  id: string;
  label: { fr: string; en: string };
  items: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "dev",
    label: { fr: "Développement", en: "Development" },
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    id: "backend",
    label: { fr: "Backend / Data", en: "Backend / Data" },
    items: ["Node.js", "APIs", "Firebase", "Databases"],
  },
  {
    id: "iot",
    label: { fr: "IoT & Systèmes", en: "IoT & Systems" },
    items: ["ESP32", "Sensors", "MQTT", "IoT", "Automation", "Electronics"],
  },
  {
    id: "devops",
    label: { fr: "DevOps / Cloud", en: "DevOps / Cloud" },
    items: ["Git", "GitHub", "Docker", "Cloud", "CI/CD"],
  },
  {
    id: "ai",
    label: { fr: "IA & Productivité", en: "AI & Productivity" },
    items: ["AI-Assisted Dev", "Prompt Engineering", "LLM APIs", "AI Automation", "ChatGPT · Claude"],
  },
  {
    id: "security",
    label: { fr: "Cybersécurité", en: "Cybersecurity" },
    items: ["Networks", "Linux", "System Security", "Cybersecurity"],
  },
];
