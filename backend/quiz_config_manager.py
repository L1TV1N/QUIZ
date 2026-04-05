import json
from copy import deepcopy
from pathlib import Path

DEFAULT_CONFIG = {
  "version": 1,
  "ui": {
    "brandName": "Smart Quiz",
    "adminConfiguratorTitle": "Admin Configurator"
  },
  "steps": {
    "modeSelection": {
      "title": "Выберите режим квиза",
      "subtitle": "Обычный режим — быстро и просто, или AI-режим для персонального подхода?",
      "continueButton": "Продолжить →",
      "modes": [
        {"id": False, "label": "🎯 Обычный режим", "description": "Простой и быстрый квиз", "features": ["Быстрое заполнение", "Базовые параметры", "Стандартные вопросы"], "icon": "✓", "recommended": False},
        {"id": True, "label": "🤖 AI-режим (Премиум)", "description": "Персональный подход с искусственным интеллектом", "features": ["Адаптивные вопросы", "AI анализ предпочтений", "Детальные рекомендации"], "icon": "✨", "recommended": True}
      ]
    },
    "intro": {
      "title": "✨ Ваш персональный дизайн ждёт",
      "description": "За 5 минут мы поймём ваш стиль и создадим идеальный дизайн-проект для вашего помещения.",
      "hint": "Просто ответьте на несколько вопросов, и мы сделаем всё остальное 🎨",
      "buttonText": "Начать квиз →",
      "highlights": [
        {"icon": "🏠", "title": "Адаптирующиеся вопросы", "description": "Квиз подстраивается под ваши ответы"},
        {"icon": "🤖", "title": "AI анализ", "description": "Получите персональные рекомендации"},
        {"icon": "💼", "title": "Быстрый контакт", "description": "Менеджер свяжется с вами сразу же"}
      ]
    },
    "property": {
      "title": "Какой тип помещения?",
      "subtitle": "Выберите вариант, который лучше всего подходит под ваш объект",
      "options": [
        {"id": "apartment", "label": "🏢 Квартира", "description": "Жилая квартира"},
        {"id": "house", "label": "🏠 Частный дом", "description": "Односемейный дом"},
        {"id": "office", "label": "💼 Офис", "description": "Офисное пространство"},
        {"id": "commercial", "label": "🛍️ Коммерческое помещение", "description": "Магазин, ресторан, салон"},
        {"id": "studio", "label": "🎨 Студия / апартаменты", "description": "Творческое пространство или апартаменты"},
        {"id": "other", "label": "❓ Другое", "description": "Другой тип помещения"}
      ]
    },
    "zones": {
      "titleByProperty": {
        "apartment": "Какие зоны нужно продумать?",
        "house": "Какие зоны есть в вашем доме?",
        "office": "Какие зоны нужны в офисе?",
        "commercial": "Какие зоны есть в коммерческом помещении?",
        "studio": "Какие зоны нужно оформить?",
        "other": "Какие зоны нужно учесть?"
      },
      "subtitleByProperty": {
        "apartment": "Выберите все подходящие зоны",
        "house": "Можно выбрать несколько вариантов",
        "office": "Отметьте все нужные зоны",
        "commercial": "Это поможет точнее собрать проект",
        "studio": "Выберите основные функциональные зоны",
        "other": "Отметьте всё, что актуально"
      },
      "byProperty": {
        "apartment": [{"id":"kitchen","label":"🍳 Кухня","applicable":True},{"id":"living_room","label":"🛋️ Гостиная","applicable":True},{"id":"bedroom","label":"🛏️ Спальня","applicable":True},{"id":"nursery","label":"👶 Детская","applicable":True},{"id":"bathroom","label":"🚿 Санузел","applicable":True},{"id":"hallway","label":"🚪 Прихожая","applicable":True},{"id":"balcony","label":"🌿 Балкон/лоджия","applicable":True}],
        "house": [{"id":"kitchen","label":"🍳 Кухня","applicable":True},{"id":"living_room","label":"🛋️ Гостиная","applicable":True},{"id":"bedroom","label":"🛏️ Спальня","applicable":True},{"id":"nursery","label":"👶 Детская","applicable":True},{"id":"bathroom","label":"🚿 Санузел","applicable":True},{"id":"hallway","label":"🚪 Прихожая","applicable":True},{"id":"office","label":"💼 Кабинет/офис","applicable":True},{"id":"wardrobe","label":"👗 Гардеробная","applicable":True},{"id":"balcony","label":"🌿 Веранда/терраса","applicable":True}],
        "office": [{"id":"workspace","label":"💻 Рабочая зона","applicable":True},{"id":"conference","label":"🤝 Переговорная","applicable":True},{"id":"kitchen","label":"☕ Кухня/кофе-брейк","applicable":True},{"id":"bathroom","label":"🚿 Санузел","applicable":True},{"id":"hallway","label":"🚪 Прихожая/холл","applicable":True},{"id":"admin","label":"📋 Административный отдел","applicable":True}],
        "commercial": [{"id":"storefront","label":"🪟 Витрина/выставка","applicable":True},{"id":"checkout","label":"🛒 Кассовая зона","applicable":True},{"id":"storage","label":"📦 Склад/хранилище","applicable":True},{"id":"office","label":"💼 Офисная зона","applicable":True},{"id":"bathroom","label":"🚿 Санузел","applicable":True},{"id":"hallway","label":"🚪 Входная зона","applicable":True}],
        "studio": [{"id":"main_room","label":"🎨 Основная комната","applicable":True},{"id":"kitchen","label":"🍳 Кухня/столовая","applicable":True},{"id":"bathroom","label":"🚿 Санузел","applicable":True},{"id":"hallway","label":"🚪 Прихожая","applicable":True}],
        "other": [{"id":"main_zone","label":"📍 Основная зона","applicable":True},{"id":"secondary_zone","label":"📍 Дополнительная зона","applicable":True},{"id":"service_zone","label":"📍 Служебная зона","applicable":True}]
      }
    },
    "area": {
      "title": "Укажите примерную площадь помещения",
      "subtitle": "Это поможет нам подобрать оптимальное решение",
      "fieldLabel": "Площадь (м²)",
      "exactInputLabel": "Или введите точное значение:",
      "helperText": "💡 Площадь определяет стоимость проекта и время на разработку. Укажите примерное значение.",
      "minArea": 20,
      "maxArea": 300,
      "step": 5,
      "presets": [30, 60, 100, 200],
      "areaHints": [
        {"min": 0, "max": 39, "text": "🏠 Студия / маленькая квартира"},
        {"min": 40, "max": 79, "text": "🏘️ Средняя квартира"},
        {"min": 80, "max": 149, "text": "🏠 Большая квартира / малый дом"},
        {"min": 150, "max": 99999, "text": "Villa Просторный дом"}
      ]
    },
    "style": {
      "title": "Какой стиль вам ближе?",
      "subtitle": "Выберите один основной стиль",
      "options": [
        {"id":"modern","label":"✨ Современный","description":"Чистые линии и актуальные решения","color":"from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800"},
        {"id":"minimalism","label":"⚪ Минимализм","description":"Максимум воздуха и минимум лишнего","color":"from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-800"},
        {"id":"scandinavian","label":"🌿 Скандинавский","description":"Свет, уют и натуральные материалы","color":"from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-800"},
        {"id":"loft","label":"🧱 Лофт","description":"Фактура, кирпич и индустриальный характер","color":"from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-800"},
        {"id":"neoclassic","label":"🏛️ Неоклассика","description":"Современная элегантность с классическими нотами","color":"from-violet-50 to-fuchsia-50 dark:from-gray-800 dark:to-gray-800"},
        {"id":"classic","label":"👑 Классика","description":"Статус, симметрия и благородные формы","color":"from-yellow-50 to-amber-50 dark:from-gray-800 dark:to-gray-800"},
        {"id":"countryside","label":"🌾 Кантри","description":"Тёплый, домашний и природный характер","color":"from-lime-50 to-green-50 dark:from-gray-800 dark:to-gray-800"},
        {"id":"undecided","label":"❓ Не определился","description":"Подберём подходящий стиль вместе","color":"from-gray-50 to-slate-50 dark:from-gray-800 dark:to-gray-800"}
      ]
    },
    "budget": {
      "title": "Какой у вас ориентировочный бюджет?",
      "subtitle": "Это поможет подобрать реалистичное решение под ваши ожидания",
      "helperText": "Можно выбрать приблизительный диапазон — это нужно только для предварительного расчёта.",
      "options": [
        {"id":"up-to-500k","label":"💰 До 500 000 ₽","description":"Базовый и аккуратный вариант","range":[0,500000]},
        {"id":"500k-1m","label":"💰 500 000 - 1 000 000 ₽","description":"Оптимальный баланс цены и результата","range":[500000,1000000]},
        {"id":"1m-2m","label":"💰 1 000 000 - 2 000 000 ₽","description":"Больше свободы в материалах и решениях","range":[1000000,2000000]},
        {"id":"2m+","label":"💰 От 2 000 000 ₽","description":"Премиальные решения и высокий уровень детализации","range":[2000000,999999999]},
        {"id":"undecided","label":"❓ Пока не знаю","description":"Нужна помощь в определении бюджета","range":[0,999999999]}
      ]
    },
    "contacts": {
      "title": "Оставьте контакты",
      "subtitle": "Мы подготовим предложение и свяжемся с вами",
      "nameLabel": "Ваше имя",
      "namePlaceholder": "Введите имя",
      "phoneLabel": "Телефон",
      "phonePlaceholder": "Например: +7(999)123-45-67",
      "phoneHint": "Мы используем этот номер для связи",
      "emailLabel": "Email",
      "emailPlaceholder": "example@mail.ru",
      "commentLabel": "Комментарий",
      "commentPlaceholder": "Расскажите о ваших пожеланиях и идеях для проекта...",
      "termsLabel": "Я соглашаюсь на обработку персональных данных и получение информации о новых проектах",
      "privacyCardText": "✅ Ваша заявка будет обработана в ближайшие 24 часа\n🔒 Мы не передаём данные третьим лицам",
      "submitButtonText": "✓ Получить консультацию",
      "loadingButtonText": "⏳ Отправляем..."
    },
    "aiQuestions": {
      "title": "🤖 Уточняющие вопросы от AI",
      "subtitle": "Эти вопросы помогут создать более персональный и точный дизайн-проект",
      "hintText": "💡 Подсказка: Эти ответы помогут AI создать по-настоящему персональный дизайн-проект, соответствующий вашему образу жизни и предпочтениям.",
      "byProperty": {
        "apartment": [{"id":"purpose","question":"В каких целях вы планируете использовать это помещение?","options":["Личное жилье/семья","Сдача в аренду","Временное проживание","Инвестиция"]},{"id":"family","question":"Сколько человек будет проживать?","options":["1 человек","2-3 человека","4-5 человек","6 и более"]},{"id":"lifestyle","question":"Каков ваш образ жизни?","options":["Активный (часто дома + гости)","Спокойный/минималистичный","Смешанный"]}],
        "house": [{"id":"purpose","question":"Планируется проживание всей семьей или отдельные спальни по функциям?","options":["Всей семьей","Отдельные спальни по функциям","Зонирование комнат"]},{"id":"outdoor","question":"Нужна ли интеграция с садом/внешним пространством?","options":["Да, важна связь с природой","Нейтрально","Нет, изолированность важнее"]}],
        "office": [{"id":"workflow","question":"Какой тип рабочего процесса преобладает?","options":["Фокусная работа (нужна концентрация)","Командная работа (много встреч)","Гибридный режим"]},{"id":"employees","question":"Сколько примерно сотрудников будет работать?","options":["До 5","5-20","20-50","50+"]}],
        "commercial": [{"id":"business_type","question":"Какой тип коммерческого бизнеса?","options":["Розница/магазин","Услуги (салон, кафе)","B2B офис","Смешанный"]},{"id":"footfall","question":"Ожидаемое количество посетителей в день?","options":["Низкое (10-50)","Среднее (50-200)","Высокое (200+)"]}],
        "studio": [{"id":"work","question":"Будете ли работать из квартиры?","options":["Да, нужна рабочая зона","Нет, только жилье","Иногда"]}],
        "other": [{"id":"purpose","question":"Основное назначение этого помещения?","options":["Жилое (проживание)","Рабочее (офис, студия)","Коммерческое (магазин, услуги)","Смешанное использование"]},{"id":"users","question":"Кто будет использовать это помещение?","options":["Один человек","Семья/группа людей","Сотрудники","Клиенты/посетители"]},{"id":"activity","question":"Какова интенсивность использования?","options":["Низкая (редко бываю)","Средняя (регулярно)","Высокая (часто/постоянно)"]},{"id":"functionality","question":"Какие функции важны в первую очередь?","options":["Комфорт и уют","Функциональность и эффективность","Эстетика и впечатление","Баланс всех факторов"]},{"id":"atmosphere","question":"Какую атмосферу вы хотите создать?","options":["Спокойную и релаксирующую","Енергичную и вдохновляющую","Профессиональную и строгую","Творческую и оригинальную"]},{"id":"storage","question":"Нужно ли много места для хранения?","options":["Да, критично важно","Нужно среднее количество","Минимум, предпочитаю минимализм","Не применимо"]},{"id":"natural_light","question":"Насколько важно естественное освещение?","options":["Очень важно, нужно много света","Средне, достаточно окна-двух","Не критично, работает искусственное","Нужна романтичная полутень"]},{"id":"timeline","question":"Какой срок вам нужен для реализации проекта?","options":["Срочно (в течение месяца)","Быстро (1-2 месяца)","Нормально (2-3 месяца)","Не спешу, хочу идеально"]}]
      },
      "universal": [
        {"id":"budget_priority","question":"Что для вас важнее: качество материалов или скорость выполнения?","options":["Качество материалов","Скорость выполнения","Оба фактора одинаково важны"]},
        {"id":"maintenance","question":"Важна ли простота уборки и ухода?","options":["Да, нужны практичные материалы","Не критично","Скорее да"]},
        {"id":"flexibility","question":"Может ли дизайн быстро изменяться в будущем?","options":["Да, я люблю менять интерьер","Нет, хочу стабильность","Возможно, каждые несколько лет"]},
        {"id":"personal_style","question":"Есть ли у вас любимые цвета или материалы?","options":["Да, чёткие предпочтения","Нет, доверяю профессионалам","Примерно представляю"]},
        {"id":"technology","question":"Нужна ли интеграция умного дома или современных технологий?","options":["Да, хочу современный интерьер","Нет, традиционный подход","Минимум для комфорта"]}
      ],
      "randomCount": {"min": 5, "max": 9}
    }
  }
}

CONFIG_PATH = Path(__file__).resolve().parent / "quiz_config.json"


def get_default_config():
    return deepcopy(DEFAULT_CONFIG)


def get_quiz_config():
    if not CONFIG_PATH.exists():
        save_quiz_config(DEFAULT_CONFIG)
        return get_default_config()

    try:
        with open(CONFIG_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        save_quiz_config(DEFAULT_CONFIG)
        return get_default_config()


def save_quiz_config(config):
    CONFIG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(CONFIG_PATH, "w", encoding="utf-8") as f:
        json.dump(config, f, ensure_ascii=False, indent=2)
    return config


def reset_quiz_config():
    save_quiz_config(DEFAULT_CONFIG)
    return get_default_config()
