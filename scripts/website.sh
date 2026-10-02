#!/bin/sh
# Contrôle non destructif de la nouvelle landing directement déployable.
# La source éditable est store/website/index.html ; ne jamais la générer
# depuis les versions archivées store/v1 ou store/v2.
set -eu

ROOT=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
SITE="$ROOT/store/website"

for file in \
  index.html \
  assets/logo.png \
  assets/outfit.woff2 \
  assets/space-grotesk.woff2 \
  assets/kofi-cup.svg \
  assets/dusk.jpg \
  assets/posts.json \
  screenshots/newtab-mosaic-1280x2050.png \
  assets/covers/01.jpg \
  assets/covers/02.jpg \
  assets/covers/03.jpg \
  assets/covers/04.jpg \
  assets/covers/05.jpg \
  assets/covers/06.jpg \
  assets/covers/07.jpg \
  assets/covers/08.jpg
do
  if [ ! -s "$SITE/$file" ]; then
    echo "Ressource manquante : $SITE/$file" >&2
    exit 1
  fi
done

echo "OK : store/website/ est la source éditable et le dossier à déployer tel quel."
