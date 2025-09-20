@echo off
echo Starting Astrology Website - Full Stack...
echo.

echo Starting Backend Server...
cd backend
start "Backend Server" cmd /k "npm run dev"
cd ..

echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
cd frontend
start "Frontend Server" cmd /k "npm run dev"
cd ..

echo.
echo Both servers are starting...
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo Payment Health Check: http://localhost:3001/api/payment/health
echo.
pause