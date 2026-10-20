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
  cv: "/cv.pdf",
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
   FORMULAIRE DE CONTACT — activé via /api/contact (Resend)
   Il suffit de définir la variable d'environnement RESEND_API_KEY
   (resend.com). Sans clé, le formulaire retombe automatiquement
   sur le client email (mailto). CONTACT_EMAIL (optionnel) change
   la boîte de réception.
   ============================================================ */
export const contactEndpoint = "/api/contact";