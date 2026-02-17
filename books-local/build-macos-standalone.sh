#!/bin/bash
echo "========================================"
echo "Building Books API Standalone for macOS..."
echo "========================================"

pip3 install -r build-requirements.txt

pyinstaller --onefile \
  --add-data "ui.html:." \
  --add-data "api-docs.html:." \
  --add-data "swagger-local.yaml:." \
  --name "BooksAPI-macOS" \
  app_standalone.py

echo ""
echo "========================================"
echo "✅ Build complete!"
echo "📦 File: dist/BooksAPI-macOS"
echo ""
echo "🚀 To run: ./BooksAPI-macOS"
echo "🌐 Browser will open automatically"
echo "========================================"
