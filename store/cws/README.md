# Kit média — Chrome Web Store

Visuels prêts à téléverser dans la fiche Chrome Web Store de PK New Tab.
`manifest.json` sert d'index : il associe chaque fichier à son format et à sa source.

| Fichier | Format | Rôle | Source |
|---------|--------|------|--------|
| `icon-128.png` | 128×128 | Icône du listing | `src/icon128.png` |
| `tile-440x280.png` | 440×280 | Petite tuile promotionnelle | Composition PK New Tab |
| `marquee-1400x560.png` | 1400×560 | Marquee promotionnel | Composition PK New Tab |
| `screenshots/01-hero-1280x800.png` | 1280×800 | Hero avec fenêtre de l'extension | Composition PK New Tab |
| `screenshots/02-pk-new-tab-survol.png` | 1280×800 | Survol d'une carte (UI actuelle) | `store/v2/screenshots/newtab-hover-1280x800.png` |
| `screenshots/03-pk-new-tab-vue-large.png` | 1280×800 | Vue large (archive v1) | `store/v1/screenshots/02-mosaique-vue-large.png` |
| `screenshots/04-pk-new-tab-mosa-que.png` | 1280×800 | Mosaïque (archive v1) | `store/v1/screenshots/01-nouvel-onglet-mosaique.png` |

## Avant une nouvelle soumission

Les captures `03` et `04` proviennent de l'archive v1 : elles montrent l'ancienne
interface, avec une barre de recherche absente du code actuel. Les régénérer depuis
`store/v2/screenshots/` ou une capture de production avant de les téléverser.
