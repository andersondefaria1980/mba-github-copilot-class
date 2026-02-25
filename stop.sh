#!/bin/bash

echo "🛑 Stopping Customer Registration System..."
echo ""

# Stop and remove all containers (volumes are preserved)
docker compose down

echo ""
echo "✅ Application stopped (volumes preserved)"
echo ""
echo "🚀 To start again, run: ./start.sh"
echo ""
