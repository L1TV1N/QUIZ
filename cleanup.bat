@echo off
REM Скрипт для очистки лишних файлов перед выгрузкой на GitHub
REM Запустите: cleanup.bat

echo.
echo ===================================================
echo Cleanup: Удаление временных файлов
echo ===================================================
echo.

REM Удаляем временные файлы документации
echo [1/5] Удаляю текстовые файлы...
if exist "БЫСТРЫЙ СТАРТ.txt" del /F /Q "БЫСТРЫЙ СТАРТ.txt"
if exist "ГОТОВО_К_ЗАПУСКУ.txt" del /F /Q "ГОТОВО_К_ЗАПУСКУ.txt"
if exist "КОНСТИТУЦИЯ ПРОЕКТА.txt" del /F /Q "КОНСТИТУЦИЯ ПРОЕКТА.txt"
if exist "FULL_INTEGRATION.txt" del /F /Q "FULL_INTEGRATION.txt"
echo ✓ Текстовые файлы удалены

REM Удаляем .bat файлы
echo [2/5] Удаляю .bat файлы...
if exist "run_all.bat" del /F /Q "run_all.bat"
if exist "run_backend.bat" del /F /Q "run_backend.bat"
if exist "run_frontend.bat" del /F /Q "run_frontend.bat"
echo ✓ .bat файлы удалены

REM Удаляем тестовый скрипт
echo [3/5] Удаляю тестовый скрипт...
if exist "test_api.py" del /F /Q "test_api.py"
echo ✓ test_api.py удален

REM Удаляем БД и временные файлы
echo [4/5] Удаляю базу данных и временные файлы...
if exist "database.db" del /F /Q "database.db"
if exist "README_NEW.md" del /F /Q "README_NEW.md"
echo ✓ Временные файлы удалены

REM Удаляем старый файл инструкций
echo [5/5] Удаляю старые инструкции...
if exist "GITHUB_UPLOAD.md" del /F /Q "GITHUB_UPLOAD.md"
echo ✓ Инструкции обновлены

echo.
echo ===================================================
echo ✓ Очистка завершена!
echo ===================================================
echo.
echo Проект готов к выгрузке на GitHub
echo Выполните:
echo.
echo   git add -A
echo   git commit -m "Clean up: Remove temporary files"
echo   git push
echo.
pause
