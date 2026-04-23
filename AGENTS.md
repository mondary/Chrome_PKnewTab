# AGENTS.md

## Project Overview

Chrome Extension (Manifest V3) that replaces the new tab page with a mosaic of the 15 latest articles from mondary.design. The site is a WordPress blog.

## Project Structure

```
├── src/                    # Main extension (load from here for local dev)
│   ├── manifest.json        # Extension manifest (v3)
│   ├── newtab.html          # Entry point (overrides chrome://newtab/)
│   ├── newtab.css           # Styles
│   ├── newtab.js            # Logic
│   ├── logo.png             # Site logo
│   └── icon*.png            # Extension icons (48x48, 128x128)
├── release/                 # Packaged zips for Chrome Web Store upload
│   └── NewTabRssMondary_v*.zip
└── README.md
```

## Essential Commands

### Build Release Package
```bash
cd src && zip -r ../release/NewTabRssMondary_v1.0.1.zip . -x "*.DS_Store"
```

### Local Installation
1. Open `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the `src/` folder

### Testing
- Open `Chrome/test.html` directly in browser for local testing without extension loading
- Or install extension from `src/` and open new tab

## Architecture

### Data Flow
1. Page loads → `DOMContentLoaded` event fires
2. Loading animation displayed (spelled-out "LOADING" text)
3. Attempts WordPress REST API first (`/wp-json/wp/v2/posts`)
4. Falls back to RSS feed (`/feed/`) if API fails
5. Renders up to 15 news cards in 3-column grid
6. Footer fades in after 600ms

### Data Sources

**Primary: WordPress REST API**
- URL: `https://mondary.design/wp-json/wp/v2/posts?per_page=15&_embed=wp:featuredmedia`
- Fields: `link`, `date`, `title.rendered`, `excerpt.rendered`, `jetpack_featured_media_url`, `_embedded.wp:featuredmedia.source_url`

**Fallback: RSS Feed**
- URL: `https://mondary.design/feed/`
- Used when WP API is unavailable

### Image Handling
- Tries `jetpack_featured_media_url` first
- Then checks `_embedded.wp:featuredmedia` for `large` or `full` size
- Falls back to `logo.png` if no image found
- Each card also has an `onerror` handler to swap to `logo.png`

### Excerpt Processing
- HTML stripped from excerpt
- Content after 📌 emoji marker is used as the actual excerpt
- Truncated to 200 characters
- Used to skip email-style prefixes in WordPress excerpts

## Key Implementation Details

### Manifest V3 Configuration
```json
{
  "chrome_url_overrides": { "newtab": "newtab.html" },
  "host_permissions": ["https://mondary.design/*"]
}
```
Only `activeTab` permission + specific host for the data source.

### CSS Patterns
- CSS Grid: `grid-template-columns: repeat(3, 1fr)`
- Card animation: `fadeInUp` keyframes with staggered `animation-delay`
- Loading screen: Full viewport fixed overlay with letter-by-letter typing effect
- Footer gradient mask for smooth fade-out effect

### JavaScript Patterns
- Vanilla JS, no frameworks or build tools
- Async/await with try/catch for fetch operations
- DOMParser for RSS XML parsing
- HTML entity decoding via `<textarea>` element

## Code Style

- Vanilla JavaScript (ES6+)
- CSS with BEM-like class naming (`.news-item`, `.news-image`, `.news-content`)
- No minification or bundling
- External Google Font: Outfit (for titles)

## Gotchas

1. **RSS fallback lacks images**: RSS feed doesn't include featured images, so RSS-sourced cards always use `logo.png`
2. **The 📌 emoji marker**: WordPress excerpts have email-style prefixes before 📌. The code finds 📌 and takes everything after it
3. **manifest_version 3**: This is MV3, not MV2 - no background scripts, uses `chrome_url_overrides`
4. **No build process**: Changes to `src/` are immediately testable after reloading extension
5. **Keep `src/` and `Chrome/` in sync**: `Chrome/` is a copy for local testing; ensure both are identical before release
6. **Version bump required**: Update version in `manifest.json` before each release

## Updating the Extension

1. Edit files in `src/`
2. Test locally (reload extension or use test.html)
3. Bump version in `manifest.json`
4. Run the zip command to create release package
5. Upload `release/NewTabRssMondary_v*.zip` to Chrome Web Store Developer Dashboard
