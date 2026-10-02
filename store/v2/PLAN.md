# Plan — Landing store « PK New Tab » (v2.1.3)

Dossier de sortie : `store/` (source landing) + bundle généré `store/website/`.
L'ancien kit vit dans `store/v1/` (inchangé).

## Cadrage produit (vérifié dans le code ET sur le blog)

Extension Chrome MV3, version **2.1.3** (confirmée publiée sur le Chrome Web Store le
2 juillet 2026 — même version que `src/manifest.json`).

Positionnement éditorial vérifié sur mondary.design le 2026-10-02 :
« **Chercheur de pépites sur le net** » — le blog présente des **outils**
(« OUTIL : le bénéfice », catégories Tools/IA/Productivity). La landing parle
donc d'outils à découvrir, pas de design.

Fonctions **réellement implémentées** (src/newtab.{html,js,css}, background.js) :

- Mosaïque des 15 derniers articles de mondary.design (WordPress REST API,
  fallback RSS silencieux via service worker).
- Vignettes à la une (`jetpack_featured_media_url` → tailles WP → logo).
- Animation de chargement « LOADING » lettre par lettre (Outfit).
- Apparition des cartes `fadeInUp`, hover élévation, clic → ouverture dans un
  nouvel onglet (`noopener`).
- Footer signature géant coupé.

**Non implémenté** (exclu de la landing, bien que présent dans la description
store actuelle) : la « barre de recherche Google intégrée » n'existe pas dans le
code. À corriger côté description store séparément.

Fiche store (CTA vérifié) :
https://chromewebstore.google.com/detail/mondary-new-tab/boeenonaijkccialgfaeipkhfhnnpfmd

## Storyboard v2 (retour utilisateur intégré)

| # | Section | Promesse | Contenu | Mouvement | Mobile |
|---|---------|----------|---------|-----------|--------|
| 1 | Hero sombre | « Chaque nouvel onglet, un nouvel outil à découvrir. » | Fond d'écran bibliothèque (abstract nuit `74c0f12608ce`) + **démo interactive** : navigateur simulé, bouton « + » nouvel onglet, cartes cliquables, article qui s'ouvre | reveal doux ; démo auto-play 1× visible puis pilotable | démo pleine largeur |
| 2 | Le cycle | 3 temps : balayage → mosaïque → découverte | captures réelles (loading/mosaic/hover) | stagger discret | empilé |
| 3 | Fonctionnalités | le raccourci vers les pépites | 4 fonctions réelles | — | liste |
| 4 | Installation | CTA store v2.1.3 + option dev | — | — | CTA collant bas |
| 5 | Soutien (bandeau sombre) | Ko-fi | même fond d'écran | — | — |

Bilingue FR/EN dans un seul fichier : détection `navigator.languages` (première
langue prise en charge), bascule manuelle prioritaire mémorisée (`localStorage`),
défaut FR, sans JS → FR complet + capture réelle en hero.

## Ponts de capture et limites (documentés dans media-kit/README.md)

- `chrome.runtime.sendMessage` mocké : réponse **synchrone** (le temps virtuel
  headless ne tire jamais un setTimeout post-DOMContentLoaded), mock muet pour
  l'écran LOADING. Rendu par `src/newtab.js`/`newtab.css` **inchangés**.
- Gel d'animation **arithmétique** (courbe ease calculée en JS, posée inline) :
  le moteur d'animations CSS ne rend rien en temps virtuel.
- Hover simulé par interpolation de la règle `:hover` réelle ; curseur de
  démonstration overlay (n'existe pas dans le produit).
- Fixtures : 15 outils fictifs au format « OUTIL : bénéfice ».
- Boucle GIF/MP4 : 72 frames, loading limité à 0,4 s (≈5 %) — corrige le
  « chargement qui boucle sans rien afficher » vu en revue v1.

## Livrables

- `store/index.html` — landing bilingue (source de vérité)
- `store/website/` — bundle FTP généré par `scripts/website.sh`
- `store/assets/` — bannière 1544×500, card 1200×630, fonts Outfit (OFL),
  wallpaper + dérivé (`provenance.json` pour la traçabilité)
- `store/screenshots/` — captures 16:10 + @2x + hover + loading
- `store/gifs/` — large 1280×800 + compact 640×400
- `store/videos/` — master 2560×1600 + web 1280×800
- `store/media-kit/` — scènes, scripts, README de régénération

## Critères de réception

- Bundle initial < 1,5 Mo, GIF large < 3 Mo (mesurés).
- Responsive 390/768/1440/1920 sans overflow, clavier, contraste AA/AAA,
  bascule FR/EN, `prefers-reduced-motion`.
- Liens réels uniquement : fiche store complète, mondary.design,
  confidentialité GitHub Pages, https://ko-fi.com/pouark.
- Frames des fichiers finaux (GIF/MP4) vérifiées par extraction.
- **Revue visuelle humaine : EN ATTENTE** — ouvrir `store/website/index.html`
  (previews : `store/media-kit/landing-previews/`).
