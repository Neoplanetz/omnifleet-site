#!/usr/bin/env bash
# Generate dark animated-gradient stand-in clips until the real capture session.
# Real captures overwrite these exact filenames.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/videos public/posters

for name in hero map dashboard control replay; do
  ffmpeg -y -f lavfi \
    -i "gradients=s=1920x1080:d=12:speed=0.02:nb_colors=4:c0=0x0a0c10:c1=0x123036:c2=0x0e1219:c3=0x06262e" \
    -vf "format=yuv420p" -r 30 -c:v libx264 -crf 28 -movflags +faststart -an \
    "public/videos/$name.mp4"
  ffmpeg -y -i "public/videos/$name.mp4" \
    -c:v libvpx-vp9 -crf 42 -b:v 0 -an "public/videos/$name.webm"
  ffmpeg -y -i "public/videos/$name.mp4" -frames:v 1 -q:v 4 "public/posters/$name.jpg"
done
ls -lh public/videos public/posters
