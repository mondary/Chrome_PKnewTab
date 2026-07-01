<div align=”center”>

# PK New Tab

![Project icon](icon.png)

**🎨 Découvrez le design moderne au quotidien**

Une belle façon de commencer votre navigation sur le web — chaque nouvel onglet affiche les derniers articles de [mondary.design](https://mondary.design).

[⭐ Installer depuis le Chrome Web Store](https://chromewebstore.google.com/detail/mondary-new-tab/boeenonaijkccialgfaeipkhfhnnpfmd?hl=fr)

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

L’installation se fait en un clic depuis le [Chrome Web Store](https://chromewebstore.google.com/detail/mondary-new-tab/boeenonaijkccialgfaeipkhfhnnpfmd?hl=fr).

C’est gratuit et sécurisé — l’extension ne collecte aucune donnée personnelle.

## 📸 Aperçu

Ouvrez simplement un nouvel onglet Chrome, et vous verrez instantanément les derniers articles de mondary.design. C’est tout !

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
zip -r ../release/NewTabRssMondary_v2.1.0.zip . -x “*.DS_Store”
```

### Installation locale (développement)
1. Ouvrir `chrome://extensions/`
2. Activer `Mode développeur`
3. Cliquer `Charger l’extension non empaquetée`
4. Sélectionner le dossier `src/`
5. Ouvrir un nouvel onglet pour tester

## 📝 Changelog

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

- **Chrome Web Store** : [PK New Tab](https://chromewebstore.google.com/detail/mondary-new-tab/boeenonaijkccialgfaeipkhfhnnpfmd?hl=fr)
- **Politique de Confidentialité** : [GitHub Pages](https://mondary.github.io/Chrome_PKnewTab/store/privacy-policy-mondary-new-tab.html)
- **Site** : [mondary.design](https://mondary.design)
- **Description** : [store/DESCRIPTION.md](store/DESCRIPTION.md)
- [README English](README_en.md)

[🇫🇷 Français](README.md)
