# Download on link
```https://huggingface.co/ubergarm/GigaChat3-10B-A1.8B-GGUF/resolve/main/GigaChat3-10B-A1.8B-Q8_0.gguf?download=true```

Отлично! Рад, что всё заработало! 🎉 Вот подробный README для вашего проекта.

---

# 🤖 GigaChat Local Setup

Локальный запуск модели **GigaChat 3-10B-A1.8B** (10.5B параметров) через `llama.cpp` на Windows.

## 📋 Требования

| Компонент | Минимальные требования |
|-----------|----------------------|
| **ОЗУ** | 16 GB (рекомендуется 32 GB) |
| **Место на диске** | ~12 GB для модели |
| **ОС** | Windows 10/11 |
| **Python** | 3.10 (64-bit) |

## 📦 Установка

### 1. Скачайте модель

Перейдите на [Hugging Face](https://huggingface.co/ubergarm/GigaChat3-10B-A1.8B-GGUF) и скачайте файл:

```
GigaChat3-10B-A1.8B-Q8_0.gguf (11.4 GB)
```

*Альтернатива:* `GigaChat3-10B-A1.8B-IQ4_KSS.gguf` (6.08 GB) — меньше размер, чуть ниже качество.

### 2. Скачайте llama.cpp

Скачайте последний релиз с [GitHub](https://github.com/ggerganov/llama.cpp/releases):

```
llama-bXXXX-bin-win-cpu-x64.zip
```

*Если есть NVIDIA видеокарта (6+ GB VRAM) — скачайте CUDA версию:*
```
llama-bXXXX-bin-win-cuda-cu12.2.0-x64.zip
```

### 3. Распакуйте

```
📁 C:\llama.cpp\
   ├── llama-server.exe
   ├── llama-cli.exe
   └── ... (остальные файлы)

📁 F:\Projects\QUIZ\backend\services\localLLM\model\
   └── GigaChat3-10B-A1.8B-Q8_0.gguf
```

### 4. Создайте виртуальное окружение Python

```bash
cd F:\Projects\QUIZ
python -m venv .venv
.venv\Scripts\activate
```

Установите зависимости:

```bash
pip install requests
```

## 🚀 Запуск

### Шаг 1: Запустите сервер

В **первом** терминале:

```bash
cd C:\llama.cpp
.\llama-server.exe -m F:\Projects\QUIZ\backend\services\localLLM\model\GigaChat3-10B-A1.8B-Q8_0.gguf -ngl 0 --no-jinja
```

| Флаг | Описание |
|------|----------|
| `-m` | Путь к модели |
| `-ngl 0` | Количество слоёв на GPU (0 = только CPU) |
| `--no-jinja` | Отключает Jinja-шаблоны (нужно для GigaChat) |

**Успешный запуск выглядит так:**
```
main: server is listening on http://127.0.0.1:8080
main: starting the main loop...
```

### Шаг 2: Запустите чат

Во **втором** терминале:

```bash
cd F:\Projects\QUIZ
.venv\Scripts\activate
python backend\services\localLLM\main.py
```

## 💻 Код чата

Сохраните как `main.py`:

```python
import requests
import time

SERVER_URL = "http://localhost:8080/completion"

def ask_gigachat(user_message: str, max_tokens: int = 512) -> str:
    """Отправляет запрос к модели в правильном формате диалога"""
    
    # Формат промпта для GigaChat
    prompt = f"<s>user\n{user_message}\nassistant\n"
    
    payload = {
        "prompt": prompt,
        "n_predict": max_tokens,
        "temperature": 0.7,
        "top_k": 40,
        "top_p": 0.9,
        "repeat_penalty": 1.1,
        "stop": ["</s>", "user\n"],
        "stream": False
    }
    
    try:
        response = requests.post(SERVER_URL, json=payload, timeout=120)
        
        if response.status_code == 200:
            data = response.json()
            result = data.get("content", data.get("response", str(data)))
            result = result.replace("</s>", "").strip()
            return result
        else:
            return f"Ошибка {response.status_code}"
            
    except Exception as e:
        return f"Ошибка: {e}"

def chat():
    print("=" * 60)
    print("💬 Чат с GigaChat 10B (Q8_0)")
    print("📝 Команды: /exit - выход, /clear - очистить")
    print("=" * 60)
    
    while True:
        user_input = input("\n👤 Вы: ").strip()
        
        if user_input.lower() in ["/exit", "exit", "выход"]:
            print("👋 До свидания!")
            break
        
        if user_input.lower() == "/clear":
            import os
            os.system('cls' if os.name == 'nt' else 'clear')
            continue
        
        if not user_input:
            continue
        
        print("🤖 GigaChat: ", end="", flush=True)
        response = ask_gigachat(user_input)
        print(response)

if __name__ == "__main__":
    print("⏳ Проверка соединения с сервером...")
    time.sleep(2)
    chat()
```

## 🎮 Команды в чате

| Команда | Действие |
|---------|----------|
| `/exit`, `выход` | Завершить чат |
| `/clear` | Очистить экран |

## 📊 Настройка параметров

В функции `ask_gigachat` можно менять параметры:

```python
payload = {
    "prompt": prompt,
    "n_predict": 512,        # Максимум токенов в ответе
    "temperature": 0.7,      # Креативность (0.0 - 1.0)
    "top_k": 40,             # Ограничение словаря
    "top_p": 0.9,            # Ядерная выборка
    "repeat_penalty": 1.1,   # Штраф за повторения
}
```

## 🔧 Возможные проблемы

### Ошибка 503 (Service Unavailable)

Сервер ещё не готов. Подождите 10-15 секунд после запуска.

### Ошибка парсинга шаблона

Добавьте флаг `--no-jinja` при запуске сервера.

### Модель не загружается

Убедитесь, что путь к модели указан правильно и достаточно ОЗУ (16+ GB).

### "Failed to load model"

Ваша версия `llama.cpp` устарела. Скачайте последнюю с [GitHub](https://github.com/ggerganov/llama.cpp/releases).

## 📁 Структура проекта

```
F:\Projects\QUIZ\
├── .venv/                          # Виртуальное окружение Python
└── backend/
    └── services/
        └── localLLM/
            ├── main.py             # Код чата
            └── model/
                └── GigaChat3-10B-A1.8B-Q8_0.gguf   # Модель

C:\llama.cpp\
├── llama-server.exe                # Сервер
└── ... (остальные файлы)
```

## 🎯 Быстрый запуск (шпаргалка)

```bash
# Терминал 1 - Запуск сервера
cd C:\llama.cpp
.\llama-server.exe -m F:\Projects\QUIZ\backend\services\localLLM\model\GigaChat3-10B-A1.8B-Q8_0.gguf -ngl 0 --no-jinja

# Терминал 2 - Запуск чата
cd F:\Projects\QUIZ
.venv\Scripts\activate
python backend\services\localLLM\main.py
```

