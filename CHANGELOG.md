# Changelog

## [2026.10.7] - 2026-10-02
### Added
- Lien Ko-fi discret (`https://ko-fi.com/pouark`) dans le pied de page du nouvel onglet de l'extension ; capture de production régénérée avec le lien visible.
- `README_en.md` synchronisé avec le README français, lien Ko-fi inclus (référence manquante corrigée).

### Changed
- Passage du manifest au CalVer : `2026.10.7` (la fiche Chrome Web Store publiée reste en 2.1.3 jusqu'à la prochaine soumission).
- Politique de confidentialité conservée à `store/privacy-policy-mondary-new-tab.html` — URL publiée référencée par le manifest — avec copie d'archive dans `store/v1/`.
- Liens Chrome Web Store des README alignés sur l'URL canonique `detail/pk-new-tab/`.

## [2026.10.6] - 2026-10-02
### Added
- Capture verticale 1280 × 2050 du rendu de production du nouvel onglet, avec huit articles et leurs vignettes locales visibles ; script reproductible `scripts/capture-newtab.py` et panneau de preuve sur la landing.
- Boutons Ko-fi corail avec tasse/cœur dans la barre supérieure, le dock et les sections de capture et d'installation, tous reliés à `https://ko-fi.com/pouark`.

### Changed
- Aperçu interactif mobile agrandi pour montrer les quatre rangées de cartes en défilant la page, sans modifier l'extension.

## [2026.10.5] - 2026-10-02
### Changed
- Landing `store/website/` repensée comme un bureau sur le wallpaper pixel-art couvrant toute la page, inspiré de `.inspi/library/apps.html` : barre supérieure, raccourcis, dock et navigateur simulé à la place de Finder.
- Les explications et l'installation sont intégrées à des panneaux translucides sur le même fond ; la mosaïque de huit articles reste visible et interactive. Chargement immédiat des huit vignettes locales.

## [2026.10.4] - 2026-10-02
### Changed
- Landing `store/website/` : aperçu élargi à huit vignettes visibles en deux rangées de quatre sur desktop, fenêtre plus haute et cartes plus compactes ; aperçu mobile à deux colonnes.
- Nouvelle direction typographique et colorée : Space Grotesk variable locale pour les titres, Outfit conservée pour le corps, palette bleu brume / encre minérale / corail assortie au wallpaper.

## [2026.10.3] - 2026-10-02
### Added
- Nouvelle landing autonome dans `store/website/` : direction « atlas de découvertes », scène de navigateur interactive, fond pixel-art issu de premium-promo-media, huit articles et vignettes réels figés localement, contenu FR/EN et lien Chrome Web Store 2.1.3.

### Changed
- Archive des supports précédents : `store/v1/` (kit historique), `store/v2/` (landing et media-kit de la deuxième version). `store/website/` devient l'unique source éditable et le dossier FTP, sans génération destructrice.
- `scripts/website.sh` vérifie les ressources de la nouvelle landing sans la modifier.

## [2026.10.2] - 2026-10-02
### Changed
- Positionnement recalé sur le vrai sujet du blog : « chaque nouvel onglet, un
  nouvel outil à découvrir » (outils & pépites mondary.design, signature
  « Chercheur de pépites sur le net ») — headline, lede, fonctionnalités et
  fixtures de capture au format éditorial réel « OUTIL : bénéfice »
- Hero sombre premium sur fond d'écran de la bibliothèque commune du hub
  (abstract `74c0f12608ce`, dérivé flouté 98 Ko, traçabilité dans
  `store/assets/provenance.json`) ; bandeau soutien assorti
- **Démo interactive** dans le hero : navigateur simulé pilotable (bouton « + »
  nouvel onglet, cartes survolables/cliquables, article ouvert dans un onglet
  du mockup, ✕ pour fermer) ; sans JS → capture réelle affichée
- Bannière 1544×500 et card 1200×630 refaites (positionnement outils + fond)

### Fixed
- **Captures blanches / loading infini** (vu en revue) : en
  `--virtual-time-budget`, un setTimeout post-DOMContentLoaded ne tire jamais
  et le moteur d'animations CSS ne rend aucun état → mock synchrone + gel
  arithmétique inline (courbe ease calculée en JS). Le GIF passe de 22 % de
  loading à 0,4 s sur 7,2 s ; mosaïque et interactions dominent la boucle

## [2026.10.1] - 2026-10-02
### Added
- Landing store bilingue FR/EN (`store/index.html`) : hero avec cadre navigateur,
  cycle en 3 états réels, fonctionnalités vérifiées dans le code, installation,
  soutien Ko-fi — détection `navigator.languages` + bascule mémorisée, sans JS = FR
- Bundle FTP généré `store/website/` via `scripts/website.sh` (contenu déployable tel quel)
- Media kit complet : bannière 1544×500, card 1200×630, captures 1280×800 (+@2x, hover, loading),
  GIF large/compact, MP4 master/web — scène de capture réutilisant le code de production
  (`store/media-kit/`), scénario et limites documentés
- Polices Outfit (OFL) embarquées dans `store/assets/fonts/`

### Fixed
- Contraste AA : gris secondaire foncé, liens texte en bleu foncé, bouton Ko-fi outline

### Notes
- La description Chrome Web Store mentionne une « barre de recherche Google »
  absente du code : non reprise sur la landing (à corriger côté fiche store)
- `README_en.md` référencé par `README.md` mais inexistant (dette préexistante)

## [0.10] - 2026-10-02
### Added
- Initial project scaffold
