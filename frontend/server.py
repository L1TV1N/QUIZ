#!/usr/bin/env python3
"""
SimpleHTTPServer с прокси для API запросов
Раздает quiz.html и проксирует запросы на Backend
"""

import http.server
import socketserver
import json
import urllib.request
import urllib.error
from pathlib import Path

PORT = 8000
BACKEND_URL = "http://localhost:5000"

class ProxyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # API запросы проксируем на Backend
        if self.path.startswith('/api/'):
            self.proxy_request('GET')
        else:
            # Все остальное раздаем как статические файлы
            super().do_GET()
    
    def do_POST(self):
        # POST запросы к API проксируем на Backend
        if self.path.startswith('/api/'):
            self.proxy_request('POST')
        else:
            self.send_error(405, "Method Not Allowed")
    
    def do_OPTIONS(self):
        # Обрабатываем CORS preflight запросы
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def proxy_request(self, method):
        """Проксирует запрос на Backend"""
        try:
            backend_url = BACKEND_URL + self.path
            
            # Читаем body если есть
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length) if content_length > 0 else None
            
            # Создаем запрос к Backend
            req = urllib.request.Request(
                backend_url,
                data=body,
                method=method,
                headers={'Content-Type': 'application/json'}
            )
            
            print(f"📤 Проксирую {method} запрос: {backend_url}")
            
            # Получаем ответ от Backend
            with urllib.request.urlopen(req, timeout=10) as response:
                response_body = response.read()
                status_code = response.status
                
                # Отправляем ответ клиенту
                self.send_response(status_code)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Content-Length', len(response_body))
                self.end_headers()
                self.wfile.write(response_body)
                
                print(f"✅ Ответ {status_code} от Backend")
                
        except urllib.error.URLError as e:
            print(f"❌ Ошибка Backend: {e}")
            self.send_error(503, f"Backend недоступен: {str(e)}")
        except Exception as e:
            print(f"❌ Ошибка прокси: {e}")
            self.send_error(500, f"Internal Server Error: {str(e)}")
    
    def end_headers(self):
        # Добавляем CORS заголовки ко всем ответам
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

# Устанавливаем директорию для раздачи файлов
import os
os.chdir(Path(__file__).parent)

# Запускаем сервер
with socketserver.TCPServer(("", PORT), ProxyHandler) as httpd:
    print("\n" + "="*60)
    print("🚀 Frontend + Proxy Server запущен!")
    print("="*60)
    print(f"✅ Frontend доступен на: http://localhost:{PORT}/quiz.html")
    print(f"✅ Backend API проксируется через: http://localhost:{PORT}/api/")
    print(f"✅ Реальный Backend на: {BACKEND_URL}")
    print("="*60 + "\n")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Сервер остановлен")
