<div align=”center”>

# PK New Tab

![Project icon](icon.png)

**🎨 Discover modern design every day**

A beautiful way to start browsing — every new tab shows the latest articles from [mondary.design](https://mondary.design).

[⭐ Install from the Chrome Web Store](https://chromewebstore.google.com/detail/pk-new-tab/boeenonaijkccialgfaeipkhfhnnpfmd)

**Version 2026.11.1** · free · no data collected

</div>

## ✨ About

PK New Tab turns your "New Tab" page into an inspiring showcase of modern design. Every time you open a new tab, you get a selection of the 15 latest articles published on mondary.design, the go-to site for modern tools and design finds.

### 🎯 What you get

- **Dynamic mosaic** — The 15 latest mondary.design articles at a glance
- **High-quality images** — Automatic thumbnails for every article
- **Smooth experience** — Click any card to open the article in a new tab
- **Clean design** — A minimal interface that puts the content first

## 🚀 Installation

Install in one click from the [Chrome Web Store](https://chromewebstore.google.com/detail/pk-new-tab/boeenonaijkccialgfaeipkhfhnnpfmd).

It's free and safe — the extension collects no personal data.

## 📸 Preview

Just open a new Chrome tab and the latest mondary.design articles appear instantly. That's it!

**Store page: [`store/website/`](store/website/)** — new bilingual FR/EN landing, editable source ready to deploy. [`store/v1/`](store/v1/) keeps the original kit; [`store/v2/`](store/v2/) keeps the previous landing and media kit; [`store/cws/`](store/cws/) holds the visuals ready for the Chrome Web Store listing. `scripts/website.sh` checks the folder without rewriting it.

The landing includes a [tall new-tab screenshot with eight articles](store/website/screenshots/newtab-mosaic-1280x2050.png), regenerable via `python3 scripts/capture-newtab.py`. [Support the project on Ko-fi](https://ko-fi.com/pouark).

**Perfect for:**
- 🎨 Designers looking for inspiration
- 📱 UI/UX design enthusiasts
- 🖌️ Creators chasing trends
- 💡 Anyone who appreciates good design

## 🛠️ For developers

### Project structure
- `src/`: unpacked extension (manifest, HTML, CSS, JS, assets)
- `release/`: `.zip` archives ready for Chrome Web Store upload

### Build & Package
Create a release zip from `src/`:

```bash
cd src
zip -r ../release/PK-New-Tab-2026.11.1.zip . -x "*.DS_Store"
```

### Local installation (development)
1. Open `chrome://extensions/`
2. Enable `Developer mode`
3. Click `Load unpacked`
4. Select the `src/` folder
5. Open a new tab to test

## 📝 Changelog

### 2026.11.1 - 2026-11-23
- Chrome Web Store media kit in `store/cws/` (icon, tile, marquee, 1280×800 screenshots)

### 2026.10.7 - 2026-10-02
- Discreet Ko-fi link in the new tab footer
- New store page `store/website/` with tall screenshot (8 articles); `store/v1/` and `store/v2/` archives
- CalVer versioning for the manifest (the published listing stays 2.1.3 until the next submission)

### 2.1.3 - 2026-07-01
- PK-Labs branding update, consistent names and optimized descriptions
- Added mondary.design link in the descriptions

### 2.1.0 - 2026-04-10
- Fixed article image display via the WordPress API (featured media)
- Added a reliable image fallback
- RSS fallback kept if the main API fails

### 1.0.0
- First public release

---

**🔗 Made with ❤️ for the design community**

## 🔗 Links

- **Chrome Web Store**: [PK New Tab](https://chromewebstore.google.com/detail/pk-new-tab/boeenonaijkccialgfaeipkhfhnnpfmd)
- **Store page**: [`store/website/`](store/website/) (source: [`store/website/index.html`](store/website/index.html))
- **Privacy Policy**: [GitHub Pages](https://mondary.github.io/Chrome_PKnewTab/store/privacy-policy-mondary-new-tab.html)
- **Website**: [mondary.design](https://mondary.design)
- **Description**: [store/v1/DESCRIPTION.md](store/v1/DESCRIPTION.md) (archive)
- **Support**: [Ko-fi](https://ko-fi.com/pouark)
- [README Français](README.md)

[🇬🇧 English](README_en.md)
