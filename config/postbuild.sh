#!/usr/bin/env bash

mkdir -p build/calc
ls build/ |\
grep -v 'calc' |\
xargs -i@ cp -r "$(pwd)/build/@" 'build/calc/'
