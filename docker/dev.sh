#!/bin/bash

PROJECT_NAME=$(python -c 'import json,sys;obj=json.load(sys.stdin);print obj["name"]' < package.json)
APP_ROOT=/data

# build only if build flag was passed
if [[ $1 == -b ]]; then
    shift

    cat Dockerfile \
        | sed 's/^#DEV! //g' \
        > Dockerfile.dev

    docker build \
        -f Dockerfile \
        --tag "${PROJECT_NAME}" \
        .
fi

docker run -it --rm \
    --name "${PROJECT_NAME}-dev" \
    -p 8100:8100 \
    -p 35729:35729 \
    -v "$(pwd)/gulp":${APP_ROOT}/gulp \
    -v "$(pwd)/resources":${APP_ROOT}/resources \
    -v "$(pwd)/scss":${APP_ROOT}/scss \
    -v "$(pwd)/www":${APP_ROOT}/www \
    -v "$(pwd)/Gulpfile.js":${APP_ROOT}/Gulpfile.js \
    "${PROJECT_NAME}" \
    "$@"
