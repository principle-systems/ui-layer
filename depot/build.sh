#!/bin/bash
cd "$(dirname "$0")"
browserify -t babelify js/main.js -o ../public/depot/bundle.js
