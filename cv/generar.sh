#!/usr/bin/env bash
# Genera los PDF del CV a partir de cv-es.html y cv-en.html (necesita Google Chrome).
set -euo pipefail
cd "$(dirname "$0")"

for idioma in es en; do
    google-chrome --headless=new --disable-gpu --no-pdf-header-footer \
        --print-to-pdf="CV-Tobias-Rivas-${idioma^^}.pdf" "file://$PWD/cv-${idioma}.html" 2>/dev/null
done
