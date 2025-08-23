@echo off
echo Setting up Folk Flame Digital Backend...

echo.
echo Installing backend dependencies...
cd backend
npm install

echo.
echo Starting MongoDB (make sure MongoDB is installed)...
echo Please ensure MongoDB is running on localhost:27017

echo.
echo Seeding database with initial content...
node scripts/seedDatabase.js

echo.
echo Starting backend server...
npm run dev

echo.
echo Backend setup complete!
echo API available at: http://localhost:3001
echo Health check: http://localhost:3001/api/health
pause
