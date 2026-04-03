# 📤 Инструкция: Выгрузка на GitHub

## Шаг 1: Создать репозиторий на GitHub

1. Откройте [GitHub](https://github.com/new)
2. Заполните поля:
   - **Repository name:** `smart-interior-quiz` (или любое другое имя)
   - **Description:** "Smart Interior Quiz MVP - AI-powered interior design recommendations"
   - **Visibility:** Public (если хотите делиться) или Private
   - **Initialize:** НЕ выбирайте (у нас уже есть файлы)
3. Нажмите "Create repository"

## Шаг 2: Добавьте remote и выгрузите код

Скопируйте и выполните в PowerShell (в директории проекта):

```powershell
cd 'c:\Users\nikli\OneDrive\Рабочий стол\нужно\hack2026\UMI'

# Замените YOUR_USERNAME на ваш GitHub username
git remote add origin https://github.com/YOUR_USERNAME/smart-interior-quiz.git
git branch -M main
git push -u origin main
```

## Шаг 3: Очистите лишние файлы (опционально)

Удалите эти файлы из директории (они не нужны в репозитории):
- `БЫСТРЫЙ СТАРТ.txt`
- `ГОТОВО_К_ЗАПУСКУ.txt`
- `КОНСТИТУЦИЯ ПРОЕКТА.txt`
- `FULL_INTEGRATION.txt`
- `run_all.bat`, `run_backend.bat`, `run_frontend.bat`
- `test_api.py`
- `database.db`

Затем:
```powershell
git add -A
git commit -m "Clean up: Remove temporary startup files"
git push
```

## Шаг 4: Проверьте на GitHub

Откройте https://github.com/YOUR_USERNAME/smart-interior-quiz

Должны увидеть:
✅ Все файлы проекта
✅ README.md с документацией
✅ .gitignore с исключениями
✅ Правильная структура папок

## Готово! 🎉

Теперь ваш проект на GitHub и доступен для других разработчиков!

### Дополнительно: Добавить .env пример

Рекомендуется добавить `.env.example`:

```powershell
# Windows
echo "TELEGRAM_BOT_TOKEN=your_token_here`nTELEGRAM_CHAT_ID=your_chat_id" > backend\.env.example
git add backend\.env.example
git commit -m "Add .env.example template"
git push
```

### Дополнительно: Добавить LICENSE

Для проекта MIT лицензии:

```powershell
# Создайте файл backend/LICENSE
# Или добавьте MIT лицензию через GitHub (при создании репо есть опция)
```

Готово к запуску на GitHub! 🚀
