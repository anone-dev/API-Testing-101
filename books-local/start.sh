#!/bin/bash

echo "Starting Simple Books API..."

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

echo "Installing dependencies..."
venv/bin/pip install -r requirements.txt

echo ""
echo "Starting API Server on http://localhost:5000"
venv/bin/python app.py &
API_PID=$!

sleep 2

echo "Starting Web UI on http://localhost:8000"
python3 -m http.server 8000 &
UI_PID=$!

sleep 2

echo "Opening browser..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:8000/ui.html
else
    xdg-open http://localhost:8000/ui.html 2>/dev/null
fi

echo ""
echo "Done! Press Ctrl+C to stop all servers."
echo "API Server PID: $API_PID"
echo "Web UI PID: $UI_PID"

trap "kill $API_PID $UI_PID 2>/dev/null; exit" INT TERM

wait
