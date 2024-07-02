# just is a command runner, Justfile is very similar to Makefile, but simpler.

# use nushell for shell commands
set shell := ["nu", "-c"]

default:
  @just --list

md-to-html file:
  open {{file}} |
  to text |
  (
    http post --headers [Accept application/vnd.github+json]
              --headers [X-GitHub-Api-Version 2022-11-28] 
              --content-type application/json
              https://api.github.com/markdown { text: $in }
  ) |
  save ({{file}} | str replace -r '.md$' '.html')

md-to-pdf file:
  pandoc --pdf-engine=xelatex \
         -V CJKmainfont="KaiTi" \
         -V geometry:"top=2cm, bottom=1.5cm, left=2cm, right=2cm" \
         --highlight-style zenburn \
         -f gfm \
         -o ({{file}} | str replace -r '.md$' '.html') \
         {{file}}

