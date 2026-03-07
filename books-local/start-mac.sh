#!/bin/bash

# macOS-specific startup script with custom ports to avoid AirPlay conflict

export API_PORT=5001
export UI_PORT=8000

echo "🍎 macOS detected - Using port 5001 to avoid AirPlay conflict"
echo ""

./start.sh
