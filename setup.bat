@echo off
REM Smart Quiz - Automatic Setup Script for Windows
REM This script will install all dependencies and prepare the project

cls
echo.
echo ========================================
echo  SMART QUIZ - SETUP
echo ========================================
echo.
echo Automatic installation in progress...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERROR: Node.js is not installed!
    echo Please download and install from: https://nodejs.org
    echo.
    pause
    exit /b 1
)

echo [1/4] Node.js found: 
node --version

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERROR: Python is not installed!
    echo Please download and install from: https://python.org
    echo.
    pause
    exit /b 1
)

echo [2/4] Python found: 
python --version
echo.

REM Setup Backend
echo [3/4] Setting up Backend...
cd backend
if not exist venv (
    python -m venv venv
)
call venv\Scripts\activate.bat
pip install -q -r requirements.txt >nul 2>&1
if errorlevel 1 (
    echo ERROR: Failed to install Python dependencies
    pause
    exit /b 1
)
echo Backend dependencies installed successfully!

REM Setup Frontend
echo [4/4] Setting up Frontend...
cd ..\frontend
if exist "node_modules" (
    echo Frontend dependencies already installed
) else (
    call npm install --quiet
    if errorlevel 1 (
        echo ERROR: Failed to install npm dependencies
        pause
        exit /b 1
    )
)
echo Frontend dependencies installed successfully!

cd ..

echo.
echo ========================================
echo SUCCESS! Setup completed!
echo ========================================
echo.
echo To start the project:
echo 1. Open run_all.bat (it will open both backend and frontend)
echo.
echo Or run manually:
echo   - Backend: cd backend ^&^& python app.py
echo   - Frontend: cd frontend ^&^& npm run dev
echo.
echo Frontend: http://localhost:5173
echo Admin Panel: http://localhost:5173/admin (password: admin2026)
echo Backend: http://localhost:5000
echo.
pause
