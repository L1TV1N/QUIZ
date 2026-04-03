# 🎨 Smart Quiz - Interior Design Hackathon MVP

Адаптивный smart-квиз для сбора заявок на дизайн интерьера с AI-генерацией персональных рекомендаций.

## 🚀 Быстрый старт (30 сек)

### 1. Запустить Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Backend будет доступен на **http://localhost:5000**

### 2. Запустить Frontend (в новом терминале)

```bash
cd frontend
npm install
npm run dev
```

Frontend будет доступен на **http://localhost:5173**

---

## 📋 Структура проекта

```
UMI/
├── backend/                      # Python + Flask + SQLite
│   ├── app.py                   # Main Flask app
│   ├── models.py                # SQLAlchemy models
│   ├── routes.py                # API endpoints
│   ├── services/
│   │   ├── ai_service.py        # AI с fallback
│   │   └── telegram_service.py  # Telegram интеграция
│   ├── requirements.txt
│   ├── database.db              # SQLite DB (создаётся)
│   └── .env                     # Переменные окружения
│
├── frontend/                    # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   ├── steps/           # 6 шагов квиза
│   │   │   ├── ui/              # UI компоненты
│   │   │   └── ResultScreen.jsx # Финальный результат
│   │   ├── store/               # Zustand (quizState)
│   │   ├── services/            # API клиент
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── КОНСТИТУЦИЯ ПРОЕКТА.txt      # Требования и принципы
```

---

## 🎯 Функции

### ✅ Реализовано
- 6-шаговый адаптивный квиз
- Zustand state management (quizState)
- Framer Motion анимации
- Tailwind CSS (премиум минимализм)
- REST API (Flask)
- SQLite база данных
- AI-генерация результатов с fallback
- Telegram уведомления (опционально)

### 📝 Квиз структура
1. **Intro** - захват внимания
2. **Property Type** - какое помещение
3. **Parameters** - площадь, комнаты, состояние
4. **Style** - выбор стилей интерьера
5. **Budget & Timeline** - бюджет и сроки
6. **Contacts** - имя и контакт
7. **Result** - AI-результат (финальный вау)

---

## 🔧 Настройка Telegram (опционально)

### Создать Telegram Bot Token

1. Напишите `@BotFather` в Telegram
2. Введите `/newbot`
3. Следуйте инструкциям
4. Скопируйте Bot Token и Chat ID

### Установить переменные окружения

Создайте `backend/.env`:

```bash
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

Без этого приложение работает, но уведомления не отправляются (видите warning в консоли).

---

## 🤖 AI персонализация

### Текущее состояние: Fallback
Приложение использует **шаблонную генерацию** с подстановкой данных пользователя.

### Будущее: Реальный AI
Когда получите доступ к API (GigaChat, OpenAI, Anthropic):

1. Отредактируйте `backend/services/ai_service.py`
2. Добавьте реальное подключение
3. Обновите `backend/.env` с API ключом

⚠️ **Бюджет = 0** - используйте только бесплатные API или локальные модели!

---

## 🧪 Тестирование

### Manual Test (Frontend)
```
http://localhost:5173
```

Пройдите квиз полностью и проверьте:
- ✅ Все 6 шагов работают
- ✅ Состояние сохраняется
- ✅ Анимации плавные
- ✅ Финальный результат красивый

### API Test (curl)
```bash
curl -X POST http://localhost:5000/api/submit-quiz \
  -H "Content-Type: application/json" \
  -d '{
    "propertyType": "apartment",
    "area": "60",
    "rooms": "2",
    "condition": "renovation",
    "style": ["minimalism", "scandinavian"],
    "budget": "medium",
    "timeline": "month",
    "name": "Иван",
    "contact": "+7(999)123-45-67"
  }'
```

### Database
SQLite база創создаётся автоматически при первом запуске.

Посмотреть заявки:
```bash
# Backend должен быть выключен
sqlite3 backend/database.db "SELECT * FROM leads;"
```

---

## 🎨 UX/UI особенности

- **Mobile-first принцип** (адаптация в приоритет)
- **Плавные анимации** (Framer Motion)
- **Премиум минимализм** (Apple/Airbnb стиль)
- **Progress bar** (показываем прогресс 3/6)
- **Микро-интерактивность** (hover, scale, transitions)

---

## 🚨 Troubleshooting

### ❌ Frontend не подключается к Backend

```
CORS error / Network error
```

**Решение:**
- Убедитесь, что backend запущен на `http://localhost:5000`
- Проверьте брандмауэр
- Используйте `curl http://localhost:5000/api/health`

### ❌ npm install fails

```bash
# Используйте npm 8+
node -v  # должен быть 16+
npm -v   # должен быть 8+
```

### ❌ Python зависимости

```bash
# Используйте venv
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
```

---

## 📱 Демо во время защиты

### Сценарий (2-3 минуты)
1. Открыть `http://localhost:5173`
2. Нажать "Начать квиз"
3. Быстро ответить на 5 вопросов (~2 минуты)
4. Показать красивый AI-результат
5. Сказать: "Заявка отправлена менеджеру" (или в Telegram бот)

### Вау-эффекты
- ✨ Плавные анимации между шагами
- 🎨 Красивый финальный экран
- 🤖 Персональный AI-результат
- 📱 Адаптив на мобильных

---

## 🚀 Следующие шаги (если есть время)

1. **AI API интеграция** (GigaChat / OpenAI)
2. **Картинки для стилей** (загрузить assets)
3. **Admin панель** (посмотреть заявки)
4. **Email рассылка** (письма вместо Telegram)
5. **Анализ метрик** (сколько прошли до финала)

---

## 📧 Поддержка

Если что-то не работает:
1. Проверьте дебаг-консоль (F12)
2. Посмотрите терминал backend/frontend
3. Удалите `node_modules` и переустановите

---

**Создано для Hack2026 🚀**
