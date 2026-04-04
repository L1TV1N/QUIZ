# 📋 GitHub Setup Instructions

## Для разработчиков / For Contributors

### Клонировать репозиторий
```bash
git clone https://github.com/yourusername/umi-interior-quiz.git
cd umi-interior-quiz
```

### Вариант 1: Автоматическая установка (Рекомендуется)
```bash
# Windows
setup.bat

# macOS/Linux
bash setup.sh  # (если создан)
```

### Вариант 2: Ручная установка

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows
pip install -r requirements.txt
```

**Frontend:**
```bash
cd frontend
npm install
```

## Запуск проекта

```bash
# Вариант 1: Автоматический (Windows только)
run_all.bat

# Вариант 2: Backend отдельно
cd backend
python app.py

# Вариант 3: Frontend отдельно (новый терминал)
cd frontend
npm run dev
```

## Доступные ссылки
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Admin Panel: http://localhost:5173/admin (password: admin2026)

## Структура файлов

```
backend/
├── app.py                 # Main Flask application
├── models.py              # SQLAlchemy models
├── routes.py              # API endpoints
├── services/              # Business logic
├── requirements.txt       # Python dependencies
└── .env.example          # Environment template

frontend/
├── src/
│   ├── components/        # React components
│   ├── store/            # Zustand state
│   ├── services/         # API clients
│   └── styles/           # TailwindCSS
├── package.json          # Node dependencies
└── vite.config.js        # Vite configuration
```

## Переменные окружения

Создайте `backend/.env` на основе `.env.example`:
```bash
FLASK_ENV=development
SECRET_KEY=dev-key-change-in-prod
DATABASE_URL=sqlite:///quiz_leads.db
```

## Problematic?

- **Windows PATH issues**: Restart terminal after installing Node.js/Python and add to PATH manually
- **Ports in use**: Kill process on 5000 (backend) or 5173 (frontend)
- **Module not found**: Run `pip install -r requirements.txt` and `npm install` again

## Deployment

### Heroku / Railway
```bash
# Backend deployment
runtime: python-3.11
requirements: requirements.txt
Procfile: web: python app.py

# Frontend deployment  
npm run build
# Deploy dist/ folder to Vercel/Netlify
```

## Testing API

```bash
# Test backend health
curl http://localhost:5000/api/stats

# Test quiz submission
curl -X POST http://localhost:5000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}'
```

---

Questions? See [README.md](README.md) or check QUICK_START.md
