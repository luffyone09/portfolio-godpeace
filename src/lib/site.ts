/* ============================================================
   CONFIGURATION DU SITE — tout se modifie ICI
   ============================================================ */

// URL publique du site (utilisez la variable d'environnement en prod)
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://godpeace-amoussou.vercel.app";

export const siteIdentity = {
  firstName: "God-Peace",
  lastName: "AMOUSSOU",
  logo: "GP.",
  photo: "/godpeace.jpg",
  // CV : déposez "cv.pdf" dans /public/ puis mettez "/cv.pdf" (null = bouton masqué)
  cv: null as string | null,
};

export const socials = {
  // Email utilisé partout (contact, mailto du formulaire, footer)
  email: "amoussoupeace266@gmail.com",
  // Laissez "" tant que non disponible — le lien sera masqué
  github: "",
  linkedin: "",
  whatsapp: "",
} as const;

/* ============================================================
   FORMULAIRE DE CONTACT
   Pour activer l'envoi réel, renseignez une des options :
   - Formspree :  "https://formspree.io/f/VOTRE_ID"
   - Resend :     votre propre endpoint API "/api/contact"
   - Firebase :   votre fonction callable
   Vide = fallback mailto (aucun faux "message envoyé").
   ============================================================ */
export const contactEndpoint = "";
