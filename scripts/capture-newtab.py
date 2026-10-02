#!/usr/bin/env python3
"""Capture the production new-tab renderer with eight frozen, local articles.

Only the Chrome message response and deterministic animation end-state are
adapted for capture. The extension itself and its three-column CSS are intact.
"""
import json
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "store/website"
OUTPUT = SITE / "screenshots/newtab-mosaic-1280x2050.png"
POSTS = json.loads((SITE / "assets/posts.json").read_text())
FIXTURES = [
    {
        "title": {"rendered": post["title"]},
        "date": post["date"] + "T12:00:00",
        "link": post["link"],
        "excerpt": {"rendered": "<p>📌 " + post["excerpt"] + "</p>"},
        "jetpack_featured_media_url": post["image"],
    }
    for post in POSTS
]
assert len(FIXTURES) >= 8, "Eight local articles are required for the capture"

scene = """<!doctype html><html lang="fr"><head><meta charset="utf-8">
<title>PK New Tab — capture de la mosaïque</title>
<link rel="stylesheet" href="../../src/newtab.css">
<style>@font-face{font-family:Outfit;src:url('assets/outfit.woff2') format('woff2');font-weight:100 900}
.news-item{animation:none!important;opacity:1!important;transform:none!important}</style>
</head><body>
<div class="logo-container"><img src="assets/logo.png" class="logo" alt=""></div>
<div id="news-container" class="mosaic-grid"><div class="loading">...</div></div>
<footer class="custom-footer"><div class="footer-mask"></div><a class="footer-kofi" href="https://ko-fi.com/pouark" target="_blank" rel="noopener noreferrer">♡ Soutenir sur Ko-fi</a><div class="footer-text">© 2026 Clement MONDARY</div></footer>
<script>
const articles = __ARTICLES__;
window.chrome = {runtime:{sendMessage:(_message, callback) =>
  callback({success:true, data:articles, isRSS:false})}};
</script><script src="../../src/newtab.js"></script></body></html>"""
scene = scene.replace("__ARTICLES__", json.dumps(FIXTURES, ensure_ascii=False).replace("<", "\\u003c"))
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
with tempfile.NamedTemporaryFile(mode="w", suffix=".html", prefix=".capture-", dir=SITE) as page:
    page.write(scene)
    page.flush()
    subprocess.run(
        [chrome, "--headless=new", "--disable-gpu", "--hide-scrollbars",
         "--lang=fr-FR", "--force-device-scale-factor=1", "--window-size=1280,2050",
         "--virtual-time-budget=3000", f"--screenshot={OUTPUT}", Path(page.name).as_uri()],
        check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
print(OUTPUT)
