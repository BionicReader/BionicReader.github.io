#!/bin/bash
# Run this from the folder that holds your images (the one containing the WHAPIMAGE folder).
# macOS only (uses the built-in `sips`). Creates ./site-images/ with web-sized, renamed files.
# Screenshots become JPG (max 1600px); asset and UI images stay PNG (max 1200px) to keep transparency.
OUT="site-images"; mkdir -p "$OUT"

find_src() { for f in "$1".* "$1"; do [ -f "$f" ] && { printf '%s' "$f"; return 0; }; done; return 1; }

conv() {
  local base="$1" dest="$2" src w h max limit fmt
  src=$(find_src "$base") || { echo "MISSING: $base"; return; }
  w=$(sips -g pixelWidth "$src" | awk '/pixelWidth/{print $2}')
  h=$(sips -g pixelHeight "$src" | awk '/pixelHeight/{print $2}')
  max=$(( w > h ? w : h ))
  if [ "${dest##*.}" = "jpg" ]; then limit=1600; fmt="-s format jpeg -s formatOptions 80"
  else limit=1200; fmt="-s format png"; fi
  if [ "$max" -gt "$limit" ]; then sips -Z "$limit" $fmt "$src" --out "$OUT/$dest" >/dev/null
  else sips $fmt "$src" --out "$OUT/$dest" >/dev/null; fi
  echo "ok: $dest"
}

conv "KingsM-main" "kings-messenger-01-main.jpg"
conv "KingsM-Gameplay1" "kings-messenger-02-gameplay1.jpg"
conv "KingsM-gameplay2" "kings-messenger-03-gameplay2.jpg"
conv "KingsM-UI1" "kings-messenger-04-ui1.jpg"
conv "KingsM-UI2" "kings-messenger-05-ui2.jpg"
conv "WhatWaitsInTheCave-main" "what-waits-in-the-cave-01-main.jpg"
conv "WahtWaitsInThecave-Inside1" "what-waits-in-the-cave-02-inside1.jpg"
conv "WahtWaitsInThecave-inside2" "what-waits-in-the-cave-03-inside2.jpg"
conv "WWITC-BasketAsset" "what-waits-in-the-cave-asset-basket.png"
conv "WWITC-BlanketAsset" "what-waits-in-the-cave-asset-blanket.png"
conv "WWITC-BoneAsset" "what-waits-in-the-cave-asset-bone.png"
conv "WWITC-CliffCaveAsset" "what-waits-in-the-cave-asset-cliff-cave.png"
conv "WWITC-FirePlaceAsset" "what-waits-in-the-cave-asset-fireplace.png"
conv "WWITC-GorgModel" "what-waits-in-the-cave-asset-gorg-model.png"
conv "WWITC-GorgRig" "what-waits-in-the-cave-asset-gorg-rig.png"
conv "WWITC-KnifeAsset" "what-waits-in-the-cave-asset-knife.png"
conv "WWITC-LaregCliffWallAsset" "what-waits-in-the-cave-asset-cliff-wall.png"
conv "WWITC-RibAsset" "what-waits-in-the-cave-asset-rib.png"
conv "WWITC-TreeAsset" "what-waits-in-the-cave-asset-tree.png"
conv "DidYouHearThatTWINE - Setup" "did-you-hear-that-01-setup.jpg"
conv "DidYouHearThatTWINE - Point of choice" "did-you-hear-that-02-choice.jpg"
conv "Darker-Cover" "darker-01-cover.jpg"
conv "Darker-TV" "darker-02-tv.jpg"
conv "Darker-Notebook" "darker-03-notebook.jpg"
conv "Darker-EndExample1" "darker-04-ending.jpg"
conv "Darker-Credits" "darker-05-credits.jpg"
conv "BB-1" "bubble-boundaries-01.jpg"
conv "BB-2" "bubble-boundaries-02.jpg"
conv "BB-3" "bubble-boundaries-03.jpg"
conv "BB-4" "bubble-boundaries-04.jpg"
conv "Chicken-1" "retrochicken-01.jpg"
conv "Chicken-2" "retrochicken-02.jpg"
conv "Chicken-3" "retrochicken-03.jpg"
conv "WHAPIMAGE/Cover" "we-have-a-problem-01-cover.jpg"
conv "WHAPIMAGE/Blueprint" "we-have-a-problem-02-blueprint.png"
conv "WHAPIMAGE/Console" "we-have-a-problem-console.png"
conv "WHAPIMAGE/NavScreen" "we-have-a-problem-nav-screen.png"
conv "WHAPIMAGE/NavButtons" "we-have-a-problem-nav-buttons.png"
conv "WHAPIMAGE/Radar" "we-have-a-problem-radar.png"
conv "WHAPIMAGE/Engine" "we-have-a-problem-engine.png"
conv "WHAPIMAGE/FuelRe " "we-have-a-problem-fuel.png"
conv "WHAPIMAGE/Shields" "we-have-a-problem-shields.png"
conv "WHAPIMAGE/Tach" "we-have-a-problem-tachometer.png"
conv "WHAPIMAGE/Light" "we-have-a-problem-light.png"
conv "WHAPIMAGE/RetrievalSys " "we-have-a-problem-retrieval-system.png"
conv "WHAPIMAGE/Settings" "we-have-a-problem-settings.png"
conv "WHAPIMAGE/Worm" "we-have-a-problem-worm.png"
conv "WHAPIMAGE/W1" "we-have-a-problem-worm-w1.png"
conv "WHAPIMAGE/W2" "we-have-a-problem-worm-w2.png"
conv "WHAPIMAGE/W3" "we-have-a-problem-worm-w3.png"
conv "WHAPIMAGE/W4" "we-have-a-problem-worm-w4.png"
conv "WHAPIMAGE/W5" "we-have-a-problem-worm-w5.png"
conv "WHAPIMAGE/W6" "we-have-a-problem-worm-w6.png"
conv "skykid-01-concept" "skykid-01-concept.jpg"
conv "skykid-05-turnaround" "skykid-05-turnaround.jpg"
conv "skykid-02-wireframe" "skykid-02-wireframe.jpg"
conv "skykid-03-rig" "skykid-03-rig.jpg"
conv "skykid-06-run" "skykid-06-run.jpg"
conv "skykid-04-gameplay" "skykid-04-gameplay.jpg"
echo; echo "Done. Copy the contents of $OUT/ into your site's assets/img/ folder."
