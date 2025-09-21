#!/bin/bash

# Valkyrie Development Startup Script
# This script starts both backend and frontend in development mode

echo "🚀 Starting Valkyrie in Development Mode..."

# Function to kill background processes on exit
cleanup() {
    echo "🛑 Stopping development servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}
trap cleanup SIGINT SIGTERM

# Start Backend
echo "📡 Starting backend server..."
cd backend
export DATABASE_URL="sqlite:///./dev_valkyrie.db"
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 6789 --reload &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start Frontend
echo "🎨 Starting frontend server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Development servers started!"
echo "📍 Backend API: http://localhost:6789"
echo "📍 Frontend UI: http://localhost:3000 (or 3001)"
echo "📍 API Docs: http://localhost:6789/docs"
echo ""
echo "🔓 Development Mode: Authentication disabled"
echo "💡 You can now edit the frontend freely!"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for processes
wait
