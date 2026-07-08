#!/usr/bin/env bash
mkdir -p dist dist/.well-known
cp index.html dist/index.html
cp landing.html dist/ 2>/dev/null
cp manifest.json dist/ 2>/dev/null
cp favicon.png dist/ 2>/dev/null
cp icon-*.png dist/ 2>/dev/null
cp shani-finance.html dist/ 2>/dev/null
cp marketing/og-banner.png dist/og-banner.png 2>/dev/null
cp og.jpg dist/og.jpg 2>/dev/null
cp twa/assetlinks.json dist/.well-known/assetlinks.json 2>/dev/null
true
