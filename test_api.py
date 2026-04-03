#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Тестирование API Backend"""
import urllib.request
import urllib.error
import json

API_URL = "http://localhost:5000/api"

# Тестируем health check
print("="*60)
print("TESTIROVANIE Backend API")
print("="*60)

print("\n1️⃣  Проверка здоровья (/api/health)...")
try:
    req = urllib.request.Request(f"{API_URL}/health")
    with urllib.request.urlopen(req, timeout=5) as resp:
        data = json.loads(resp.read().decode('utf-8'))
        print(f"✅ Статус: 200")
        print(f"Данные: {json.dumps(data, indent=2)}")
except Exception as e:
    print(f"❌ Ошибка: {e}")

# Тестируем submit-quiz
print("\n2️⃣  Тестирование отправки квиза (/api/submit-quiz)...")
test_data = {
    "propertyType": "apartment",
    "area": "45",
    "rooms": "2",
    "condition": "good",
    "style": ["modern", "minimalist"],
    "budget": "budget_mid",
    "timeline": "normal",
    "name": "Иван Тест",
    "contact": "test@example.com"
}

print(f"Отправляю данные: {json.dumps(test_data, indent=2)}")

try:
    body = json.dumps(test_data).encode('utf-8')
    req = urllib.request.Request(
        f"{API_URL}/submit-quiz",
        data=body,
        method='POST',
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        result = json.loads(resp.read().decode('utf-8'))
        print(f"✅ Статус: 200")
        print(f"Ответ:")
        print(f"  - success: {result.get('success')}")
        print(f"  - lead_id: {result.get('lead_id')}")
        ai_result = result.get('ai_result', '')
        print(f"  - AI результат: {ai_result[:100]}...")
        print(f"  - Telegram отправлен: {result.get('telegram_sent')}")
except urllib.error.HTTPError as e:
    print(f"❌ HTTP Ошибка {e.code}: {e.read().decode('utf-8')}")
except Exception as e:
    print(f"❌ Ошибка: {e}")

print("\n" + "="*60)
print("✅ Тестирование завершено!")
print("="*60)
