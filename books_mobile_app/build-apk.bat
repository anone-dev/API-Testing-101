@echo off
setlocal enabledelayedexpansion

echo ========================================
echo   Build APK for Android
echo ========================================
echo.

echo [1/3] Cleaning previous builds...
call flutter clean
echo.

echo [2/3] Getting dependencies...
call flutter pub get
echo.

echo [3/3] Building APK...
echo This may take several minutes...
echo.
call flutter build apk --release
echo.

if errorlevel 1 (
    echo.
    echo ========================================
    echo   Build FAILED!
    echo ========================================
    pause
    exit /b 1
)

echo ========================================
echo   Build SUCCESS!
echo ========================================
echo.
echo APK Location:
echo build\app\outputs\flutter-apk\app-release.apk
echo.
echo File size:
for %%A in ("build\app\outputs\flutter-apk\app-release.apk") do echo %%~zA bytes
echo.
echo You can install this APK on:
echo - Android Emulator
echo - Physical Android Device
echo - Use with Appium for automation testing
echo.
echo ========================================

pause
