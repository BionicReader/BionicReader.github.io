#!/bin/bash
# Double-click to preview the site at http://localhost:8000 (needed for the Godot game to run).
# Press Ctrl+C in the window to stop it.
cd "$(dirname "$0")"
( sleep 1 && open "http://localhost:8000/index.html" ) &
echo "Previewing at http://localhost:8000 — press Ctrl+C to stop."
python3 -m http.server 8000
