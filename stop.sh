#!/bin/bash

echo "🛑 Stopping Customer Registration System..."
echo ""

# Stop and remove all containers and volumes
docker compose down -v

echo ""
echo "✅ Application stopped and volumes removed"
echo ""
echo "🚀 To start again, run: ./start.sh"
echo ""
