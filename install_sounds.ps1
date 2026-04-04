# PowerShell script to copy sounds to the project

# Пути
$sourcePath = "C:\Users\nikli\Downloads\sounds"
$destPath = "frontend\public\sounds"

# Создаём папку если её нет
if (-not (Test-Path $destPath)) {
    Write-Host "📁 Создаю папку $destPath..." -ForegroundColor Cyan
    New-Item -ItemType Directory -Force -Path $destPath | Out-Null
} else {
    Write-Host "✅ Папка $destPath уже существует" -ForegroundColor Green
}

# Копируем файлы
Write-Host ""
Write-Host "🔊 Копирую звуки..." -ForegroundColor Cyan

$files = @(
    "далее.mp3",
    "назад.mp3",
    "выбор.mp3",
    "анкета отправлена.mp3",
    "ошибка.mp3"
)

$successCount = 0
$failCount = 0

foreach ($file in $files) {
    $sourceFile = Join-Path $sourcePath $file
    $destFile = Join-Path $destPath $file
    
    if (Test-Path $sourceFile) {
        Copy-Item $sourceFile -Destination $destFile -Force
        Write-Host "  ✅ $file" -ForegroundColor Green
        $successCount++
    } else {
        Write-Host "  ❌ $file - не найден" -ForegroundColor Red
        $failCount++
    }
}

Write-Host ""
Write-Host "📊 Результат:" -ForegroundColor Cyan
Write-Host "  ✅ Скопировано: $successCount файлов" -ForegroundColor Green
if ($failCount -gt 0) {
    Write-Host "  ❌ Ошибок: $failCount файлов" -ForegroundColor Red
}

Write-Host ""
if ($successCount -eq 5) {
    Write-Host "🎉 Все звуки успешно установлены!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Siguiente шаги:" -ForegroundColor Yellow
    Write-Host "  1. npm run dev (перезагрузить фронтенд)" -ForegroundColor Yellow
    Write-Host "  2. Открыть http://localhost:5173" -ForegroundColor Yellow
    Write-Host "  3. Протестировать звуки на квизе" -ForegroundColor Yellow
} else {
    Write-Host "⚠️ Некоторые файлы не были скопированы" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Проверьте:" -ForegroundColor Yellow
    Write-Host "  • Путь источника: $sourcePath" -ForegroundColor Yellow
    Write-Host "  • Все ли MP3 файлы есть в папке Downloads\sounds" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Нажмите Enter для выхода..."
Read-Host
