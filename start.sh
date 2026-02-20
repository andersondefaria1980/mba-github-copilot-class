#!/bin/bash

echo "🚀 Starting Customer Registration System..."
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "   Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "   Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose detected"
echo ""

# Stop and remove previous containers and volumes
echo "🧹 Cleaning previous containers and volumes..."
docker compose down -v

echo ""
echo "🔨 Building and starting containers..."
docker compose up --build -d

echo ""
echo "⏳ Waiting for services to initialize..."
sleep 10

echo ""
echo "✅ Application started!"
echo ""
echo "🌐 Access: http://localhost"
echo ""
echo "🔐 Default credentials:"
echo "   Username: admin"
echo "   Password: pass"
echo ""
echo "📊 To view logs, run: docker compose logs -f"
echo "🛑 To stop the application, run: ./stop.sh"
echo ""
