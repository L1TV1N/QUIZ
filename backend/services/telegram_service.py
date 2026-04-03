"""
Telegram Service для отправки уведомлений о новых заявках
"""

import requests
import os


class TelegramNotifier:
    def __init__(self, token=None, chat_id=None):
        self.token = token or os.getenv("TELEGRAM_BOT_TOKEN")
        self.chat_id = chat_id or os.getenv("TELEGRAM_CHAT_ID")
        self.api_url = f"https://api.telegram.org/bot{self.token}/sendMessage"
    
    def send_lead(self, lead_data):
        """
        Отправляет информацию о новой заявке в Telegram
        
        Args:
            lead_data: словарь с данными заявки
        
        Returns:
            bool: успешно ли отправлено
        """
        
        if not self.token or not self.chat_id:
            print("⚠️ Telegram Bot Token или Chat ID не установлены")
            return False
        
        message = self._format_message(lead_data)
        
        try:
            response = requests.post(
                self.api_url,
                json={
                    "chat_id": self.chat_id,
                    "text": message,
                    "parse_mode": "HTML"
                },
                timeout=5
            )
            
            if response.status_code == 200:
                print("✅ Уведомление отправлено в Telegram")
                return True
            else:
                print(f"❌ Ошибка Telegram: {response.text}")
                return False
        
        except Exception as e:
            print(f"❌ Ошибка при отправке в Telegram: {str(e)}")
            return False
    
    def _format_message(self, lead_data):
        """Форматирует сообщение для Telegram"""
        
        styles = lead_data.get("style", [])
        if isinstance(styles, str):
            styles = [s.strip() for s in styles.split(",")]
        
        styles_text = ", ".join(styles[:3]) if styles else "Не выбран"
        
        message = f"""
<b>🎨 Новая заявка на дизайн интерьера!</b>

<b>Тип помещения:</b> {lead_data.get('propertyType', 'N/A')}
<b>Площадь:</b> {lead_data.get('area', 'N/A')}м²
<b>Количество комнат:</b> {lead_data.get('rooms', 'N/A')}
<b>Состояние:</b> {lead_data.get('condition', 'N/A')}
<b>Стили интерьера:</b> {styles_text}
<b>Бюджет:</b> {lead_data.get('budget', 'N/A')}
<b>Сроки:</b> {lead_data.get('timeline', 'N/A')}

<b>📞 Контактные данные:</b>
<b>Имя:</b> {lead_data.get('name', 'N/A')}
<b>Контакт:</b> {lead_data.get('contact', 'N/A')}

⏰ Время заявки: {lead_data.get('timestamp', 'N/A')}
"""
        
        return message.strip()


# Глобальный экземпляр
notifier = TelegramNotifier()
