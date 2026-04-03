@echo off
REM Скрипт для быстрого запуска Frontend на Windows

cls
echo.
echo ========================================
echo  SMART QUIZ - Frontend Startup
echo ========================================
echo.

cd frontend

echo [1/3] Проверка Node.js...
node --version > nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js не установлен!
    echo Установите Node.js с nodejs.org
    pause
    exit /b 1
)
echo ✅ Node.js найден: 
node --version

echo.
echo [2/3] Установка зависимостей (даже если уже установлены)...
call npm install > nul 2>&1
if errorlevel 1 (
    echo ❌ Ошибка при установке зависимостей
    pause
    exit /b 1
)
echo ✅ Зависимости готовы

echo.
echo [3/3] Запуск frontend...
echo.
echo ✨ Frontend запускается на http://localhost:5173
echo.
pause
call npm run dev
