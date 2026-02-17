@echo off
setlocal enabledelayedexpansion

echo ========================================
echo   Books Mobile App - Simple Runner
echo ========================================
echo.

REM Check if API server is running
echo Checking API server...
curl -s http://localhost:5000/status >nul 2>&1
if errorlevel 1 (
    echo WARNING: API server not running!
    echo Please start it first: cd ..\books-local ^&^& start.bat
    echo.
    pause
    exit /b 1
)

echo API server is running!
echo.

REM Try to run on Windows
echo Attempting to run on Windows Desktop...
echo.
set FLUTTER_CMD=flutter.bat
%FLUTTER_CMD% run -d windows

if errorlevel 1 (
    echo.
    echo ========================================
    echo   Alternative: Run on Chrome
    echo ========================================
    echo.
    %FLUTTER_CMD% run -d chrome
)

pause
