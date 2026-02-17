@echo off
echo ========================================
echo Building Books API Standalone for Windows...
echo ========================================

pip install -r build-requirements.txt

pyinstaller --onefile ^
  --add-data "ui.html;." ^
  --add-data "api-docs.html;." ^
  --add-data "swagger-local.yaml;." ^
  --name "BooksAPI-Windows" ^
  --icon NONE ^
  app_standalone.py

echo.
echo ========================================
echo ✅ Build complete!
echo 📦 File: dist\BooksAPI-Windows.exe
echo.
echo 🚀 To run: Double-click BooksAPI-Windows.exe
echo 🌐 Browser will open automatically
echo ========================================
pause
