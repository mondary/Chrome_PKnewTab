# PK New Tab — nouvelle landing

`index.html` est la **source de vérité**, autonome et directement déployable : envoyer **le contenu de ce dossier** sur le FTP, sans dossier parent supplémentaire. Ne pas lancer `scripts/website.sh` : cet ancien générateur a été remplacé par un contrôle non destructif.

- `../v1/` : kit historique préservé.
- `../v2/` : landing précédente + media-kit préservés.
- `assets/posts.json` : huit articles réels de mondary.design figés le 2026-10-02 ; les images locales correspondent à ces articles. L'extension elle-même affiche jusqu'à quinze articles et reste inchangée.
- La prévisualisation affiche les huit vignettes en deux rangées de quatre sur desktop ; sur mobile, la fenêtre affiche deux colonnes et défile.
- Le wallpaper local couvre toute la page : bureau avec barre supérieure, raccourcis et dock sur desktop, mise en page empilée sur mobile. Référence de composition : `.inspi/library/apps.html` ; navigateur simulé à la place de Finder.
- Polices locales : Space Grotesk pour les titres, Outfit pour l'interface.
- Le navigateur de la page est une **simulation interactive**, non une capture Chrome native. Le clic sur une carte montre un aperçu, puis un lien mène à l'article réel.
- [`screenshots/newtab-mosaic-1280x2050.png`](screenshots/newtab-mosaic-1280x2050.png) montre **huit articles** en trois colonnes, capturés avec le JS et le CSS de production et les huit articles/images locaux figés. Régénération : `python3 scripts/capture-newtab.py` depuis la racine ; aucun chargement réseau ni modification de l'extension.
- Le wallpaper vient de la bibliothèque de la skill premium-promo-media. Voir `assets/provenance.json`.
- Soutien : [Ko-fi](https://ko-fi.com/pouark), présent dans la barre supérieure, le dock et les blocs de contenu.

Prévisualisation : `python3 -m http.server 4178` à la racine du dépôt, puis `http://127.0.0.1:4178/store/website/`.

Vérification non destructive : `sh scripts/website.sh` vérifie les ressources requises et n'écrit rien.
