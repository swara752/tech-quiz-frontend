#!/bin/bash

# TechQuiz Backend Server Startup Script
# This script helps you start the Django backend server

echo "🚀 TechQuiz Backend Server Startup"
echo "===================================="
echo ""

# Navigate to the Django project directory
cd "$(dirname "$0")/TechQuiz_TIC" || exit 1

echo "📂 Current directory: $(pwd)"
echo ""

# Check if virtual environment exists
if [ -d "../.venv" ]; then
    echo "✅ Virtual environment found"
    echo "🔄 Activating virtual environment..."
    source ../.venv/bin/activate
else
    echo "⚠️  Virtual environment not found at ../.venv"
    echo "   You may need to create one first:"
    echo "   python3 -m venv .venv"
    echo "   source .venv/bin/activate"
    echo "   pip install -r requirements.txt"
    echo ""
fi

# Check if manage.py exists
if [ ! -f "manage.py" ]; then
    echo "❌ Error: manage.py not found!"
    echo "   Make sure you're in the correct directory"
    exit 1
fi

echo "✅ Django project found"
echo ""

# Check if migrations are needed
echo "🔍 Checking database migrations..."
python manage.py showmigrations --plan 2>/dev/null | grep -q "\[ \]"
if [ $? -eq 0 ]; then
    echo "⚠️  Unapplied migrations detected"
    echo "   Run: python manage.py migrate"
    echo ""
fi

# Check if port 8000 is already in use
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Port 8000 is already in use!"
    echo "   Another server might be running."
    echo "   To kill it, run: lsof -ti:8000 | xargs kill -9"
    echo ""
    read -p "Do you want to kill the existing process? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        lsof -ti:8000 | xargs kill -9
        echo "✅ Killed existing process"
    else
        echo "❌ Exiting..."
        exit 1
    fi
fi

echo "🚀 Starting Django development server..."
echo "   Server will be available at: http://localhost:8000"
echo "   Press Ctrl+C to stop the server"
echo ""
echo "===================================="
echo ""

# Start the server
python manage.py runserver
