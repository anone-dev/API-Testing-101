#!/bin/bash

# Default ports
API_PORT=${API_PORT:-5000}
UI_PORT=${UI_PORT:-8000}

echo "Starting Simple Books API..."

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

echo "Installing dependencies..."
venv/bin/pip install -r requirements.txt

echo ""
echo "Starting API Server on http://localhost:$API_PORT"
API_PORT=$API_PORT venv/bin/python app.py &
API_PID=$!

sleep 2

echo "Starting Web UI on http://localhost:$UI_PORT"
python3 -m http.server $UI_PORT &
UI_PID=$!

sleep 2

echo "Opening browser..."
if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:$UI_PORT/ui.html
else
    xdg-open http://localhost:$UI_PORT/ui.html 2>/dev/null
fi

echo ""
echo "============================================================"
echo "  🌐 Server: http://localhost:$API_PORT"
echo "  🎨 Web UI: http://localhost:$UI_PORT/ui.html"
echo "  📖 API Docs: http://localhost:$UI_PORT/api-docs.html"
echo "============================================================"
echo ""
echo "Done! Press Ctrl+C to stop all servers."
echo "API Server PID: $API_PID"
echo "Web UI PID: $UI_PID"

trap "kill $API_PID $UI_PID 2>/dev/null; exit" INT TERM

wait
