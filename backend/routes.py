from flask import Blueprint, request, jsonify
from datetime import datetime
from models import SessionLocal, Lead
from services.ai_service import generate_ai_result
from services.telegram_service import notifier
import os

api = Blueprint('api', __name__, url_prefix='/api')


@api.route('/submit-quiz', methods=['POST'])
def submit_quiz():
    """
    Endpoint для отправки данных квиза
    
    Ожидает JSON:
    {
        "propertyType": "квартира",
        "area": "60",
        "rooms": "2",
        "condition": "ремонт",
        "style": ["минимализм", "скандинавский"],
        "budget": "средний",
        "timeline": "месяц",
        "name": "Иван",
        "contact": "@ivan"
    }
    """
    
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Empty request"}), 400
        
        print(f"📝 Новая заявка получена от {data.get('name')}")
        
        # Генерируем AI-результат
        print("🤖 Генерирую AI-результат...")
        ai_result = generate_ai_result(data)
        
        if not ai_result:
            return jsonify({"error": "AI generation failed"}), 500
        
        # Сохраняем в БД
        db = SessionLocal()
        
        # Нормализуем стиль (может быть список или строка)
        styles = data.get("style", [])
        if isinstance(styles, list):
            styles_str = ", ".join(styles)
        else:
            styles_str = str(styles)
        
        lead = Lead(
            property_type=data.get("propertyType", ""),
            area=data.get("area", ""),
            rooms=data.get("rooms", ""),
            condition=data.get("condition", ""),
            style=styles_str,
            budget=data.get("budget", ""),
            timeline=data.get("timeline", ""),
            name=data.get("name", ""),
            contact=data.get("contact", ""),
            ai_result=ai_result
        )
        
        db.add(lead)
        db.commit()
        db.refresh(lead)
        
        print(f"✅ Заявка сохранена в БД (ID: {lead.id})")
        
        # Отправляем в Telegram
        telegram_data = {
            "propertyType": data.get("propertyType"),
            "area": data.get("area"),
            "rooms": data.get("rooms"),
            "condition": data.get("condition"),
            "style": data.get("style"),
            "budget": data.get("budget"),
            "timeline": data.get("timeline"),
            "name": data.get("name"),
            "contact": data.get("contact"),
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        telegram_result = notifier.send_lead(telegram_data)
        
        db.close()
        
        return jsonify({
            "success": True,
            "lead_id": lead.id,
            "ai_result": ai_result,
            "telegram_sent": telegram_result,
            "message": "Заявка успешно создана"
        }), 200
    
    except Exception as e:
        import traceback
        print(f"❌ Ошибка при обработке заявки: {str(e)}")
        print(traceback.format_exc())
        return jsonify({
            "error": "Failed to process quiz submission",
            "details": str(e),
            "success": False
        }), 500


@api.route('/health', methods=['GET'])
def health():
    """Проверка здоровья server'а"""
    
    # Проверяем наличие важных переменных окружения
    telegram_configured = bool(os.getenv("TELEGRAM_BOT_TOKEN"))
    gigachat_configured = bool(os.getenv("GIGACHAT_AUTH_KEY"))
    
    return jsonify({
        "status": "ok",
        "backend": "running",
        "telegram": "configured" if telegram_configured else "not configured",
        "gigachat": "configured" if gigachat_configured else "not configured",
        "timestamp": datetime.now().isoformat()
    }), 200


@api.route('/leads', methods=['GET'])
def get_leads():
    """Получить все заявки (для админ-панели)"""
    try:
        db = SessionLocal()
        leads = db.query(Lead).all()
        db.close()
        
        return jsonify([{
            "id": lead.id,
            "property_type": lead.property_type,
            "area": lead.area,
            "name": lead.name,
            "contact": lead.contact,
            "created_at": lead.created_at.isoformat()
        } for lead in leads]), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/config', methods=['GET'])
def get_config():
    """Получить конфиг приложения (для дебага)"""
    return jsonify({
        "app_name": "Smart Quiz - Interior Design",
        "api_version": "1.0",
        "ai_provider": os.getenv("AI_PROVIDER", "fallback"),
        "telegram_enabled": bool(os.getenv("TELEGRAM_BOT_TOKEN")),
        "gigachat_enabled": bool(os.getenv("GIGACHAT_AUTH_KEY")),
    }), 200
