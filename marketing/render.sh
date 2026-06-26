#!/bin/bash
# Render a marketing HTML to PNG via headless Chromium.
# Usage: ./render.sh <name> <width> <height>
CHROME=/opt/pw-browsers/chromium-1194/chrome-linux/chrome
NAME="$1"; W="$2"; H="$3"
cd "$(dirname "$0")"
"$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars \
  --force-device-scale-factor=1 --virtual-time-budget=4000 \
  --screenshot="${NAME}.png" --window-size="${W},${H}" \
  "src/${NAME}.html" 2>/dev/null
echo "rendered ${NAME}.png ($(file -b ${NAME}.png 2>/dev/null))"
