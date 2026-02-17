@echo off
echo Starting Simple Books API...

if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

echo Installing dependencies...
call venv\Scripts\pip.exe install -r requirements.txt

echo.
echo Starting API Server on http://localhost:5000
start "API Server" cmd /k "venv\Scripts\python.exe app.py"

timeout /t 2 /nobreak >nul

echo Starting Web UI on http://localhost:8000
start "Web UI" cmd /k "python -m http.server 8000"

timeout /t 2 /nobreak >nul

echo Opening browser...
start http://localhost:8000/ui.html

echo.
echo Done! Close the terminal windows to stop the servers.
