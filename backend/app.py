from flask import Flask
from flask_cors import CORS
from routes import api
import os
from dotenv import load_dotenv
import logging

# Загружаем переменные окружения
load_dotenv()

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

app = Flask(__name__)

# Настройки CORS - разрешаем запросы с frontend
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

# Регистрируем API routes
app.register_blueprint(api)

# Настройки
app.config['JSON_AS_ASCII'] = False
app.config['JSON_SORT_KEYS'] = False


@app.before_request
def before_request():
    """Hook перед каждым запросом"""
    pass


@app.after_request
def after_request(response):
    """Hook после каждого запроса"""
    response.headers['Content-Type'] = 'application/json; charset=utf-8'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS, PUT, DELETE'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response


@app.errorhandler(404)
def not_found(error):
    return {"error": "Not found"}, 404


@app.errorhandler(500)
def internal_error(error):
    return {"error": "Internal server error"}, 500


if __name__ == '__main__':
    # Проверяем конфиг
    print("\n" + "="*60)
    print("🚀 SMART QUIZ - Backend стартует")
    print("="*60)
    print("✅ Frontend: http://localhost:5173")
    print("✅ Backend:  http://localhost:5000")
    print("✅ API:      http://localhost:5000/api/")
    print("="*60)
    
    # Проверяем конфиги
    if os.getenv("TELEGRAM_BOT_TOKEN"):
        print("✅ Telegram Bot: НАСТРОЕН")
    else:
        print("⚠️  Telegram Bot: НЕ НАСТРОЕН (опционально)")
    
    if os.getenv("GIGACHAT_AUTH_KEY"):
        print("✅ GigaChat AI: ГОТОВ К ИСПОЛЬЗОВАНИЮ")
    else:
        print("⚠️  GigaChat AI: Будет использоваться fallback")
    
    print("="*60 + "\n")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
