import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const fr = {
  "common.json": {
    nav: {
      home: "Accueil",
      about: "À propos",
      skills: "Compétences",
      projects: "Projets",
      experience: "Expérience",
      journey: "Parcours",
      contact: "Contact",
    },
    actions: {
      contactMe: "Me contacter",
      viewProjects: "Voir mes projets",
      send: "Envoyer le message",
      skipToContent: "Aller au contenu",
    },
    availability: { badge: "Disponible pour des projets" },
    theme: { toggle: "Changer de thème", light: "Thème clair", dark: "Thème sombre" },
    lang: { label: "Langue", fr: "Français", en: "English" },
    menu: { open: "Ouvrir le menu", close: "Fermer le menu" },
    scroll: { indicator: "Défiler" },
  },
  "home.json": {
    hero: {
      title: "Je transforme des idées en expériences numériques intelligentes.",
      subtitle: "Développeur orienté web, IoT, automatisation et systèmes intelligents.",
      ctaProjects: "Voir mes projets",
      ctaContact: "Me contacter",
    },
    visual: { label: "Code · Cloud · IoT · Automatisation · Sécurité" },
  },
  "about.json": {
    tag: "À propos",
    title: "À propos de moi",
    paragraphs: [
      "Je suis God-Peace AMOUSSOU, passionné par les technologies numériques, le développement logiciel et les systèmes intelligents.",
      "Mon parcours en informatique industrielle et maintenance m'a permis de développer une approche combinant programmation, électronique, automatisation et systèmes connectés.",
      "Je m'intéresse particulièrement au développement web, à l'IoT, au cloud, à l'automatisation et à la cybersécurité.",
    ],
    photoAlt: "Photo professionnelle de God-Peace AMOUSSOU",
    cvButton: "Télécharger mon CV",
    cvUnavailable: "CV bientôt disponible",
  },
  "skills.json": {
    tag: "Compétences",
    title: "Ce avec quoi je construis",
    subtitle: "Organisées par domaine — une base solide, en constante évolution.",
  },
  "projects.json": {
    tag: "Projets",
    title: "Projets sélectionnés",
    subtitle: "Des projets qui reflètent mon univers : web, IoT et systèmes intelligents.",
    viewProject: "Voir le projet",
    viewOnGithub: "Voir sur GitHub",
    soon: "Bientôt disponible",
  },
  "journey.json": {
    tag: "Parcours",
    title: "Mon parcours",
    subtitle: "FORMATION · EXPÉRIENCES · PROJETS IMPORTANTS",
    empty: "Le détail de mon parcours (formations, stages, expériences) sera ajouté prochainement.",
  },
  "process.json": {
    tag: "Processus",
    title: "Ma façon de travailler",
    subtitle: "Une méthode simple et rigoureuse, du besoin au déploiement.",
    steps_title: "Étape",
  },
  "contact.json": {
    tag: "Contact",
    title: "Construisons quelque chose ensemble.",
    subtitle: "Un projet, une question, une opportunité ? Écrivez-moi, je réponds dès que possible.",
    form: {
      name: "Nom",
      email: "Email",
      subject: "Sujet",
      message: "Message",
      namePlaceholder: "Votre nom",
      emailPlaceholder: "votre@email.com",
      subjectPlaceholder: "De quoi s'agit-il ?",
      messagePlaceholder: "Décrivez votre projet ou votre idée…",
      submit: "Envoyer le message",
      sending: "Envoi en cours…",
      required: "Champ requis",
      invalidEmail: "Adresse email invalide",
      success: "Message envoyé. Merci, je vous réponds dès que possible.",
      error: "L'envoi a échoué. Vous pouvez m'écrire directement par email.",
      notConfigured: "L'envoi n'est pas encore configuré — utilisez l'email ci-dessous.",
      mailtoNote: "Votre application e-mail s'est ouverte avec le message pré-rempli.",
    },
    direct: { title: "En direct", emailLabel: "Email" },
    copyEmail: "Copier l'adresse email",
    emailCopied: "Copié !",
  },
  "footer.json": {
    tagline: "Développement • IoT • Automatisation • Innovation",
    rights: "Tous droits réservés.",
    builtWith: "Conçu et développé avec soin.",
  },
  "meta.json": {
    title: "God-Peace AMOUSSOU — Développeur Web & Ingénieur IoT",
    description:
      "Portfolio de God-Peace AMOUSSOU — développeur web orienté IoT, automatisation et systèmes intelligents. Projets, compétences et parcours.",
    ogAlt: "God-Peace AMOUSSOU — Développeur Web & Ingénieur IoT",
  },
};

const en = {
  "common.json": {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      journey: "Journey",
      contact: "Contact",
    },
    actions: {
      contactMe: "Contact me",
      viewProjects: "View my projects",
      send: "Send message",
      skipToContent: "Skip to content",
    },
    availability: { badge: "Available for projects" },
    theme: { toggle: "Toggle theme", light: "Light theme", dark: "Dark theme" },
    lang: { label: "Language", fr: "Français", en: "English" },
    menu: { open: "Open menu", close: "Close menu" },
    scroll: { indicator: "Scroll" },
  },
  "home.json": {
    hero: {
      title: "I transform ideas into intelligent digital experiences.",
      subtitle: "Developer focused on web development, IoT, automation and intelligent systems.",
      ctaProjects: "View my projects",
      ctaContact: "Contact me",
    },
    visual: { label: "Code · Cloud · IoT · Automation · Security" },
  },
  "about.json": {
    tag: "About",
    title: "About me",
    paragraphs: [
      "I am God-Peace AMOUSSOU, passionate about digital technologies, software development and intelligent systems.",
      "My background in industrial computing and maintenance has led me to an approach combining programming, electronics, automation and connected systems.",
      "I am particularly interested in web development, IoT, cloud, automation and cybersecurity.",
    ],
    photoAlt: "Professional photo of God-Peace AMOUSSOU",
    cvButton: "Download my CV",
    cvUnavailable: "CV coming soon",
  },
  "skills.json": {
    tag: "Skills",
    title: "What I build with",
    subtitle: "Organized by domain — a solid, ever-growing foundation.",
  },
  "projects.json": {
    tag: "Projects",
    title: "Selected projects",
    subtitle: "Projects that reflect my world: web, IoT and intelligent systems.",
    viewProject: "View project",
    viewOnGithub: "View on GitHub",
    soon: "Coming soon",
  },
  "journey.json": {
    tag: "Journey",
    title: "My journey",
    subtitle: "EDUCATION · EXPERIENCES · KEY PROJECTS",
    empty: "Details about my journey (education, internships, experiences) will be added soon.",
  },
  "process.json": {
    tag: "Process",
    title: "How I work",
    subtitle: "A simple, rigorous method — from idea to deployment.",
    steps_title: "Step",
  },
  "contact.json": {
    tag: "Contact",
    title: "Let's build something together.",
    subtitle: "A project, a question, an opportunity? Write to me, I reply as soon as I can.",
    form: {
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      namePlaceholder: "Your name",
      emailPlaceholder: "you@email.com",
      subjectPlaceholder: "What is it about?",
      messagePlaceholder: "Describe your project or idea…",
      submit: "Send message",
      sending: "Sending…",
      required: "Required field",
      invalidEmail: "Invalid email address",
      success: "Message sent. Thank you, I will reply as soon as possible.",
      error: "Sending failed. You can email me directly instead.",
      notConfigured: "Sending is not configured yet — please use the email below.",
      mailtoNote: "Your email app opened with the pre-filled message.",
    },
    direct: { title: "Direct line", emailLabel: "Email" },
    copyEmail: "Copy email address",
    emailCopied: "Copied!",
  },
  "footer.json": {
    tagline: "Development • IoT • Automation • Innovation",
    rights: "All rights reserved.",
    builtWith: "Designed & built with care.",
  },
  "meta.json": {
    title: "God-Peace AMOUSSOU — Web Developer & IoT Engineer",
    description:
      "God-Peace AMOUSSOU's portfolio — web developer focused on IoT, automation and intelligent systems. Projects, skills and journey.",
    ogAlt: "God-Peace AMOUSSOU — Web Developer & IoT Engineer",
  },
};

for (const [dir, files] of [["fr", fr], ["en", en]]) {
  const dirPath = join(root, "src", "locales", dir);
  mkdirSync(dirPath, { recursive: true });
  for (const [name, content] of Object.entries(files)) {
    writeFileSync(join(dirPath, name), JSON.stringify(content, null, 2) + "\n", "utf8");
  }
}
console.log("locales rewritten (UTF-8)");
