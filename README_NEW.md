# 🎨 Smart Interior Quiz MVP

> Полнофункциональный MVP приложения для прохождения интерактивного квиза по дизайну интерьера с AI-рекомендациями и отправкой результатов в Telegram.

![Status](https://img.shields.io/badge/Status-Complete-green)
![Python](https://img.shields.io/badge/Python-3.10+-blue)
![Flask](https://img.shields.io/badge/Flask-2.3.3-green)
![React](https://img.shields.io/badge/React-18-blue)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Основные возможности

- ✅ **6-шаговый интерактивный квиз** с красивыми анимациями
- ✅ **AI-генерация результатов** (GigaChat) с fallback системой
- ✅ **Telegram интеграция** для отправки результатов
- ✅ **SQLite база данных** для сохранения заявок
- ✅ **Полная 60% CORS конфигурация** для безопасных запросов
- ✅ **Zustand управление состоянием** на фронтенде
- ✅ **Tailwind CSS** для современного дизайна
- ✅ **Framer Motion анимации** для вау-эффекта

## 🏗️ Архитектура

```
Smart Interior Quiz/
├── backend/                      # Python Flask API
│   ├── app.py                   # Main Flask приложение
│   ├── models.py                # SQLAlchemy ORM модели
│   ├── routes.py                # REST API endpoints
│   ├── services/
│   │   ├── ai_service.py        # GigaChat AI интеграция
│   │   └── telegram_service.py  # Telegram Bot уведомления
│   ├── requirements.txt         # Python зависимости
│   └── .env                     # Переменные окружения
│
├── frontend/                    # HTML + Vanilla JS
│   ├── quiz.html               # Главная страница квиза
│   ├── server.py               # Python HTTP сервер
│   └── index.html              # Альтернативный вход
│
└── README.md                   # Документация
```

## 🚀 Быстрый старт

### Требования
- Python 3.10+
- Windows/macOS/Linux

### 1️⃣ Клонируйте репозиторий
```bash
git clone https://github.com/YOUR_USERNAME/smart-interior-quiz.git
cd smart-interior-quiz
```

### 2️⃣ Создайте виртуальное окружение
```bash
python -m venv .venv
.venv\Scripts\activate  # Windows
# или
source .venv/bin/activate  # macOS/Linux
```

### 3️⃣ Установите зависимости Backend
```bash
cd backend
pip install -r requirements.txt
```

### 4️⃣ Настройте переменные окружения
Создайте файл `backend/.env`:
```env
# Telegram Bot
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# GigaChat AI (если есть)
GIGACHAT_CREDENTIALS=your_credentials
GIGACHAT_SCOPE=GIGACHAT_API_CORP
GIGACHAT_MODEL=GigaChat-2
GIGACHAT_VERIFY_SSL_CERTS=False
```

### 5️⃣ Запустите Backend
```bash
cd backend
python app.py
```
Backend будет доступен на **http://localhost:5000**

### 6️⃣ Запустите Frontend (в новом терминале)
```bash
cd frontend
python -m http.server 8000
```
Frontend будет доступен на **http://localhost:8000/quiz.html**

## 📊 API Endpoints

### Health Check
```http
GET /api/health
```
Проверка статуса Backend

### Submit Quiz
```http
POST /api/submit-quiz
Content-Type: application/json

{
  "propertyType": "apartment",
  "area": "45",
  "rooms": "2",
  "condition": "good",
  "style": ["modern", "minimalist"],
  "budget": "budget_mid",
  "timeline": "normal",
  "name": "Иван Иванов",
  "contact": "ivan@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "lead_id": 1,
  "ai_result": "Для вашего 45м² помещения рекомендуем...",
  "telegram_sent": true,
  "message": "Заявка успешно создана"
}
```

### Get All Leads
```http
GET /api/leads
```
Получить все сохраненные заявки (для админ-панели)

## 📝 Технологический стек

### Backend
- **Flask 2.3.3** - Web фреймворк
- **SQLAlchemy** - ORM для БД
- **GigaChat API** - AI для рекомендаций
- **Telegram Bot API** - Отправка уведомлений

### Frontend
- **Vanilla JavaScript** (ES6+)
- **Tailwind CSS** - Стили
- **HTML5** - Разметка

### База данных
- **SQLite** - Хранение заявок
- Автоматическое создание при запуске

## 🎯 Квиз: 6 Шагов

1. **Step 1: Intro** - Представление сервиса
2. **Step 2: Property Type** - Выбор типа помещения
3. **Step 3: Parameters** - Площадь, комнаты, состояние
4. **Step 4: Style** - Выбор стилей интерьера (макс. 3)
5. **Step 5: Budget & Timeline** - Бюджет и сроки
6. **Step 6: Contacts** - ФИ и контакт

**Результат:** AI-анализ и Telegram уведомление

## 🤖 AI Интеграция

### GigaChat
- Используется для генерации персональных рекомендаций
- Автоматический fallback при недоступности

### Fallback система
При ошибке GigaChat используется генерик-ответ:
```
Для вашего помещения рекомендуется:
- Стиль: [выбранные пользователем]
- Бюджет: [указанный бюджет]
- Сроки: [указанные сроки]
```

## 📱 Telegram Интеграция

Результаты автоматически отправляются в Telegram:
- Форматированное сообщение с результатами
- Прямая ссылка на результаты
- HTML-форматирование для красивого вывода

## 🔐 Безопасность

- ✅ CORS полностью настроен
- ✅ Content-Type валидация
- ✅ Error handling на всех контрольных точках
- ✅ Credentials хранятся в .env файле

## 📦 Структура базы данных

Таблица `Lead`:
```sql
CREATE TABLE lead (
  id INTEGER PRIMARY KEY,
  property_type VARCHAR,
  area VARCHAR,
  rooms VARCHAR,
  condition VARCHAR,
  style VARCHAR,
  budget VARCHAR,
  timeline VARCHAR,
  name VARCHAR,
  contact VARCHAR,
  ai_result TEXT,
  created_at DATETIME
)
```

## 🛠️ Разработка

### Добавить новый шаг в квиз
1. Добавить в `frontend/quiz.html` новый `<div id="step7">`
2. Добавить функции обработки в JavaScript
3. Увеличить `totalSteps` переменную

### Изменить AI логику
1. Отредактировать `backend/services/ai_service.py`
2. Изменить `generate_ai_result()` функцию
3. Протестировать через `test_api.py`

### Добавить новое поле в БД
1. Добавить в `backend/models.py` в класс `Lead`
2. БД пересоздастся автоматически при запуске

## 📋 Требования
- Python 3.10+
- Modern веб-браузер (Chrome, Firefox, Safari, Edge)
- Интернет для GigaChat и Telegram

## 🚀 Деплой

### Подготовка к production
1. Измените `debug=False` в `app.py`
2. Используйте WSGI server (Gunicorn, uWSGI)
3. Добавьте SSL сертификаты
4. Настройте reverse proxy (Nginx)

### Пример с Gunicorn
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## 📄 Лицензия

MIT License - см. LICENSE файл

## 👨‍💻 Автор

Разработано для Hackathon 2026

## 📞 Поддержка

Для вопросов и предложений создавайте Issues в GitHub

---

⭐ Если проект вам нравится, пожалуйста поставьте звезду!
