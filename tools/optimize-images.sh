#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────
#  optimize-images.sh
#  Shrink the gallery images to web-friendly sizes — without ever
#  losing your originals.
#
#  For every image under images/, this:
#    1. Copies the pristine original into _originals/ (once), and
#    2. Re-encodes a web version in place: longest side <= MAXDIM px,
#       JPEG quality QUALITY.
#  Because it always re-derives from the backup, it's safe to re-run
#  (no recompressing an already-compressed file). _originals/ is
#  git-ignored, so full-res scans stay on your machine only.
#
#  Uses sips, which ships with macOS — no install needed.
#
#  Usage:
#     tools/optimize-images.sh            # optimize in place
#     tools/optimize-images.sh --dry-run  # report sizes, change nothing
# ─────────────────────────────────────────────────────────────────
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/images"
BACKUP="$ROOT/_originals"
MAXDIM=2000      # longest edge, in pixels
QUALITY=80       # JPEG quality (1-100)
DRY=0
[[ "${1:-}" == "--dry-run" ]] && DRY=1

command -v sips >/dev/null 2>&1 || { echo "sips not found (expected on macOS)"; exit 1; }

human() { du -h "$1" 2>/dev/null | cut -f1; }

before_total=$(du -sk "$SRC" | cut -f1)

find "$SRC" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) ! -name '.*' |
while IFS= read -r f; do
  rel="${f#"$SRC"/}"
  bak="$BACKUP/$rel"

  # stash the pristine original the first time we see this file
  if [[ ! -f "$bak" ]]; then
    [[ $DRY -eq 1 ]] || { mkdir -p "$(dirname "$bak")"; cp "$f" "$bak"; }
  fi
  base="${bak:-$f}"
  [[ -f "$base" ]] || base="$f"

  ext="$(printf '%s' "${f##*.}" | tr '[:upper:]' '[:lower:]')"

  if [[ $DRY -eq 1 ]]; then
    printf '   %-34s %s\n' "$rel" "$(human "$f")"
    continue
  fi

  if [[ "$ext" == "png" ]]; then
    sips -Z "$MAXDIM" "$base" --out "$f" >/dev/null
  else
    sips -s format jpeg -s formatOptions "$QUALITY" -Z "$MAXDIM" "$base" --out "$f" >/dev/null
  fi
  printf '   %-34s -> %s\n' "$rel" "$(human "$f")"
done

if [[ $DRY -eq 0 ]]; then
  after_total=$(du -sk "$SRC" | cut -f1)
  printf '\nimages/  %s MB  ->  %s MB\n' \
    "$((before_total / 1024))" "$((after_total / 1024))"
fi
