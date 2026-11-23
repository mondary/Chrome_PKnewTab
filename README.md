<div align=”center”>

# PK New Tab

![Project icon](icon.png)

**🎨 Découvrez le design moderne au quotidien**

Une belle façon de commencer votre navigation sur le web — chaque nouvel onglet affiche les derniers articles de [mondary.design](https://mondary.design).

[⭐ Installer depuis le Chrome Web Store](https://chromewebstore.google.com/detail/pk-new-tab/boeenonaijkccialgfaeipkhfhnnpfmd)

**Version 2026.11.1** · gratuite · aucune donnée collectée

</div>

## ✨ À propos

Mondary NEW TAB transforme votre page “Nouvel onglet” en une vitrine inspirante du design contemporain. Chaque fois que vous ouvrez un nouvel onglet, vous découvrez une sélection des 15 derniers articles publiés sur mondary.design, le site de référence pour le design moderne.

### 🎯 Ce que vous obtenez

- **Mosaïque dynamique** — Les 15 derniers articles de mondary.design en un coup d’œil
- **Images en haute qualité** — Vignettes automatiques pour chaque article
- **Recherche intégrée** — Barre de recherche Google intégrée pour chercher directement
- **Expérience fluide** — Cliquez sur n’importe quelle carte pour ouvrir l’article dans un nouvel onglet
- **Design épuré** — Interface minimaliste qui met en valeur le contenu

## 🚀 Installation

L’installation se fait en un clic depuis le [Chrome Web Store](https://chromewebstore.google.com/detail/pk-new-tab/boeenonaijkccialgfaeipkhfhnnpfmd).

C’est gratuit et sécurisé — l’extension ne collecte aucune donnée personnelle.

## 📸 Aperçu

Ouvrez simplement un nouvel onglet Chrome, et vous verrez instantanément les derniers articles de mondary.design. C'est tout !

**Page store : [`store/website/`](store/website/)** — nouvelle landing bilingue FR/EN, source éditable directement déployable. [`store/v1/`](store/v1/) conserve le kit historique ; [`store/v2/`](store/v2/) conserve la landing et le media-kit précédents ; [`store/cws/`](store/cws/) regroupe les visuels prêts pour la fiche Chrome Web Store. `scripts/website.sh` vérifie le dossier sans le réécrire.

La landing inclut une [capture haute du nouvel onglet avec huit articles](store/website/screenshots/newtab-mosaic-1280x2050.png), régénérable via `python3 scripts/capture-newtab.py`. [Soutenir le projet sur Ko-fi](https://ko-fi.com/pouark).

**C’est parfait pour :**
- 🎨 Les designers cherchant de l’inspiration
- 📱 Les passionnés de design UI/UX  
- 🖌️ Les créatifs à la recherche de tendances
- 💡 Tous ceux qui apprécient le beau design

## 🛠️ Pour les développeurs

### Structure du projet
- `src/` : extension non packagée (manifest, HTML, CSS, JS, assets)
- `release/` : archives `.zip` prêtes pour upload sur Chrome Web Store

### Build & Package
Créer un zip de release depuis `src/`:

```bash
cd src
zip -r ../release/PK-New-Tab-2026.11.1.zip . -x "*.DS_Store"
```

### Installation locale (développement)
1. Ouvrir `chrome://extensions/`
2. Activer `Mode développeur`
3. Cliquer `Charger l’extension non empaquetée`
4. Sélectionner le dossier `src/`
5. Ouvrir un nouvel onglet pour tester

## 📝 Changelog

### 2026.11.1 - 2026-11-23
- Kit média Chrome Web Store dans `store/cws/` (icône, tuile, marquee, captures 1280×800)

### 2026.10.7 - 2026-10-02
- Lien Ko-fi discret dans le pied de page du nouvel onglet
- Nouvelle page store `store/website/` avec capture haute (8 articles) ; archives `store/v1/` et `store/v2/`
- Versionnage CalVer du manifest (la fiche publiée reste 2.1.3 en attendant la prochaine submission)

### 2.1.3 - 2026-07-01
- Mise à jour branding PK-Labs, noms cohérents et descriptions optimisées
- Ajout lien vers mondary.design dans les descriptions

### 2.1.0 - 2026-04-10
- Correction de l'affichage des images d'articles via l'API WordPress (featured media)
- Ajout d'un fallback image fiable
- Fallback RSS conservé si l'API principale échoue

### 1.0.0
- Première version publique

---

**🔗 Conçu avec ❤️ pour la communauté design**

## 🔗 Liens

- **Chrome Web Store** : [PK New Tab](https://chromewebstore.google.com/detail/pk-new-tab/boeenonaijkccialgfaeipkhfhnnpfmd)
- **Page store** : [`store/website/`](store/website/) (source : [`store/website/index.html`](store/website/index.html))
- **Politique de Confidentialité** : [GitHub Pages](https://mondary.github.io/Chrome_PKnewTab/store/privacy-policy-mondary-new-tab.html)
- **Site** : [mondary.design](https://mondary.design)
- **Description** : [store/v1/DESCRIPTION.md](store/v1/DESCRIPTION.md) (archive)
- **Soutenir** : [Ko-fi](https://ko-fi.com/pouark)
- [README English](README_en.md)

[🇫🇷 Français](README.md)
