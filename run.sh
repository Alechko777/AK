#!/usr/bin/env bash
set -euo pipefail

PORT=${PORT:-8000}

cd "$(dirname "$0")"

python -m http.server "$PORT"
