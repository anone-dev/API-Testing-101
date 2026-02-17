@echo off
echo ========================================
echo Building Books API for Windows...
echo ========================================

REM Install dependencies
pip install -r build-requirements.txt

REM Build executable
pyinstaller --onefile --noconsole ^
  --add-data "ui.html;." ^
  --add-data "api-docs.html;." ^
  --add-data "swagger-local.yaml;." ^
  --name "BooksAPI-Windows" ^
  --icon NONE ^
  app.py

echo.
echo ========================================
echo Build complete!
echo Executable: dist\BooksAPI-Windows.exe
echo ========================================
pause
