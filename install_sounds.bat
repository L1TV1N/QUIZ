@echo off
REM Script to copy sounds to the project

setlocal enabledelayedexpansion

set "SOURCE=C:\Users\nikli\Downloads\sounds"
set "DEST=frontend\public\sounds"

echo.
echo 🔊 Установка звуков
echo ========================
echo.

REM Создаём папку если её нет
if not exist "%DEST%" (
    echo 📁 Создаю папку %DEST%...
    mkdir "%DEST%"
    echo ✅ Папка создана
) else (
    echo ✅ Папка %DEST% уже существует
)

echo.
echo 🔊 Копирую звуки...
echo.

setlocal enabledelayedexpansion
set COUNT=0

for %%f in (
    "далее.mp3"
    "назад.mp3" 
    "выбор.mp3"
    "анкета отправлена.mp3"
    "ошибка.mp3"
) do (
    if exist "%SOURCE%\%%f" (
        copy "%SOURCE%\%%f" "%DEST%\%%f" >nul
        echo   ✅ %%f
        set /a COUNT+=1
    ) else (
        echo   ❌ %%f - не найден
    )
)

echo.
echo ========================
echo 📊 Результат: %COUNT%/5 файлов скопировано
echo ========================
echo.

if %COUNT% equ 5 (
    echo 🎉 Все звуки успешно установлены!
    echo.
    echo Следующие шаги:
    echo   1. npm run dev (перезагрузить фронтенд)
    echo   2. Открыть http://localhost:5173
    echo   3. Протестировать звуки на квизе
) else (
    echo ⚠️ Некоторые файлы не были скопированы
    echo.
    echo Проверьте:
    echo   • Путь источника: %SOURCE%
    echo   • Все ли MP3 файлы есть в папке Downloads\sounds
)

echo.
pause
