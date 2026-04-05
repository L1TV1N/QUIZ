"""
AI Service с поддержкой GigaChat и fallback
"""

import requests
import os
import base64
import uuid
from datetime import datetime
from config_manager import get_label_maps, load_config


class GigaChatClient:
    """Клиент для GigaChat API"""
    
    def __init__(self, credentials):
        self.credentials = credentials
        self.auth_url = "https://auth.api.cloud.yandex.net/oauth/token"
        self.api_url = "https://gigachat.devices.sberbank.ru/api/v1/chat/completions"
        self.access_token = None
        self.token_expires = None
        self.model = os.getenv("GIGACHAT_MODEL", "GigaChat-2")
        self.verify_ssl = os.getenv("GIGACHAT_VERIFY_SSL_CERTS", "True").lower() == "true"
        self.scope = os.getenv("GIGACHAT_SCOPE", "GIGACHAT_API_CORP")
    
    def _get_access_token(self):
        """Получить токен доступа"""
        try:
            headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": f"Basic {self.credentials}",
                "RqUID": str(uuid.uuid4())
            }
            
            data = {
                "grant_type": "client_credentials",
                "scope": self.scope
            }
            
            response = requests.post(
                self.auth_url,
                headers=headers,
                data=data,
                verify=self.verify_ssl,
                timeout=10
            )
            
            if response.status_code == 200:
                token_data = response.json()
                self.access_token = token_data.get("access_token")
                self.token_expires = token_data.get("expires_at")
                print(f"✅ GigaChat токен получен (модель: {self.model})")
                return True
            else:
                print(f"❌ Ошибка получения токена: {response.status_code}")
                print(f"Response: {response.text}")
                return False
                
        except Exception as e:
            print(f"❌ Ошибка при получении токена: {str(e)}")
            return False
    
    def generate_text(self, prompt, temperature=0.7, max_tokens=1000):
        """Генерировать текст через GigaChat"""
        
        # Получить токен если его нет
        if not self.access_token:
            if not self._get_access_token():
                return None
        
        try:
            headers = {
                "Authorization": f"Bearer {self.access_token}",
                "Content-Type": "application/json",
                "X-Request-ID": str(uuid.uuid4())
            }
            
            payload = {
                "model": self.model,
                "messages": [
                    {
                        "role": "system",
                        "content": "Ты - профессиональный дизайнер интерьеров. Отвечай на русском языке. Даёшь персональные, понятные и вдохновляющие рекомендации по дизайну."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                "temperature": temperature,
                "max_tokens": max_tokens,
                "top_p": 0.95,
                "stream": False
            }
            
            response = requests.post(
                self.api_url,
                json=payload,
                headers=headers,
                verify=self.verify_ssl,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                text = result.get("choices", [{}])[0].get("message", {}).get("content", "")
                print("✅ GigaChat ответ получен")
                return text
            else:
                print(f"❌ Ошибка GigaChat API: {response.status_code}")
                print(f"Response: {response.text}")
                return None
                
        except Exception as e:
            print(f"❌ Ошибка при обращении к GigaChat: {str(e)}")
            return None


def generate_ai_result(quiz_data):
    """
    Генерирует персональное описание проекта
    Использует GigaChat с fallback
    
    Args:
        quiz_data: {
            'propertyType': str,
            'area': str,
            'rooms': str,
            'condition': str,
            'style': list,
            'budget': str,
            'timeline': str,
            'name': str,
            'contact': str
        }
    
    Returns:
        str: Текстовое описание проекта
    """
    
    labels = get_label_maps(load_config())
    quiz_data = dict(quiz_data or {})
    quiz_data["propertyTypeLabel"] = labels["property"].get(quiz_data.get("propertyType"), quiz_data.get("propertyType", "помещение"))
    quiz_data["styleLabel"] = labels["style"].get(quiz_data.get("style"), quiz_data.get("style", "не указан"))
    quiz_data["budgetLabel"] = labels["budget"].get(quiz_data.get("budget"), quiz_data.get("budget", "не указан"))
    zone_ids = quiz_data.get("zones") or []
    if isinstance(zone_ids, list):
        quiz_data["zonesLabels"] = [labels["zone"].get(z, z) for z in zone_ids]
    else:
        quiz_data["zonesLabels"] = []

    # Проверяем наличие GigaChat ключа
    gigachat_credentials = os.getenv("GIGACHAT_CREDENTIALS")
    
    if gigachat_credentials:
        # Пробуем реальный AI
        result = _generate_with_gigachat(quiz_data, gigachat_credentials)
        if result:
            return result
    
    # Fallback если GigaChat не работает
    return _generate_fallback(quiz_data)


def _generate_with_gigachat(quiz_data, credentials):
    """Генерация через реальный GigaChat"""
    
    try:
        # Формируем промпт
        style_text = quiz_data.get("styleLabel", quiz_data.get("style", "современный"))
        property_type = str(quiz_data.get("propertyTypeLabel", quiz_data.get("propertyType", "помещение"))).lower()
        area = quiz_data.get("area", "неизвестная площадь")
        rooms = quiz_data.get("rooms", "неизвестное количество")
        condition = quiz_data.get("condition", "неизвестное состояние")
        budget = str(quiz_data.get("budgetLabel", quiz_data.get("budget", "средний"))).lower()
        timeline = quiz_data.get("timeline", "в течение месяца").lower()
        
        prompt = f"""
Ты дизайнер интерьеров. Составь персональный дизайн-проект для клиента на основе его ответов:

ПАРАМЕТРЫ ПРОЕКТА:
- Тип помещения: {property_type}
- Площадь: {area}м²
- Количество комнат: {rooms}
- Состояние: {condition}
- Выбранные зоны: {", ".join(quiz_data.get("zonesLabels", [])) or "не указаны"}
- Предпочитаемые стили: {style_text}
- Бюджет: {budget}
- Сроки: {timeline}

ТРЕБОВАНИЯ К ОТВЕТУ:
1. Напиши 3-4 параграфа (5-8 предложений каждый)
2. Включи:
   - Концепцию проекта (как будет выглядеть пространство)
   - Рекомендации по материалам и мебели
   - Расчёт примерного бюджета
   - Сроки реализации
3. Тон: профессиональный, но дружелюбный
4. Язык: русский
5. НЕ используй маркеры или нумерацию

Напиши ответ как если бы ты консультировал клиента лично.
"""
        
        client = GigaChatClient(credentials)
        result = client.generate_text(prompt, temperature=0.8, max_tokens=1200)
        
        if result:
            # Добавим красивое оформление
            formatted = f"""
✨ **Ваш персональный дизайн-проект**

{result}

---

🎯 Следующие шаги:
Наш менеджер свяжется с вами в ближайшие 24 часа, чтобы обсудить детали, уточнить пожелания и согласовать сроки реализации проекта.
"""
            return formatted.strip()
        
    except Exception as e:
        print(f"⚠️ Ошибка GigaChat: {str(e)}")
    
    return None


def _generate_fallback(quiz_data):
    """Fallback-генерация, если реальный AI не доступен"""
    
    style_text = quiz_data.get("styleLabel", quiz_data.get("style", "современный"))
    property_type = str(quiz_data.get("propertyTypeLabel", quiz_data.get("propertyType", "помещение"))).lower()
    area = quiz_data.get("area", "неизвестная площадь")
    budget = str(quiz_data.get("budgetLabel", quiz_data.get("budget", "средний"))).lower()
    timeline = quiz_data.get("timeline", "в течение месяца").lower()
    
    zones_text = ", ".join(quiz_data.get("zonesLabels", [])) or "не указаны"

    result = f"""
✨ **Ваш персональный дизайн-проект готов**

Мы проанализировали ваши предпочтения и готовы воплотить вашу мечту в жизнь!

**Концепция проекта:**
Современный интерьер в стиле {style_text} для вашего {property_type} площадью {area}м². Дизайн будет сочетать функциональность с эстетикой, создавая пространство, которое полностью отражает ваш вкус и потребности. Мы подберём материалы и мебель, которые гармонично впишутся в выбранный вами стиль. Выбраны зоны: {zones_text}.

**Рекомендации по реализации:**
• Оптимизация планировки с учётом вашего пространства
• Выбор материалов, подходящих к стилю {style_text}
• Правильное освещение для создания нужной атмосферы
• Мебель и аксессуары, которые совмещают красоту и функциональность
• Учет вашего бюджета и временных рамок

**Примерный расчёт:**
При {budget} бюджете мы предложим вам оптимальное соотношение качества и стоимости. Итоговая смета будет рассчитана подробно после детального анализа пространства и ваших пожеланий. Мы готовы работать как в рамках экономного варианта, так и создавать премиум решения.

**Сроки реализации:**
Мы готовы начать работу {timeline} и гарантируем качественное выполнение всех этапов проекта — от дизайна до доставки и установки мебели. В зависимости от масштаба работ, полная реализация займет согласованный с вами период.

---

🎯 Следующие шаги:
Отправьте эту заявку, и наш менеджер свяжется с вами для уточнения деталей, согласования всех параметров и создания полного дизайн-проекта вашего помещения!
"""
    
    return result.strip()


def generate_ai_result_real(quiz_data, api_key=None, provider="gigachat"):
    """
    Реальная генерация через API (deprecated - используйте generate_ai_result)
    """
    return generate_ai_result(quiz_data)
