> Archive v2 : les chemins citant `store/` dans ce document désignent désormais `store/v2/`. Le nouveau site autonome est `store/website/`.

# Media kit — PK New Tab v2.1.3

Régénération complète des captures et animations de la landing store.
Tout est déterministe : mêmes commandes, mêmes rendus.

## Sources

- Rendu : **code de production inchangé**
  (`../../src/newtab.css` + `../../src/newtab.js`, chargés par chemins relatifs).
- Données : 15 outils **fictifs** au format éditorial réel du blog
  (« OUTIL : le bénéfice », vignettes SVG data-URI, dates fixes — aucune donnée réelle).
- Logo : copie de `src/logo.png`.
- Police Outfit (OFL) : `../assets/fonts/outfit-var*.woff2` (Google Fonts, variable).
- Fond d'écran : bibliothèque commune du hub — voir `../assets/provenance.json`
  (abstract sombre `74c0f12608ce`, dérivé flouté `hero-bg.jpg`, arrière-plan uniquement).

## Ponts de capture et limites

`capture-scene.html` mocke `chrome.runtime.sendMessage` (le service worker de
l'extension ne tourne pas hors Chrome). Paramètres d'URL :

| Paramètre | Rôle |
|-----------|------|
| `mode=loading` | mock **muet** → écran LOADING maintenu indéfiniment |
| `mode=cards` | mock **synchrone** → mosaïque insérée avant le premier paint |
| `at=<ms>` | gel arithmétique des animations (courbe `ease` calculée en JS, posée inline) |
| `lift=<px>` (+ `hover=<idx>`) | survol simulé — interpolation de la règle `:hover` réelle (max `-5px`) |
| `cursor=x,y` (+`pressed=1`) | curseur de démonstration (n'existe pas dans le produit) |
| `probe=1` | expose le centre de la carte survolée dans `<title>` |

### ⚠️ Leçons apprises (temps virtuel headless)

1. Un `setTimeout` posé **après DOMContentLoaded ne tire jamais** en
   `--virtual-time-budget` : le mock répond donc de façon synchrone
   (`delay=0` était le seul délai qui fonctionnait ; `delay>0` = loading éternel).
2. Le moteur d'animations CSS ne rend **aucun état** en temps virtuel (pause sur
   animation *pending* = style de base `opacity:0`, page blanche) : le gel calcule
   l'état avec la vraie courbe `cubic-bezier(0.25, 0.1, 0.25, 1)` et le pose en
   styles inline depuis un MutationObserver (microtask, avant le premier paint).
3. Un attribut `hidden` est neutralisé par un `display:block` CSS plus spécifique.

## Commandes

```sh
# Tout régénérer (screenshots, 72 frames, GIFs, MP4) :
sh store/media-kit/capture.sh

# Bannière / card sociale :
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars --window-size=1544,500 \
  --virtual-time-budget=4000 \
  --screenshot=../assets/banner-1544x500.png banner-scene.html

# Vérifier l'absence d'overflow responsive (390/768/1440/1920) :
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --allow-file-access-from-files \
  --window-size=4600,1000 --virtual-time-budget=6000 \
  --dump-dom check-overflow.html   # → <title>CHECK 390:ok …</title>

# Previews de la landing (rendu statique complet) :
sh ../../scripts/website.sh   # bundle à jour dans ../website/
for w in 390 768 1440 1920; do
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
    --headless=new --disable-gpu --hide-scrollbars --window-size=$w,3000 \
    --virtual-time-budget=5000 \
    --screenshot="landing-previews/landing-$w.png" \
    "../website/index.html?noreveal"
done
```

`?noreveal` désactive l'apparition au scroll (le mode virtual-time du headless
fige les transitions CSS à leur état initial).

## Scénario de la boucle (72 frames × 100 ms — 7,2 s)

Loading **court** (f00–f03, 0,4 s : une transition, pas un bug) → mosaïque
`fadeInUp` (f04–f11) → le curseur traverse vers la carte n°1 (f12–f21) →
survol interpolé puis tenu (f22–f27) → clic (f28–f29) → relâche (f30–f35) →
descente vers la carte n°4 avec retombée de l'élévation (f36–f41) → second
survol + clic (f42–f49) → le curseur sort du cadre (f50–f63) → mosaïque
stable, sans curseur (f64–f71). La mosaïque occupe ~90 % de la boucle.

## Démo interactive de la landing

Le hero embarque un navigateur simulé pilotable (bouton « + » = nouvel onglet,
cartes survolables/cliquables, article qui s'ouvre dans un onglet du mockup).
Sans JS, le mockup affiche la capture réelle (`sim-poster`). Les données de la
démo sont identiques aux fixtures de capture (mêmes outils fictifs).

## Revue visuelle — EN ATTENTE

Les contrôles automatisés (dimensions, poids, DOM rendu, overflow, contraste,
diff pixel hover/curseur, cartes de densité ASCII) sont passés. La
**relecture humaine** reste à faire : ouvrir `store/website/index.html`
(et `landing-previews/landing-*.png`).
