# 🚀 БЫСТРЫЙ СТАРТ

## 1️⃣ Одной командой (Windows)

```bash
setup.bat
```

Скрипт автоматически установит всё необходимое и покажет ссылки для запуска.

## 2️⃣ Вручную

### Установка зависимостей Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### Установка зависимостей Frontend

```bash
cd frontend
npm install
```

## 3️⃣ Запуск проекта

### Вариант 1: Автоматический запуск (Windows)
```bash
run_all.bat
```

### Вариант 2: Раздельный запуск

**Backend (терминал 1):**
```bash
cd backend
python app.py
# Будет запущен на http://localhost:5000
```

**Frontend (терминал 2):**
```bash
cd frontend
npm run dev
# Будет запущен на http://localhost:5173
```

## 4️⃣ Доступ к приложению

- **Главная страница**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin
- **Admin пароль**: `admin2026`
- **Backend API**: http://localhost:5000

## ⚠️ Требования

Перед началом убедитесь что установлены:

- **Node.js** v16+ (скачать: https://nodejs.org)
- **Python** 3.8+ (скачать: https://python.org)

Проверьте версии:
```bash
node --version
python --version
```

## 🆘 Проблемы?

### npm не найден
- Установите Node.js: https://nodejs.org
- Перезагрузите терминал после установки

### Python не найден  
- Установите Python: https://python.org
- Выберите опцию "Add Python to PATH"

### Порты заняты
- Backend (5000): `python -c "import socket; s = socket.socket(); s.bind(('', 5000))"`
- Frontend (5173): `npm run dev -- --port 3000`

---

📖 Полная документация в [README.md](README.md)
