@echo off
echo ========================================
echo   Creating App Icon
echo ========================================
echo.

echo This script will guide you to create an app icon.
echo.
echo Option 1: Use online tool (Recommended)
echo   1. Go to: https://icon.kitchen/
echo   2. Upload your icon image or use emoji: 📚
echo   3. Download the icon pack
echo   4. Extract to: android\app\src\main\res\
echo.
echo Option 2: Use flutter_launcher_icons package
echo   1. Add to pubspec.yaml:
echo      dev_dependencies:
echo        flutter_launcher_icons: ^0.13.1
echo.
echo      flutter_icons:
echo        android: true
echo        ios: true
echo        image_path: "assets/icon.png"
echo.
echo   2. Run: flutter pub get
echo   3. Run: flutter pub run flutter_launcher_icons
echo.
echo Current icon location:
echo   android\app\src\main\res\mipmap-*\ic_launcher.png
echo.
echo ========================================

pause
