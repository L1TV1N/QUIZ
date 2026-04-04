# PowerShell скрипт для открытия админ-панели

Write-Host "🔐 Открываю администраторскую панель..." -ForegroundColor Cyan
Write-Host ""

# Открыть админ-панель в браузере
$adminUrl = "http://localhost:5173/admin"

# Проверяем если браузер доступен
try {
    Start-Process $adminUrl
    Write-Host "✅ Админ-панель открывается в браузере..." -ForegroundColor Green
} catch {
    Write-Host "❌ Ошибка при открытии браузера" -ForegroundColor Red
    Write-Host "💻 Откройте вручную: $adminUrl" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📝 Пароль: admin2026" -ForegroundColor Yellow
Write-Host "⏱️  Сессия действительна 24 часа" -ForegroundColor Yellow
Write-Host ""
Write-Host "💡 Убедитесь что:" -ForegroundColor Cyan
Write-Host "   ✓ Backend запущен (python app.py)" -ForegroundColor Gray
Write-Host "   ✓ Frontend запущен (npm run dev)" -ForegroundColor Gray
Write-Host ""
Write-Host "Нажмите Enter для закрытия..." -ForegroundColor Gray
Read-Host
