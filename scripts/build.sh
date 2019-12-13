#! /bin/bash

yarn install

ignore_dirs=(
  .git
  .github
  node_modules
  scripts
)

echo "Work in $(pwd)"
current_dirs=$(ls -l | awk '/^d/ {print $NF}')

for path in ${current_dirs[@]}
do
  if echo "${ignore_dirs[@]}" | grep -w "${path}" &> /dev/null
  then
    echo "skip path ${path}"
  else
    echo "build ${path}"
    yarn run build ${path}
  fi
done
