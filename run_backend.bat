@echo off
REM Скрипт для быстрого запуска Backend на Windows

cls
echo.
echo ========================================
echo  SMART QUIZ - Backend Startup
echo ========================================
echo.

cd backend

echo [1/3] Проверка Python...
python --version > nul 2>&1
if errorlevel 1 (
    echo ❌ Python не установлен!
    echo Установите Python с python.org
    pause
    exit /b 1
)
echo ✅ Python найден

echo.
echo [2/3] Установка зависимостей...
python -m pip install -q -r requirements.txt
if errorlevel 1 (
    echo ❌ Ошибка при установке зависимостей
    pause
    exit /b 1
)
echo ✅ Зависимости установлены

echo.
echo [3/3] Запуск backend...
echo.
echo ✨ Backend запускается на http://localhost:5000
echo.
python app.py

pause
