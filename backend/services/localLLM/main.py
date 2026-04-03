import requests
import time

SERVER_URL = "http://localhost:8080/completion"


def ask_gigachat(user_message: str, max_tokens: int = 512) -> str:
    """Отправляет запрос к модели в правильном формате диалога"""

    # Правильный формат промпта для GigaChat
    prompt = f"<s>user\n{user_message}\nassistant\n"

    payload = {
        "prompt": prompt,
        "n_predict": max_tokens,
        "temperature": 0.7,
        "top_k": 40,
        "top_p": 0.9,
        "repeat_penalty": 1.1,
        "stop": ["</s>", "user\n"],  # Останавливаемся перед следующим user
        "stream": False
    }

    try:
        response = requests.post(SERVER_URL, json=payload, timeout=120)

        if response.status_code == 200:
            data = response.json()
            # Ответ обычно в поле "content"
            result = data.get("content", data.get("response", str(data)))
            # Убираем возможные лишние токены
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