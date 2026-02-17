@echo off
echo ========================================
echo   Creating App Icon
echo ========================================
echo.

echo Installing required package...
pip install Pillow

echo.
echo Generating icons...
python create_icon.py

echo.
pause
