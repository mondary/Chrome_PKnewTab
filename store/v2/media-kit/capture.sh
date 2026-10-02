#!/bin/sh
# capture.sh — captures et animations « PK New Tab » v2.1.3
# Réutilise la scène capture-scene.html (code de production + fixtures outils fictifs).
# Scénario v2 (72 frames × 100 ms) — la mosaïque domine, le loading n'est qu'une
# transition courte (0,4 s en boucle) : plus de « chargement qui plante ».
# Sorties (chemins relatifs au dossier store/) :
#   screenshots/newtab-mosaic-1280x800.png      mosaïque stable
#   screenshots/newtab-mosaic-1280x800@2x.png   idem, Retina
#   screenshots/newtab-loading-1280x800.png     écran LOADING complet
#   screenshots/newtab-hover-1280x800.png       survol d'une carte
#   media-kit/frames/f%02d.png                  72 frames @2x (2560×1600)
#   gifs/newtab-demo-1280x800.gif               boucle large
#   gifs/newtab-demo-640x400.gif                boucle compacte
#   videos/newtab-demo-master.mp4               master 2560×1600
#   videos/newtab-demo-1280x800.mp4             variante web
# Usage : sh capture.sh  (depuis store/media-kit/)
set -eu

CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
HERE=$(CDPATH= cd -- "$(dirname "$0")" && pwd)
STORE=$(CDPATH= cd -- "$HERE/../" && pwd)
SCENE="file://$HERE/capture-scene.html"
FRAME_DIR="$HERE/frames"

COMMON="--headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=5000 --lang=fr-FR"

shot() { # shot <sortie> <query>
  rm -f "$1"
  "$CHROME" $COMMON --force-device-scale-factor=2 --window-size=1280,800 \
    --screenshot="$1" "$SCENE?$2" 2>/dev/null
}

mkdir -p "$STORE/screenshots" "$STORE/gifs" "$STORE/videos" "$FRAME_DIR"
rm -f "$FRAME_DIR"/f*.png

echo "— Screenshots —"
"$CHROME" $COMMON --force-device-scale-factor=2 --window-size=1280,800 \
  --screenshot="$STORE/screenshots/newtab-mosaic-1280x800@2x.png" "$SCENE?mode=cards&at=2000" 2>/dev/null
"$CHROME" $COMMON --force-device-scale-factor=1 --window-size=1280,800 \
  --screenshot="$STORE/screenshots/newtab-mosaic-1280x800.png" "$SCENE?mode=cards&at=2000" 2>/dev/null
"$CHROME" $COMMON --force-device-scale-factor=1 --window-size=1280,800 \
  --screenshot="$STORE/screenshots/newtab-loading-1280x800.png" "$SCENE?mode=loading&at=1400" 2>/dev/null
"$CHROME" $COMMON --force-device-scale-factor=1 --window-size=1280,800 \
  --screenshot="$STORE/screenshots/newtab-hover-1280x800.png" "$SCENE?mode=cards&at=600&lift=5" 2>/dev/null
echo "  ✓ screenshots"

echo "— 72 frames @2x (100 ms chacune) —"
i=0
# f00–f03 : LOADING, transition courte
for at in 50 150 250 350; do
  shot "$FRAME_DIR/$(printf 'f%02d.png' $i)" "mode=loading&at=$at"; i=$((i + 1))
done
# f04–f11 : apparition de la mosaïque (fadeInUp 600 ms)
for at in 100 200 300 400 500 600 700 800; do
  shot "$FRAME_DIR/$(printf 'f%02d.png' $i)" "mode=cards&at=$at"; i=$((i + 1))
done
# f12–f21 : mosaïque stable, le curseur traverse vers la carte n°1 (640,542)
for pos in 1320,880 1218,834 1116,788 1014,742 912,696 810,650 733,616 678,570 650,548 640,542; do
  shot "$FRAME_DIR/$(printf 'f%02d.png' $i)" "mode=cards&at=600&cursor=$pos"; i=$((i + 1))
done
# f22–f27 : survol de la carte n°1 (élévation interpolée puis tenue)
for lift in 2 4 5 5 5 5; do
  shot "$FRAME_DIR/$(printf 'f%02d.png' $i)" "mode=cards&at=600&cursor=640,542&lift=$lift"; i=$((i + 1))
done
# f28–f29 : clic (pression)
for p in 1 1; do
  shot "$FRAME_DIR/$(printf 'f%02d.png' $i)" "mode=cards&at=600&cursor=640,542&lift=5&pressed=$p"; i=$((i + 1))
done
# f30–f35 : relâche, survol tenu
for n in 0 1 2 3 4 5; do
  shot "$FRAME_DIR/$(printf 'f%02d.png' $i)" "mode=cards&at=600&cursor=640,542&lift=5"; i=$((i + 1))
done
# f36–f41 : le curseur descend vers la carte n°4 (640,1108), l'élévation retombe
for fl in "592 5" "667 3" "742 1" "817 0" "892 0" "1000 0"; do
  y=${fl% *}; lift=${fl#* }
  shot "$FRAME_DIR/$(printf 'f%02d.png' $i)" "mode=cards&at=600&cursor=640,$y&lift=$lift"; i=$((i + 1))
done
# f42–f47 : survol de la carte n°4
for fl in "1058 2" "1088 4" "1108 5" "1108 5" "1108 5" "1108 5"; do
  y=${fl% *}; lift=${fl#* }
  shot "$FRAME_DIR/$(printf 'f%02d.png' $i)" "mode=cards&at=600&cursor=640,$y&hover=4&lift=$lift"; i=$((i + 1))
done
# f48–f49 : clic sur la carte n°4
for p in 1 1; do
  shot "$FRAME_DIR/$(printf 'f%02d.png' $i)" "mode=cards&at=600&cursor=640,1108&hover=4&lift=5&pressed=$p"; i=$((i + 1))
done
# f50–f55 : relâche, survol tenu
for n in 0 1 2 3 4 5; do
  shot "$FRAME_DIR/$(printf 'f%02d.png' $i)" "mode=cards&at=600&cursor=640,1108&hover=4&lift=5"; i=$((i + 1))
done
# f56–f63 : le curseur remonte et sort du cadre, élévation retombante
for fl in "660,1000 4" "700,860 3" "760,720 1" "840,580 0" "950,470 0" "1080,380 0" "1180,320 0" "1260,280 0"; do
  pos=${fl% *}; lift=${fl#* }
  shot "$FRAME_DIR/$(printf 'f%02d.png' $i)" "mode=cards&at=600&cursor=$pos&hover=4&lift=$lift"; i=$((i + 1))
done
# f64–f71 : mosaïque stable, sans curseur (repos)
for n in 0 1 2 3 4 5 6 7; do
  shot "$FRAME_DIR/$(printf 'f%02d.png' $i)" "mode=cards&at=600"; i=$((i + 1))
done
echo "  → $i frames capturées"

echo "— Assemblage (ffmpeg) —"
ffmpeg -hide_banner -loglevel error -y -framerate 10 -i "$FRAME_DIR/f%02d.png" \
  -vf "scale=1280:800:flags=lanczos:in_color_matrix=bt709,split[a][b];[a]palettegen=max_colors=160[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle" \
  "$STORE/gifs/newtab-demo-1280x800.gif"
ffmpeg -hide_banner -loglevel error -y -framerate 10 -i "$FRAME_DIR/f%02d.png" \
  -vf "scale=640:400:flags=lanczos:in_color_matrix=bt709,split[a][b];[a]palettegen=max_colors=96[p];[b][p]paletteuse=dither=bayer:bayer_scale=5" \
  "$STORE/gifs/newtab-demo-640x400.gif"
ffmpeg -hide_banner -loglevel error -y -framerate 10 -i "$FRAME_DIR/f%02d.png" \
  -pix_fmt yuv420p -crf 20 -movflags +faststart "$STORE/videos/newtab-demo-master.mp4"
ffmpeg -hide_banner -loglevel error -y -framerate 10 -i "$FRAME_DIR/f%02d.png" \
  -vf scale=1280:800:flags=lanczos -pix_fmt yuv420p -crf 24 -movflags +faststart \
  "$STORE/videos/newtab-demo-1280x800.mp4"

echo "— Poids des sorties —"
ls -la "$STORE/screenshots" "$STORE/gifs" "$STORE/videos" | grep -v '^total\|^d'
