#! /bin/bash

build_paths=(
  learn-data-structure
)

for path in ${build_paths[@]}; do
  echo "build ${path}"
  npm run docs:build "${path}"
done
