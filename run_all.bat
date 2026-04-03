@echo off
REM Это лучший способ - запустить ВСЁ одновременно в разных окнах

cls
echo.
echo ========================================
echo  SMART QUIZ - Full Stack Startup
echo ========================================
echo.
echo Это окно запустит Backend и Frontend в разных окнах
echo.
pause

echo.
echo [1/2] Запуск Backend (localhost:5000)...
start "Smart Quiz Backend" cmd /k "cd /d %cd% && run_backend.bat"

echo [2/2] Запуск Frontend (localhost:5173)...
timeout /t 3 /nobreak
start "Smart Quiz Frontend" cmd /k "cd /d %cd% && run_frontend.bat"

echo.
echo ✅ Оба сервера запущены!
echo.
echo 🌐 Frontend: http://localhost:5173
echo 🔌 Backend:  http://localhost:5000/api/health
echo.
pause
