#!/bin/bash
set -e

echo "🚀 Начинаю развёртывание Smart Quiz..."

# ============================================
# ШАГ 1: Обновление системы
# ============================================
echo "📦 [1/11] Обновление системы..."
apt update && apt upgrade -y
apt install -y curl git wget build-essential zip unzip

# ============================================
# ШАГ 2: Установка Node.js
# ============================================
echo "📦 [2/11] Установка Node.js..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
echo "✅ Node.js $(node -v), npm $(npm -v)"

# ============================================
# ШАГ 3: Установка Python
# ============================================
echo "📦 [3/11] Установка Python..."
apt install -y python3 python3-pip python3-venv
echo "✅ Python $(python3 --version)"

# ============================================
# ШАГ 4: Установка nginx
# ============================================
echo "📦 [4/11] Установка nginx..."
apt install -y nginx
systemctl start nginx
systemctl enable nginx
echo "✅ nginx запущен"

# ============================================
# ШАГ 5: Установка Certbot
# ============================================
echo "📦 [5/11] Установка Certbot..."
apt install -y certbot python3-certbot-nginx
echo "✅ Certbot установлен"

# ============================================
# ШАГ 6: Подготовка папки проекта
# ============================================
echo "📦 [6/11] Подготовка проекта в /opt/smart-quiz..."
mkdir -p /opt
cd /opt

# Очищаем старый проект если существует
rm -rf smart-quiz || true
mkdir -p smart-quiz

echo "✅ Папка готова"

# ============================================
# ШАГ 7: Backend - виртуальное окружение
# ============================================
echo "📦 [7/11] Развёртывание Backend..."
cd /opt/smart-quiz/backend

python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
pip install gunicorn

echo "✅ Backend готов"

# ============================================
# ШАГ 8: Frontend - сборка
# ============================================
echo "📦 [8/11] Развёртывание Frontend..."
cd /opt/smart-quiz/frontend
npm install --production
npm run build
echo "✅ Frontend собран в dist/"

# ============================================
# ШАГ 9: Systemd сервис для Backend
# ============================================
echo "📦 [9/11] Создание systemd сервиса..."

cat > /etc/systemd/system/smart-quiz-backend.service << 'SYSTEMD'
[Unit]
Description=Smart Quiz Backend (Gunicorn)
After=network.target

[Service]
Type=notify
User=root
WorkingDirectory=/opt/smart-quiz/backend
Environment="PATH=/opt/smart-quiz/backend/venv/bin"
ExecStart=/opt/smart-quiz/backend/venv/bin/gunicorn \
    --workers 4 \
    --worker-class sync \
    --bind 127.0.0.1:5000 \
    --timeout 120 \
    --access-logfile - \
    --error-logfile - \
    app:app
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
SYSTEMD

systemctl daemon-reload
systemctl enable smart-quiz-backend
systemctl restart smart-quiz-backend
sleep 3
systemctl status smart-quiz-backend --no-pager
echo "✅ Backend сервис запущен"

# ============================================
# ШАГ 10: Nginx конфиг
# ============================================
echo "📦 [10/11] Настройка nginx..."

# Удаляем дефолтный конфиг
rm -f /etc/nginx/sites-enabled/default

# Создаём конфиг для домена
cat > /etc/nginx/sites-available/techlitcode.online << 'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name techlitcode.online www.techlitcode.online;

    # Frontend
    location / {
        root /opt/smart-quiz/frontend/dist;
        try_files $uri $uri/ /index.html;
        expires 1h;
        add_header Cache-Control "public, immutable";
    }

    # Static assets with longer cache
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        root /opt/smart-quiz/frontend/dist;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # API Backend
    location /api {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 120s;
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "OK";
        add_header Content-Type text/plain;
    }
}
NGINX

ln -sf /etc/nginx/sites-available/techlitcode.online /etc/nginx/sites-enabled/techlitcode.online

# Проверяем конфиг
nginx -t

# Перезагружаем nginx
systemctl restart nginx

echo "✅ Nginx настроен"

# ============================================
# ШАГ 11: Финальная проверка
# ============================================
echo "📦 [11/11] Финальная проверка..."

# Проверяем что backend работает
sleep 2
if systemctl is-active --quiet smart-quiz-backend; then
    echo "✅ Backend работает"
else
    echo "❌ Backend не запустился!"
    systemctl status smart-quiz-backend
    exit 1
fi

# Проверяем что nginx работает
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx работает"
else
    echo "❌ Nginx не запустился!"
    systemctl status nginx
    exit 1
fi

# ============================================
# Итоговая информация
# ============================================
clear
echo ""
echo "════════════════════════════════════════════════════════"
echo "✅  РАЗВЁРТЫВАНИЕ ЗАВЕРШЕНО УСПЕШНО!"
echo "════════════════════════════════════════════════════════"
echo ""
echo "📋 ТЕКУЩЕЕ СОСТОЯНИЕ:"
echo ""
echo "✅ Backend запущен на 127.0.0.1:5000 (gunicorn)"
echo "✅ Nginx запущен на 0.0.0.0:80"
echo "✅ Frontend собран в /opt/smart-quiz/frontend/dist"
echo ""
echo "════════════════════════════════════════════════════════"
echo "🔧 ЧТО ДЕЛАТЬ ДАЛЬШЕ:"
echo "════════════════════════════════════════════════════════"
echo ""
echo "1️⃣  НАСТРОИТЬ DNS НА REG.RU:"
echo "   → Зайди в админ-панель reg.ru"
echo "   → Перейди в управление DNS записями techlitcode.online"
echo "   → Найди A запись (или создай если её нет)"
echo "   → Установи значение: 194.113.106.230"
echo "   → Сохрани"
echo ""
echo "   ⏱️  Ждём 5-15 минут пока DNS распространится"
echo ""
echo "2️⃣  ПРОВЕРЬ DNS РАСПРОСТРАНЕНИЕ:"
echo "   nslookup techlitcode.online"
echo "   # Должно показать: 194.113.106.230"
echo ""
echo "3️⃣  КОГДА DNS РАБОТАЕТ, ПОЛУЧИ SSL СЕРТИФИКАТ:"
echo "   certbot --nginx -d techlitcode.online -d www.techlitcode.online"
echo ""
echo "4️⃣  ВКЛЮЧИ АВТООБНОВЛЕНИЕ SSL:"
echo "   systemctl enable certbot.timer"
echo ""
echo "════════════════════════════════════════════════════════"
echo "📊 ПРОВЕРКА ПРЯМО СЕЙЧАС:"
echo "════════════════════════════════════════════════════════"
echo ""
echo "По IP адресу (временно, без https):"
echo "   curl -I http://194.113.106.230"
echo ""
echo "API обработчик:"
echo "   curl http://194.113.106.230/api/health"
echo ""
echo "Статус сервисов:"
echo "   systemctl status smart-quiz-backend"
echo "   systemctl status nginx"
echo ""
echo "════════════════════════════════════════════════════════"
echo "📝 ЛОГИРОВАНИЕ:"
echo "════════════════════════════════════════════════════════"
echo ""
echo "Лайв логи backend:"
echo "   journalctl -u smart-quiz-backend -f"
echo ""
echo "Лайв логи nginx ошибок:"
echo "   tail -f /var/log/nginx/error.log"
echo ""
echo "Лайв логи nginx доступов:"
echo "   tail -f /var/log/nginx/access.log"
echo ""
echo "════════════════════════════════════════════════════════"
echo ""
