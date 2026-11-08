#!/usr/bin/env bash

set -Eeuo pipefail

app_root="/var/www/tronious"
release_id="${1:-}"

if [[ ! "$release_id" =~ ^[0-9a-f]{12}$ ]]; then
  echo "Invalid release identifier." >&2
  exit 2
fi

archive="$app_root/releases/$release_id.tar.gz"
release="$app_root/releases/$release_id"
current="$app_root/current"
pending="$app_root/current.next"
previous=""

if [[ ! -f "$archive" ]]; then
  echo "Release archive was not uploaded: $archive" >&2
  exit 3
fi

if [[ -L "$current" ]]; then
  previous="$(readlink -f "$current")"
fi

rm -rf -- "$release"
mkdir -p "$release"
tar -xzf "$archive" -C "$release"
rm -f -- "$archive"

if [[ ! -f "$release/server.js" ]]; then
  echo "The standalone release does not contain server.js." >&2
  rm -rf -- "$release"
  exit 4
fi

activate_release() {
  local target="$1"
  ln -sfn "$target" "$pending"
  mv -Tf "$pending" "$current"
}

rollback() {
  if [[ -n "$previous" && -d "$previous" ]]; then
    echo "Restoring the previous release."
    activate_release "$previous"
    sudo /usr/bin/systemctl restart tronious-web.service
  fi
}

activate_release "$release"

if ! sudo /usr/bin/systemctl restart tronious-web.service; then
  rollback
  exit 5
fi

healthy=false
for attempt in {1..15}; do
  if curl --fail --silent --show-error --max-time 5 http://127.0.0.1:3000/ >/dev/null; then
    healthy=true
    break
  fi
  sleep 2
done

if [[ "$healthy" != "true" ]]; then
  echo "The new release did not pass its health check." >&2
  rollback
  exit 6
fi

echo "Release $release_id is healthy."
