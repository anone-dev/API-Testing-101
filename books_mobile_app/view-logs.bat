@echo off
echo ========================================
echo   Flutter Debug Logs Viewer
echo ========================================
echo.
echo Select log viewing option:
echo.
echo [1] Flutter logs (recommended)
echo [2] Flutter logs - verbose
echo [3] Android logcat - all
echo [4] Android logcat - Flutter only
echo [5] Android logcat - Errors only
echo [6] Clear logs and start fresh
echo.
set /p choice="Enter choice (1-6): "

if "%choice%"=="1" (
    echo.
    echo Showing Flutter logs...
    echo Press Ctrl+C to stop
    echo.
    flutter logs
)

if "%choice%"=="2" (
    echo.
    echo Showing verbose Flutter logs...
    echo Press Ctrl+C to stop
    echo.
    flutter logs -v
)

if "%choice%"=="3" (
    echo.
    echo Showing all Android logs...
    echo Press Ctrl+C to stop
    echo.
    adb logcat
)

if "%choice%"=="4" (
    echo.
    echo Showing Flutter-only logs...
    echo Press Ctrl+C to stop
    echo.
    adb logcat | findstr "flutter"
)

if "%choice%"=="5" (
    echo.
    echo Showing errors only...
    echo Press Ctrl+C to stop
    echo.
    adb logcat *:E
)

if "%choice%"=="6" (
    echo.
    echo Clearing logs...
    adb logcat -c
    echo Logs cleared!
    echo.
    echo Starting fresh logs...
    adb logcat
)

pause
