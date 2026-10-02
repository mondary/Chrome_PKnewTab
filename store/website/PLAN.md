# Website — nouvelle direction (2026-10-02)

Source éditable et déployable directement : `store/website/index.html`.
`store/v1/` conserve le kit historique ; `store/v2/` conserve intégralement la landing précédente et ses médias. Aucun build ne réécrit `store/website/`.

## Direction

**Sujet :** les découvertes d'outils sur mondary.design, pas une publication de « design » au sens étroit. **Public :** curieux d'outils et de productivité. **Action :** essayer la démonstration puis installer l'extension Chrome 2.1.3.

Palette actuelle : brume `#eaf1f3`, encre `#142b39`, bleu minéral `#284d64`, corail `#c2523d`, blanc `#fff`, gris bleuté `#526778`. Typo : Space Grotesk variable pour les titres et la marque, Outfit pour le texte et l'interface ; chiffres en monospace système. Les deux fontes sont locales.

Signature : le nouvel onglet surgit dans un « bureau de découvertes » devant un véritable wallpaper pixel-art crépusculaire de la bibliothèque premium-promo-media (`13995d87892a`). La fenêtre n'est **pas** une capture native de Chrome : c'est une simulation interactive clairement étiquetée. Elle montre désormais les **huit vignettes en deux rangées de quatre** sur desktop (deux colonnes sur mobile). Titres, liens et images viennent des huit articles réels figés le 2026-10-02. L'interface de l'extension n'est pas modifiée.

La référence `/.inspi/library/apps.html` inspire la composition : bureau plein écran, barre supérieure compacte, raccourcis et dock. Ici, le **wallpaper est le fond de toute la page** ; une fenêtre de navigateur remplace Finder. Les textes secondaires restent sur des panneaux translucides lisibles, sans section beige opaque. Le bureau est une mise en scène de la landing, pas une fonctionnalité macOS de l'extension.

## Storyboard

| Section | Promesse | Preuve / interaction | Mouvement | Mobile |
|---|---|---|---|---|
| Ouverture | « Le prochain outil utile est peut-être dans votre prochain onglet. » | slogan + CTA vérifié Chrome Web Store | titre discret | empilé |
| Bureau | ouvrir un nouvel onglet et découvrir les derniers articles | simulation navigateur, `+`, cartes, aperçu d'article et lien réel ; wallpaper local | une transition courte et finie ; jamais de boucle loading | fenêtre défilable en 2 colonnes |
| Une sélection qui bouge | 15 derniers articles, images à la une, clic | trois gestes correspondant au code source | aucun effet gratuit | cartes empilées |
| Installer | version 2.1.3 et confidentialité | CTA store, lien politique, Ko-fi | aucun | CTA large |

## Réception

- FR/EN : UI et métadonnées localisées ; titres des articles restent en français car c'est la langue du contenu source. FR lisible sans JS.
- Assets locaux : wallpaper, fontes, huit couvertures, logo. Pas de CDN ni de requête réseau nécessaire au rendu (les liens sortants restent réels).
- Capture verticale `screenshots/newtab-mosaic-1280x2050.png` : les huit articles apparaissent dans les trois colonnes et les trois rangées du CSS réel de l'extension, avec données et images locales figées. La démo interactive du bureau reste une simulation distincte.
- Ko-fi `https://ko-fi.com/pouark` : boutons corail à tasse/cœur dans la barre supérieure, le dock, le panneau de capture et l'installation.
- Démo : `+` restaure la mosaïque ; clic ouvre un aperçu local, Échap ou fermeture restaure la mosaïque ; lien « Lire l'article » mène au véritable article.
- Fond choisi : catalogue commun `13995d87892a`, pas une capture du produit ; original conservé localement, dérivé JPEG optimisé. Provenance dans `assets/provenance.json`.
- 390/768/1440/1920, clavier, réduction du mouvement et contrôles FR/EN à vérifier. Aucune mise en ligne demandée.
