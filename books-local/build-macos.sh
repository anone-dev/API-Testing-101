#!/bin/bash
echo "========================================"
echo "Building Books API for macOS..."
echo "========================================"

# Install dependencies
pip3 install -r build-requirements.txt

# Build executable
pyinstaller --onefile --noconsole \
  --add-data "ui.html:." \
  --add-data "api-docs.html:." \
  --add-data "swagger-local.yaml:." \
  --name "BooksAPI-macOS" \
  app.py

echo ""
echo "========================================"
echo "Build complete!"
echo "Executable: dist/BooksAPI-macOS"
echo "========================================"
