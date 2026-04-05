# � Smart Quiz - Interior Design AI Assistant

**Интеллектуальная система для разработки дизайн-проектов помещений с использованием ИИ**

![Version](https://img.shields.io/badge/version-2.0-blue)
![Status](https://img.shields.io/badge/status-production-green)

<img width="960" height="843" alt="iMac 24 Mockup on a Textured Rock Base with Dramatic Lighting (Mockuuups Studio)" src="https://github.com/user-attachments/assets/d6248387-65b8-4ab4-9b16-2f860df4a2c7" />


---

## 🚀 БЫСТРЫЙ СТАРТ (За 2 Клика!)

### Способ 1 - САМЫЙ БЫСТРЫЙ (Windows)
```bash
# Просто откройте этот файл двойным кликом:
setup.bat
```
Смотрите инструкции на экране - всё установится автоматически!

### Способ 2 - Вручную
```bash
# Backend
cd backend
pip install -r requirements.txt
python app.py

# Frontend (в новом терминале)
cd frontend
npm install
npm run dev
```

**Результат:**
- 🌐 Frontend: http://localhost:5173
- 🔌 Backend: http://localhost:5000
- 👨‍💼 Admin Panel: http://localhost:5173/admin (пароль: admin2026)

---

## ⚡ Требования (Проверьте сначала!)

```bash
# Должны быть установлены:
node --version    # v16+ (скачать с nodejs.org)
python --version  # 3.8+ (скачать с python.org)
git --version     # опционально
```

Не установлены? Скачайте:
- **Node.js (npm)**: https://nodejs.org
- **Python**: https://python.org
- **Git**: https://git-scm.com (опционально)

---

## ✨ Ключевые Функции

### 🎯 Для Пользователей
- 🤖 **AI Режим** - Адаптивные вопросы на основе ответов
- 📝 **Обычный Режим** - Быстрое заполнение формы
- 🎨 **Красивый UI** - Современный дизайн с анимациями
- 🔊 **Звуки** - Аудиофидбек при взаимодействии

### 📊 Для Администраторов
- **10 мощных функций**:
  1. 🔍 Поиск (по имени, телефону, email)
  2. 🎨 Быстрые фильтры (режим, стиль)
  3. 📊 Расширенные фильтры (площадь, бюджет, дата)
  4. ⬆️ Сортировка (клик на столбец)
  5. ☑️ Многовыбор заявок
  6. 🗑️ Удаление (одной или群 заявок)
  7. 📥 Экспорт (CSV/JSON всех или выбранных)
  8. 👁️ Детальный просмотр (модальное окно)
  9. 📋 Статистика и графики
  10. 🎨 Улучшенный UI с анимациями

---

## 📁 Структура Проекта

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

## 🔐 Администраторская панель

### 📊 Доступ к панели

Есть **два способа**:

#### 1️⃣ Через веб-интерфейс (рекомендуется)
```
http://localhost:5173/admin
```
- Откройте приложение `http://localhost:5173`
- Нажмите маленькую кнопку **⚙️** в левом верхнем углу
- Или перейдите напрямую на `/admin`

#### 2️⃣ Через HTML файл (альтернатива)
```
http://localhost:5173/admin.html
```

#### 3️⃣ Через скрипт (quickref)
```bash
# Windows
open_admin_panel.bat

# PowerShell
powershell -ExecutionPolicy Bypass -File open_admin_panel.ps1
```

### 🔑 Аутентификация

- **Пароль по умолчанию**: `admin2026`
- **Сессия**: 24 часа (сохраняется в localStorage)
- После выхода нужно ввести пароль заново

### 📈 Функциональность

✅ **Статистика по заявкам**
- Всего заявок
- Распределение по режимам (AI vs обычный)
- Средняя площадь помещений

✅ **Диаграммы и графики**
- Топ-5 стилей дизайна
- Топ-5 типов помещений
- Топ-5 бюджетов

✅ **Таблица всех заявок**
- ID, имя, контакт
- Параметры квиза
- Дата и время создания
- Режим (AI или обычный)
- Сортировка и фильтрация

✅ **Экспорт данных**
- **CSV** - для Excel / Google Sheets
- **JSON** - для программной обработки

✅ **Автообновление**
- По умолчанию обновляется каждые 5 сек
- Можно настроить (5/10/30 сек, 1 мин)

### 📝 Примеры использования

```
# Посмотреть все заявки
http://localhost:5173/admin → 📊 Таблица

# Экспортировать в Excel
Admin → "📊 Скачать CSV" → Откроется файл

# Проанализировать популярные стили
Admin → Посмотреть график "🎨 Топ стили"

# Отследить активность заявок
Admin → Выбрать "Обновлять каждые 5 сек" → Таблица обновляется live
```

### 🔒 Безопасность

⚠️ **Важно для production**:
- Пароль нужно изменить в `frontend/src/components/AdminLogin.jsx`
- Внедрить настоящую аутентификацию на сервере
- Использовать HTTPS
- Добавить rate limiting для попыток входа
- Логировать доступ админов

**Текущее состояние** - подходит для сессии/демо, но не для production.

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

1. ✅ **Admin панель** ← **ГОТОВО!** Смотри выше 📊
2. **AI API интеграция** (GigaChat / OpenAI)
3. **Картинки для стилей** (загрузить assets)
4. **Email рассылка** (письма вместо Telegram)
5. **Анализ метрик** (сколько прошли до финала)
6. **Многопользовательская аутентификация** (несколько админов)

---

## 📧 Поддержка

Если что-то не работает:
1. Проверьте дебаг-консоль (F12)
2. Посмотрите терминал backend/frontend
3. Удалите `node_modules` и переустановите

---

**Создано для Hack2026 🚀**
