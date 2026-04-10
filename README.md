# Mondary NEW TAB

![Project icon](src/logo.png)

[🇫🇷 FR](README.md)

Extension Chrome qui remplace l’onglet “Nouveau” par une mosaïque des derniers articles publiés sur `mondary.design`.

## ✅ Fonctionnalités
- Affichage des 15 derniers articles.
- Récupération des images featured via l’API WordPress.
- Fallback RSS si l’API WordPress n’est pas disponible.
- Barre de recherche Google intégrée.
- Ouverture des articles en nouvel onglet.

## 🧠 Utilisation
- Ouvrir un nouvel onglet Chrome.
- Les articles se chargent automatiquement.
- Cliquer une carte pour ouvrir l’article.
- Utiliser le champ de recherche pour une requête Google.

## 📁 Structure du projet
- `src/` : extension non packagée (manifest, HTML, CSS, JS, assets).
- `release/` : archives `.zip` prêtes pour upload sur Chrome Web Store.

## 📦 Build & Package
Créer un zip de release depuis `src/`:

```bash
cd src
zip -r ../release/NewTabRssMondary_v1.0.1.zip . -x "*.DS_Store"
```

## 🧪 Installation locale (non packagée)
1. Ouvrir `chrome://extensions/`.
2. Activer `Mode développeur`.
3. Cliquer `Charger l’extension non empaquetée`.
4. Sélectionner le dossier `src/`.
5. Ouvrir un nouvel onglet pour tester.

## 🚀 Publication Chrome Web Store
Publication manuelle (recommandée):
1. Ouvrir le dashboard développeur Chrome Web Store.
2. Sélectionner l’extension `Mondary NEW TAB`.
3. Upload un zip depuis `release/`.
4. Vérifier la fiche store (captures, confidentialité, etc.).
5. Soumettre pour review/publication.

Publication API (optionnelle):
- Variables OAuth requises: `CWS_PUBLISHER_ID`, `CWS_EXTENSION_ID`, `CWS_CLIENT_ID`, `CWS_CLIENT_SECRET`, `CWS_REFRESH_TOKEN`.
- API cible: `chromewebstore.googleapis.com` v2.

## 🧾 Changelog
### 1.0.1 - 2026-04-10
- Correction de l’affichage des images d’articles via l’API WordPress (featured media).
- Ajout d’un fallback image fiable.
- Fallback RSS conservé si l’API principale échoue.

### 1.0.0
- Première version publique.
