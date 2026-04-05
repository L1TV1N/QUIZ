from flask import Blueprint, request, jsonify, send_file
from datetime import datetime
from models import SessionLocal, Lead
from services.ai_service import generate_ai_result
from services.telegram_service import notifier
import os
import json
import csv
import io
from config_manager import load_config, save_config, reset_config

api = Blueprint('api', __name__, url_prefix='/api')


@api.route('/submit-quiz', methods=['POST'])
def submit_quiz():
    """
    Endpoint для отправки данных квиза
    
    Ожидает JSON:
    {
        "aiMode": true/false,
        "propertyType": "квартира",
        "zones": ["кухня", "гостиная"],
        "area": 60,
        "style": "минимализм",
        "budget": "1m-2m",
        "name": "Иван",
        "phone": "+7(999)123-45-67",
        "email": "ivan@example.com",
        "comment": "комментарий",
        "agreeToTerms": true
    }
    """
    
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({"error": "Empty request"}), 400
        
        print(f"📝 Новая заявка получена от {data.get('name')}")
        print(f"🤖 Режим: {'AI' if data.get('aiMode') else 'Обычный'}")
        
        # Генерируем AI-результат
        print("🤖 Генерирую AI-результат...")
        ai_result = generate_ai_result(data)
        
        if not ai_result:
            return jsonify({"error": "AI generation failed"}), 500
        
        # Сохраняем в БД
        db = SessionLocal()
        
        # Нормализуем zones (может быть список или JSON)
        zones = data.get("zones", [])
        if isinstance(zones, list):
            zones_str = json.dumps(zones, ensure_ascii=False)
        else:
            zones_str = str(zones)
        
        lead = Lead(
            ai_mode=data.get("aiMode", False),
            property_type=data.get("propertyType", ""),
            zones=zones_str,
            area=int(data.get("area", 60)),
            style=data.get("style", ""),
            budget=data.get("budget", ""),
            name=data.get("name", ""),
            phone=data.get("phone", ""),
            email=data.get("email", ""),
            comment=data.get("comment", ""),
            agree_to_terms=data.get("agreeToTerms", False),
            ai_result=ai_result
        )
        
        db.add(lead)
        db.commit()
        db.refresh(lead)
        
        print(f"✅ Заявка сохранена в БД (ID: {lead.id})")
        
        # Отправляем в Telegram
        telegram_data = {
            "aiMode": data.get("aiMode"),
            "propertyType": data.get("propertyType"),
            "zones": data.get("zones"),
            "area": data.get("area"),
            "style": data.get("style"),
            "budget": data.get("budget"),
            "name": data.get("name"),
            "phone": data.get("phone"),
            "email": data.get("email"),
            "comment": data.get("comment"),
            "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        
        telegram_result = notifier.send_lead(telegram_data)
        
        db.close()
        
        # Для AI-режима можно добавить AI-вопросы
        ai_questions = None
        if data.get("aiMode"):
            # TODO: Генерируем AI-вопросы на основе ответов
            pass
        
        return jsonify({
            "success": True,
            "lead_id": lead.id,
            "ai_result": ai_result,
            "ai_questions": ai_questions,
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
            "ai_mode": lead.ai_mode,
            "property_type": lead.property_type,
            "zones": lead.zones,
            "area": lead.area,
            "style": lead.style,
            "budget": lead.budget,
            "name": lead.name,
            "phone": lead.phone,
            "email": lead.email,
            "created_at": lead.created_at.isoformat()
        } for lead in leads]), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500




@api.route('/quiz-config', methods=['GET'])
def get_quiz_config():
    try:
        return jsonify(load_config()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/quiz-config', methods=['PUT'])
def update_quiz_config():
    try:
        payload = request.get_json() or {}
        config = save_config(payload)
        return jsonify({"success": True, "config": config}), 200
    except Exception as e:
        return jsonify({"error": str(e), "success": False}), 500


@api.route('/quiz-config/reset', methods=['POST'])
def reset_quiz_config_route():
    try:
        config = reset_config()
        return jsonify({"success": True, "config": config}), 200
    except Exception as e:
        return jsonify({"error": str(e), "success": False}), 500


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


@api.route('/export-csv', methods=['GET'])
def export_csv():
    """Экспортировать все заявки в CSV"""
    try:
        db = SessionLocal()
        leads = db.query(Lead).all()
        db.close()
        
        # Создаём в памяти CSV файл
        output = io.StringIO()
        writer = csv.writer(output)
        
        # Заголовки
        writer.writerow([
            'ID',
            'AI Mode',
            'Property Type',
            'Zones',
            'Area (m²)',
            'Style',
            'Budget',
            'Name',
            'Phone',
            'Email',
            'Comment',
            'Agree to Terms',
            'Created At',
            'AI Result'
        ])
        
        # Данные
        for lead in leads:
            writer.writerow([
                lead.id,
                'Yes' if lead.ai_mode else 'No',
                lead.property_type or '',
                lead.zones or '',
                lead.area or '',
                lead.style or '',
                lead.budget or '',
                lead.name or '',
                lead.phone or '',
                lead.email or '',
                lead.comment or '',
                'Yes' if lead.agree_to_terms else 'No',
                lead.created_at.strftime('%Y-%m-%d %H:%M:%S') if lead.created_at else '',
                lead.ai_result or ''
            ])
        
        # Преобразуем в bytes
        output.seek(0)
        
        return send_file(
            io.BytesIO(output.getvalue().encode('utf-8-sig')),
            mimetype='text/csv',
            as_attachment=True,
            download_name=f'quiz_leads_{datetime.now().strftime("%Y%m%d_%H%M%S")}.csv'
        )
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/export-json', methods=['GET'])
def export_json():
    """Экспортировать все заявки в JSON"""
    try:
        db = SessionLocal()
        leads = db.query(Lead).all()
        db.close()
        
        leads_data = []
        for lead in leads:
            leads_data.append({
                "id": lead.id,
                "ai_mode": lead.ai_mode,
                "property_type": lead.property_type,
                "zones": json.loads(lead.zones) if lead.zones else [],
                "area": lead.area,
                "style": lead.style,
                "budget": lead.budget,
                "name": lead.name,
                "phone": lead.phone,
                "email": lead.email,
                "comment": lead.comment,
                "agree_to_terms": lead.agree_to_terms,
                "created_at": lead.created_at.isoformat() if lead.created_at else None,
                "ai_result": lead.ai_result,
            })
        
        # Формируем JSON ответ с аттачментом
        json_data = json.dumps(leads_data, ensure_ascii=False, indent=2)
        
        return send_file(
            io.BytesIO(json_data.encode('utf-8')),
            mimetype='application/json',
            as_attachment=True,
            download_name=f'quiz_leads_{datetime.now().strftime("%Y%m%d_%H%M%S")}.json'
        )
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/stats', methods=['GET'])
def get_stats():
    """Получить статистику по заявкам"""
    try:
        db = SessionLocal()
        leads = db.query(Lead).all()
        db.close()
        
        total = len(leads)
        ai_mode_count = sum(1 for lead in leads if lead.ai_mode)
        normal_mode_count = total - ai_mode_count
        
        # Статистика по стилям
        styles = {}
        for lead in leads:
            if lead.style:
                styles[lead.style] = styles.get(lead.style, 0) + 1
        
        # Статистика по типам помещений
        properties = {}
        for lead in leads:
            if lead.property_type:
                properties[lead.property_type] = properties.get(lead.property_type, 0) + 1
        
        # Статистика по бюджетам
        budgets = {}
        for lead in leads:
            if lead.budget:
                budgets[lead.budget] = budgets.get(lead.budget, 0) + 1
        
        # Средняя площадь
        areas = [lead.area for lead in leads if lead.area]
        avg_area = sum(areas) / len(areas) if areas else 0
        
        return jsonify({
            "total_leads": total,
            "ai_mode": ai_mode_count,
            "normal_mode": normal_mode_count,
            "ai_mode_percentage": round((ai_mode_count / total * 100) if total > 0 else 0, 2),
            "average_area": round(avg_area, 1),
            "top_styles": sorted(styles.items(), key=lambda x: x[1], reverse=True)[:5],
            "top_properties": sorted(properties.items(), key=lambda x: x[1], reverse=True)[:5],
            "top_budgets": sorted(budgets.items(), key=lambda x: x[1], reverse=True)[:5],
            "chart_data": {
                "styles": styles,
                "properties": properties,
                "budgets": budgets,
            }
        }), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route('/leads/<int:lead_id>', methods=['DELETE'])
def delete_lead(lead_id):
    """Удалить заявку по ID"""
    try:
        db = SessionLocal()
        lead = db.query(Lead).filter(Lead.id == lead_id).first()
        
        if not lead:
            db.close()
            return jsonify({"error": "Lead not found"}), 404
        
        db.delete(lead)
        db.commit()
        db.close()
        
        print(f"🗑️ Заявка #{lead_id} удалена")
        return jsonify({"success": True, "message": "Lead deleted"}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
