# Portfolio — God-Peace AMOUSSOU

Portfolio personnel premium : Next.js 15 · TypeScript · Tailwind CSS 4 · Framer Motion.
Multilingue (🇫🇷 / 🇬🇧, extensible), dark/light mode, SEO complet, animations respectant `prefers-reduced-motion`.

## Démarrer

```bash
npm run dev      # développement → http://localhost:3000 (redirige vers /fr)
npm run build    # build production (SSG /fr + /en)
npm start        # servir le build
```

## Personnaliser — tout se modifie dans 3 endroits

### 1. Identité & liens → `src/lib/site.ts`
- `photo` : photo pro (actuellement `/godpeace.jpg` dans `public/`)
- `cv` : dépose `cv.pdf` dans `public/` puis mets `"/cv.pdf"` (null = bouton masqué)
- `socials` : email (déjà configuré), GitHub, LinkedIn, WhatsApp (vides = liens masqués)
- `contactEndpoint` : URL Formspree / API Resend pour activer l'envoi réel du formulaire (vide = fallback `mailto:` honnête)

### 2. Contenu → `src/data/`
- `projects.ts` — projets (ajout libre ; `demoUrl`/`githubUrl` null = boutons masqués)
- `skills.ts` — catégories de compétences (liste pure, sans faux pourcentages)
- `experiences.ts` — timeline du parcours (badge, titre, période, description)
- `process.ts` — les 5 étapes de travail

### 3. Traductions → `src/locales/{fr,en}/`
Un JSON par section (`common`, `home`, `about`, `skills`, `projects`, `journey`, `process`, `contact`, `footer`, `meta`).
Pour ajouter une langue : créer `src/locales/es/` avec les mêmes fichiers, ajouter `"es"` dans `src/i18n/config.ts`, un entry dans `src/i18n/dictionaries.ts` et dans `generateStaticParams` + sitemap.

## SEO
- Titre/description/OG/Twitter par langue : `locales/{fr,en}/meta.json`
- hreflang + canonical : `src/app/[locale]/layout.tsx`
- `sitemap.xml` + `robots.txt` : générés (`src/app/sitemap.ts`, `robots.ts`)
- URL du site en prod : variable d'environnement `NEXT_PUBLIC_SITE_URL`

## Notes
- `scripts/write-locales.mjs` : régénère les fichiers de traduction de base (optionnel).
- Visuels des projets : illustrations SVG abstraites dans `src/components/Projects.tsx` — remplaçables par de vraies captures (`Image` + `src`).
