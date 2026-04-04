@echo off
REM Скрипт для открытия админ-панели

echo 🔐 Открываю администраторскую панель...
echo.

REM Способ 1: Открыть через React маршрут
start http://localhost:5173/admin

REM Способ 2 (Альтернатива): Открыть HTML файл напрямую
REM start http://localhost:5173/admin.html

echo.
echo ✅ Админ-панель открывается в браузере...
echo.
echo 📝 Пароль: admin2026
echo ⏱️  Сессия действительна 24 часа
echo.
echo 💡 Убедитесь что:
echo    ✓ Backend запущен (python app.py)
echo    ✓ Frontend запущен (npm run dev)
echo.
pause
