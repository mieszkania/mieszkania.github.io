#!/bin/bash

YAML="_data/sitemap.yaml"

cd "$(dirname "$0")/.."
locs=($(grep '^- loc: ' "${YAML}" | cut -d' ' -f3))
for loc in "${locs[@]}"; do
  file="${loc}"
  if [[ "${file}" == */ ]]; then
    file="${file}index.*"
  fi
  echo "- loc: ${loc}"
  echo "  lastmod: $(git log -1 --format="%aI" -- "./${file}")"
done > "${YAML}"
