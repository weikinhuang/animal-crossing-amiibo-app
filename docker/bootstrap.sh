#!/bin/bash
set -e

# fix weird state issues with ionic state restore not working inside Dockerfile
if [[ ! -d $APP_ROOT/plugins ]] || [[ ! -d $APP_ROOT/platforms ]]; then
    ionic state restore
fi

exec "$@"
