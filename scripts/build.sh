#! /bin/bash

yarn install

build_paths=(
  learn-data-structure
)

for path in ${build_paths[@]}; do
  echo "build ${path}"
  yarn docs:build "${path}"
done
