@echo off
REM Запуск фронтенда с правильной установкой переменной NODE_PATH
REM Добавляем C:\nodejs в PATH
set PATH=C:\nodejs;%PATH%

REM Переходим в папку фронтенда
cd /d "%~dp0frontend"

REM Запускаем npm run dev
C:\nodejs\npm.cmd run dev

pause
