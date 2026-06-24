#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────
#  rename-images.sh
#  Give every film scan a uniform name: <slug>-NN.<ext>
#
#  Walks each sub-folder of images/, derives a slug from the folder
#  name ("Kodak Gold" -> "kodak-gold"), and renames the photos inside
#  to kodak-gold-01.jpg, kodak-gold-02.jpg, … in sorted order. The
#  extension is lowercased and .jpeg is folded to .jpg. Hidden files
#  (.DS_Store) and the loose images/ root files (polaroids) are left
#  alone. New folders are picked up automatically next run.
#
#  Usage:
#     tools/rename-images.sh            # rename in place
#     tools/rename-images.sh --dry-run  # just print what would change
# ─────────────────────────────────────────────────────────────────
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)/images"
DRY=0
[[ "${1:-}" == "--dry-run" ]] && DRY=1

slugify() {
  printf '%s' "$1" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g; s/^-+|-+$//g'
}

norm_ext() {
  local e
  e="$(printf '%s' "$1" | tr '[:upper:]' '[:lower:]')"
  [[ "$e" == "jpeg" ]] && e="jpg"
  printf '%s' "$e"
}

for dir in "$ROOT"/*/; do
  dir="${dir%/}"
  slug="$(slugify "$(basename "$dir")")"

  # image files only, sorted, skipping hidden files
  files=()
  while IFS= read -r f; do
    files+=("$f")
  done < <(find "$dir" -maxdepth 1 -type f \
      \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \
         -o -iname '*.gif' -o -iname '*.webp' \) \
      ! -name '.*' | sort)

  n=${#files[@]}
  [[ $n -eq 0 ]] && continue
  printf '▸ %-22s %d files\n' "$slug" "$n"

  # work out every target name up front
  targets=()
  i=0
  for f in "${files[@]}"; do
    i=$((i + 1))
    ext="$(norm_ext "${f##*.}")"
    targets+=("$dir/$(printf '%s-%02d.%s' "$slug" "$i" "$ext")")
  done

  if [[ $DRY -eq 1 ]]; then
    for j in "${!files[@]}"; do
      printf '   %s  ->  %s\n' "$(basename "${files[$j]}")" "$(basename "${targets[$j]}")"
    done
    continue
  fi

  # two-phase rename so source/target names can't collide mid-flight
  tmps=()
  for j in "${!files[@]}"; do
    tmp="$dir/.rntmp-$j-$$"
    mv "${files[$j]}" "$tmp"
    tmps+=("$tmp")
  done
  for j in "${!tmps[@]}"; do
    mv "${tmps[$j]}" "${targets[$j]}"
  done
done
