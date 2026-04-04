/**
 * Адаптивный контент для разных типов помещений
 * Логика меняется в зависимости от выбранного помещения
 */

// Зоны по типам помещений
export const ZONES_BY_PROPERTY = {
  apartment: [
    { id: 'kitchen', label: '🍳 Кухня', applicable: true },
    { id: 'living_room', label: '🛋️ Гостиная', applicable: true },
    { id: 'bedroom', label: '🛏️ Спальня', applicable: true },
    { id: 'nursery', label: '👶 Детская', applicable: true },
    { id: 'bathroom', label: '🚿 Санузел', applicable: true },
    { id: 'hallway', label: '🚪 Прихожая', applicable: true },
    { id: 'balcony', label: '🌿 Балкон/лоджия', applicable: true },
  ],
  
  house: [
    { id: 'kitchen', label: '🍳 Кухня', applicable: true },
    { id: 'living_room', label: '🛋️ Гостиная', applicable: true },
    { id: 'bedroom', label: '🛏️ Спальня', applicable: true },
    { id: 'nursery', label: '👶 Детская', applicable: true },
    { id: 'bathroom', label: '🚿 Санузел', applicable: true },
    { id: 'hallway', label: '🚪 Прихожая', applicable: true },
    { id: 'office', label: '💼 Кабинет/офис', applicable: true },
    { id: 'wardrobe', label: '👗 Гардеробная', applicable: true },
    { id: 'balcony', label: '🌿 Веранда/терраса', applicable: true },
  ],
  
  office: [
    { id: 'workspace', label: '💻 Рабочая зона', applicable: true },
    { id: 'conference', label: '🤝 Переговорная', applicable: true },
    { id: 'kitchen', label: '☕ Кухня/кофе-брейк', applicable: true },
    { id: 'bathroom', label: '🚿 Санузел', applicable: true },
    { id: 'hallway', label: '🚪 Прихожая/холл', applicable: true },
    { id: 'admin', label: '📋 Административный отдел', applicable: true },
  ],
  
  commercial: [
    { id: 'storefront', label: '🪟 Витрина/выставка', applicable: true },
    { id: 'checkout', label: '🛒 Кассовая зона', applicable: true },
    { id: 'storage', label: '📦 Склад/хранилище', applicable: true },
    { id: 'office', label: '💼 Офисная зона', applicable: true },
    { id: 'bathroom', label: '🚿 Санузел', applicable: true },
    { id: 'hallway', label: '🚪 Входная зона', applicable: true },
  ],
  
  studio: [
    { id: 'main_room', label: '🎨 Основная комната', applicable: true },
    { id: 'kitchen', label: '🍳 Кухня/столовая', applicable: true },
    { id: 'bathroom', label: '🚿 Санузел', applicable: true },
    { id: 'hallway', label: '🚪 Прихожая', applicable: true },
  ],
  
  other: [
    { id: 'main_zone', label: '📍 Основная зона', applicable: true },
    { id: 'secondary_zone', label: '📍 Дополнительная зона', applicable: true },
    { id: 'service_zone', label: '📍 Служебная зона', applicable: true },
  ],
}

// Рекомендуемые стили по типам помещений
export const STYLES_BY_PROPERTY = {
  apartment: ['modern', 'minimalism', 'scandinavian', 'neoclassic', 'classic', 'undecided'],
  house: ['modern', 'classic', 'loft', 'countryside', 'scandinavian', 'neoclassic', 'undecided'],
  office: ['modern', 'minimalism', 'loft', 'classic', 'undecided'],
  commercial: ['modern', 'minimalism', 'loft', 'undecided'],
  studio: ['modern', 'minimalism', 'scandinavian', 'neoclassic', 'undecided'],
  other: ['modern', 'minimalism', 'classic', 'undecided'],
}

// AI вопросы по типам помещений (для режима AI)
export const AI_QUESTIONS_BY_PROPERTY = {
  apartment: [
    {
      id: 'purpose',
      question: 'В каких целях вы планируете использовать это помещение?',
      options: [
        'Личное жилье/семья',
        'Сдача в аренду',
        'Временное проживание',
        'Инвестиция',
      ],
    },
    {
      id: 'family',
      question: 'Сколько человек будет проживать?',
      options: [
        '1 человек',
        '2-3 человека',
        '4-5 человек',
        '6 и более',
      ],
    },
    {
      id: 'lifestyle',
      question: 'Каков ваш образ жизни?',
      options: [
        'Активный (часто дома + гости)',
        'Спокойный/минималистичный',
        'Смешанный',
      ],
    },
  ],
  
  house: [
    {
      id: 'purpose',
      question: 'Планируется проживание всей семьей или отдельные спальни по функциям?',
      options: [
        'Всей семьей',
        'Отдельные спальни по функциям',
        'Зонирование комнат',
      ],
    },
    {
      id: 'outdoor',
      question: 'Нужна ли интеграция с садом/внешним пространством?',
      options: [
        'Да, важна связь с природой',
        'Нейтрально',
        'Нет, изолированность важнее',
      ],
    },
  ],
  
  office: [
    {
      id: 'workflow',
      question: 'Какой тип рабочего процесса преобладает?',
      options: [
        'Фокусная работа (нужна концентрация)',
        'Командная работа (много встреч)',
        'Гибридный режим',
      ],
    },
    {
      id: 'employees',
      question: 'Сколько примерно сотрудников будет работать?',
      options: [
        'До 5',
        '5-20',
        '20-50',
        '50+',
      ],
    },
  ],
  
  commercial: [
    {
      id: 'business_type',
      question: 'Какой тип коммерческого бизнеса?',
      options: [
        'Розница/магазин',
        'Услуги (салон, кафе)',
        'B2B офис',
        'Смешанный',
      ],
    },
    {
      id: 'footfall',
      question: 'Ожидаемое количество посетителей в день?',
      options: [
        'Низкое (10-50)',
        'Среднее (50-200)',
        'Высокое (200+)',
      ],
    },
  ],
  
  studio: [
    {
      id: 'work',
      question: 'Будете ли работать из квартиры?',
      options: [
        'Да, нужна рабочая зона',
        'Нет, только жилье',
        'Иногда',
      ],
    },
  ],

  other: [
    {
      id: 'purpose',
      question: 'Основное назначение этого помещения?',
      options: [
        'Жилое (проживание)',
        'Рабочее (офис, студия)',
        'Коммерческое (магазин, услуги)',
        'Смешанное использование',
      ],
    },
    {
      id: 'users',
      question: 'Кто будет использовать это помещение?',
      options: [
        'Один человек',
        'Семья/группа людей',
        'Сотрудники',
        'Клиенты/посетители',
      ],
    },
    {
      id: 'activity',
      question: 'Какова интенсивность использования?',
      options: [
        'Низкая (редко бываю)',
        'Средняя (регулярно)',
        'Высокая (часто/постоянно)',
      ],
    },
    {
      id: 'functionality',
      question: 'Какие функции важны в первую очередь?',
      options: [
        'Комфорт и уют',
        'Функциональность и эффективность',
        'Эстетика и впечатление',
        'Баланс всех факторов',
      ],
    },
    {
      id: 'atmosphere',
      question: 'Какую атмосферу вы хотите создать?',
      options: [
        'Спокойную и релаксирующую',
        'Енергичную и вдохновляющую',
        'Профессиональную и строгую',
        'Творческую и оригинальную',
      ],
    },
    {
      id: 'storage',
      question: 'Нужно ли много места для хранения?',
      options: [
        'Да, критично важно',
        'Нужно среднее количество',
        'Минимум, предпочитаю минимализм',
        'Не применимо',
      ],
    },
    {
      id: 'natural_light',
      question: 'Насколько важно естественное освещение?',
      options: [
        'Очень важно, нужно много света',
        'Средне, достаточно окна-двух',
        'Не критично, работает искусственное',
        'Нужна романтичная полутень',
      ],
    },
    {
      id: 'timeline',
      question: 'Какой срок вам нужен для реализации проекта?',
      options: [
        'Срочно (в течение месяца)',
        'Быстро (1-2 месяца)',
        'Нормально (2-3 месяца)',
        'Не спешу, хочу идеально',
      ],
    },
  ],
}

// Бюджеты (общие для всех)
export const BUDGET_TIERS = [
  { id: 'up-to-500k', label: '💰 До 500 000 ₽', range: [0, 500000] },
  { id: '500k-1m', label: '💰 500 000 - 1 000 000 ₽', range: [500000, 1000000] },
  { id: '1m-2m', label: '💰 1 000 000 - 2 000 000 ₽', range: [1000000, 2000000] },
  { id: '2m+', label: '💰 От 2 000 000 ₽', range: [2000000, Infinity] },
  { id: 'undecided', label: '❓ Пока не знаю', range: [0, Infinity] },
]

// Функция для получения зон по типу помещения
export const getZonesByProperty = (propertyType) => {
  return ZONES_BY_PROPERTY[propertyType] || ZONES_BY_PROPERTY.other
}

// Функция для получения AI вопросов по типу помещения
export const getAIQuestionsByProperty = (propertyType) => {
  return AI_QUESTIONS_BY_PROPERTY[propertyType] || AI_QUESTIONS_BY_PROPERTY.other
}

// Универсальные вопросы, которые подходят для любого типа помещения
const UNIVERSAL_AI_QUESTIONS = [
  {
    id: 'budget_priority',
    question: 'Что для вас важнее: качество материалов или скорость выполнения?',
    options: [
      'Качество материалов',
      'Скорость выполнения',
      'Оба фактора одинаково важны',
    ],
  },
  {
    id: 'maintenance',
    question: 'Важна ли простота уборки и ухода?',
    options: [
      'Да, нужны практичные материалы',
      'Не критично',
      'Скорее да',
    ],
  },
  {
    id: 'flexibility',
    question: 'Может ли дизайн быстро изменяться в будущем?',
    options: [
      'Да, я люблю менять интерьер',
      'Нет, хочу стабильность',
      'Возможно, каждые несколько лет',
    ],
  },
  {
    id: 'personal_style',
    question: 'Есть ли у вас любимые цвета или материалы?',
    options: [
      'Да, чёткие предпочтения',
      'Нет, доверяю профессионалам',
      'Примерно представляю',
    ],
  },
  {
    id: 'technology',
    question: 'Нужна ли интеграция умного дома или современных технологий?',
    options: [
      'Да, хочу современный интерьер',
      'Нет, традиционный подход',
      'Минимум для комфорта',
    ],
  },
]

// Функция для получения 5-9 случайных AI вопросов
export const getRandomizedAIQuestions = (propertyType) => {
  const propertyQuestions = AI_QUESTIONS_BY_PROPERTY[propertyType] || AI_QUESTIONS_BY_PROPERTY.other
  const allAvailableQuestions = [
    ...propertyQuestions,
    ...UNIVERSAL_AI_QUESTIONS
  ]
  
  // Перемешиваем и выбираем 5-9 вопросов
  const shuffled = [...allAvailableQuestions].sort(() => Math.random() - 0.5)
  
  // Минимум 5, максимум 9
  const questionsCount = Math.min(9, Math.max(5, shuffled.length))
  
  // Берём первые questionsCount вопросов (которые уже перемешаны)
  return shuffled.slice(0, questionsCount)
}

// Расширённый расчёт сметы проекта дизайна (реалистичный)
export const calculateEstimatedPrice = (propertyType, area, budget, style, zones = [], aiAnswers = {}) => {
  // Базовые ставки по типам помещений (руб/м²) - более реалистичные
  const basePrice = {
    apartment: 12000,
    house: 18000,
    office: 8000,
    commercial: 15000,
    studio: 10000,
    other: 14000,
  }

  // Коэффициенты по стилю
  const styleMultiplier = {
    modern: 1.2,
    minimalism: 0.95,
    scandinavian: 1.15,
    loft: 1.35,
    neoclassic: 1.5,
    classic: 1.45,
    countryside: 1.2,
    undecided: 1.0,
  }

  // Коэффициент за количество зон
  const zoneCount = zones && zones.length > 0 ? zones.length : 3
  const zoneMultiplier = 0.8 + (Math.min(zoneCount, 10) * 0.08)

  // Коэффициент сложности от AI ответов
  let aiComplexityMultiplier = 1.0
  if (aiAnswers) {
    if (aiAnswers.functionality === 'Эстетика и впечатление') {
      aiComplexityMultiplier = 1.25
    } else if (aiAnswers.functionality === 'Баланс всех факторов') {
      aiComplexityMultiplier = 1.15
    }
    if (aiAnswers.timeline === 'Срочно (в течение месяца)') {
      aiComplexityMultiplier *= 1.4
    } else if (aiAnswers.timeline === 'Быстро (1-2 месяца)') {
      aiComplexityMultiplier *= 1.15
    }
    if (aiAnswers.atmosphere === 'Творческую и оригинальную') {
      aiComplexityMultiplier *= 1.2
    }
  }

  // Расчёт базовой стоимости без НДС и непредвиденных расходов
  const base = basePrice[propertyType] || basePrice.other
  const styleCoeff = styleMultiplier[style] || 1.0
  
  let materialsCost = base * area * styleCoeff * zoneMultiplier * aiComplexityMultiplier
  const designerFee = calculateDesignerFee(propertyType, area)
  const laborCost = materialsCost * 0.4
  const accessoriesCost = materialsCost * 0.15
  const consultationCost = designerFee * 0.5
  
  let subtotal = designerFee + materialsCost + laborCost + accessoriesCost + consultationCost
  let contingency = subtotal * 0.12
  let vat = (subtotal + contingency) * 0.18
  let totalPrice = subtotal + contingency + vat

  // Получаем диапазон бюджета пользователя
  const budgetRange = getBudgetRange(budget)
  
  // Если цена больше максимального бюджета - масштабируем вниз
  if (totalPrice > budgetRange.max && budgetRange.max !== Infinity) {
    const scaleFactor = budgetRange.max / totalPrice
    
    // Масштабируем пропорционально все компоненты
    materialsCost *= scaleFactor
    const newLaborCost = materialsCost * 0.4
    const newAccessoriesCost = materialsCost * 0.15
    const newConsultationCost = designerFee * 0.5 * scaleFactor
    
    subtotal = designerFee + materialsCost + newLaborCost + newAccessoriesCost + newConsultationCost
    contingency = subtotal * 0.12
    vat = (subtotal + contingency) * 0.18
    totalPrice = subtotal + contingency + vat
  }

  return Math.round(totalPrice)
}

// Расчёт гонорара дизайнера
const calculateDesignerFee = (propertyType, area) => {
  const designHours = {
    apartment: 40,
    house: 80,
    office: 50,
    commercial: 60,
    studio: 30,
    other: 45,
  }
  
  const hourlyRate = 1500 // руб/час
  const hours = designHours[propertyType] || 45
  
  // Добавляем 10% к гонорару за каждые 10м²
  const areaBonus = Math.floor(area / 10) * 0.05
  const adjustedHours = hours * (1 + areaBonus)
  
  return Math.round(adjustedHours * hourlyRate)
}

// Получить диапазон выбранного бюджета
const getBudgetRange = (budget) => {
  const budgetRanges = {
    'up-to-500k': { min: 0, max: 500000 },
    '500k-1m': { min: 500000, max: 1000000 },
    '1m-2m': { min: 1000000, max: 2000000 },
    '2m+': { min: 2000000, max: Infinity },
    'undecided': { min: 0, max: Infinity },
  }
  return budgetRanges[budget] || { min: 0, max: Infinity }
}

// Коэффициент на основе выбранного бюджета
const getBudgetMultiplier = (budget) => {
  switch(budget) {
    case 'up-to-500k':
      return 0.85 // Оптимизированная смета
    case '500k-1m':
      return 1.0  // Базовая расчётная стоимость
    case '1m-2m':
      return 1.15 // Увеличенный бюджет - больше возможностей
    case '2m+':
      return 1.35 // Премиум - лучшие материалы и детали
    default:
      return 1.0
  }
}

// Генерация AI рекомендаций с детальной сметой
export const generateAIRecommendations = (quizData) => {
  const { propertyType, zones, area, style, budget, aiMode, aiAnswers } = quizData
  
  if (!aiMode) return null

  const recommendations = []
  
  // Расчёт детальной сметы с разбором по категориям
  const priceDetails = calculateDetailedPrice(propertyType, area, budget, style, zones, aiAnswers)
  const estimatedPrice = priceDetails.total

  // Основные рекомендации по типу помещения
  const propertyAdvice = {
    apartment: 'Для квартиры рекомендуем открытую планировку в зонах общего пользования и приватность в спальных отделениях.',
    house: 'Дом требует целостного подхода - учитывайте переходы между этажами и связь с внешним пространством.',
    office: 'Офис должен способствовать продуктивности - разделите зоны фокусной работы и коллаборации.',
    commercial: 'Коммерческие помещения нуждаются в оптимизации потока покупателей и удобства эксплуатации.',
    studio: 'Студия требует максимальной функциональности на минимальной площади - используйте трансформируемую мебель.',
    other: 'Уникальное помещение требует индивидуального подхода - рекомендуем консультацию специалиста.',
  }

  recommendations.push({
    type: 'concept',
    title: 'Концепция дизайна',
    text: propertyAdvice[propertyType] || propertyAdvice.other,
  })

  // Рекомендации по зонам
  if (zones && zones.length > 0) {
    recommendations.push({
      type: 'zones',
      title: `Дизайн для ${zones.length} зон`,
      text: `Мы разработаем гармоничный дизайн для всех ${zones.length} выбранных зон, обеспечивая функциональность и стилевое единство.`,
    })
  }

  // Рекомендации по стилю
  const styleAdvice = {
    modern: 'Современный стиль обеспечит функциональность и актуальность. Рекомендуем минималистичную цветовую гамму и качественные материалы.',
    minimalism: 'Минимализм требует тщательного отбора элементов. Фокусируемся на функции и чистых линиях.',
    scandinavian: 'Скандинавский стиль создаст уют и светлоту. Натуральные материалы и мягкие цвета.',
    loft: 'Лофт требует открытых планировок и промышленных материалов. Идеален для творческих пространств.',
    neoclassic: 'Неоклассика - баланс классики и современности. Элегантные пропорции и качественные отделки.',
    classic: 'Классический стиль требует внимания к деталям. Будет выглядеть престижно и вечно.',
    countryside: 'Загородный стиль создаст теплоту и связь с природой. Натуральные фактуры и земляные тона.',
    undecided: 'Мы поможем найти оптимальный стиль, учитывая архитектуру и ваши предпочтения.',
  }

  recommendations.push({
    type: 'style',
    title: `Дизайн в стиле ${style ? styleAdvice[style]?.split('.')[0] : 'персональный'}`,
    text: styleAdvice[style] || styleAdvice.undecided,
  })

  // AI персональные рекомендации
  if (aiAnswers) {
    const aiInsight = generateAIInsight(aiAnswers, propertyType, area)
    recommendations.push({
      type: 'ai',
      title: '🤖 Персональные рекомендации AI',
      text: aiInsight,
    })
  }

  return recommendations
}

// Расчёт детальной сметы по категориям
export const calculateDetailedPrice = (propertyType, area, budget, style, zones = [], aiAnswers = {}) => {
  const basePrice = {
    apartment: 12000,
    house: 18000,
    office: 8000,
    commercial: 15000,
    studio: 10000,
    other: 14000,
  }

  const styleMultiplier = {
    modern: 1.2,
    minimalism: 0.95,
    scandinavian: 1.15,
    loft: 1.35,
    neoclassic: 1.5,
    classic: 1.45,
    countryside: 1.2,
    undecided: 1.0,
  }

  // Работы по дизайну и проектированию
  const designerFee = calculateDesignerFee(propertyType, area)

  // Затраты на материалы и отделку
  const base = basePrice[propertyType] || basePrice.other
  const styleCoeff = styleMultiplier[style] || 1.0
  const zoneCount = zones && zones.length > 0 ? zones.length : 3
  const zoneMultiplier = 0.8 + (Math.min(zoneCount, 10) * 0.08)
  
  let materialsCost = base * area * styleCoeff * zoneMultiplier

  // Коэффициент сложности от AI ответов
  let aiComplexityMultiplier = 1.0
  if (aiAnswers) {
    if (aiAnswers.functionality === 'Эстетика и впечатление') {
      aiComplexityMultiplier = 1.25
    } else if (aiAnswers.functionality === 'Баланс всех факторов') {
      aiComplexityMultiplier = 1.15
    }
    if (aiAnswers.timeline === 'Срочно (в течение месяца)') {
      aiComplexityMultiplier *= 1.4
    } else if (aiAnswers.timeline === 'Быстро (1-2 месяца)') {
      aiComplexityMultiplier *= 1.15
    }
    if (aiAnswers.atmosphere === 'Творческую и оригинальную') {
      aiComplexityMultiplier *= 1.2
    }
  }

  materialsCost *= aiComplexityMultiplier

  // Выполнение работ (монтаж, установка и т.д.)
  const laborCost = materialsCost * 0.4 // 40% от стоимости материалов

  // Детали и фурнитура
  const accessoriesCost = materialsCost * 0.15 // 15% на детали

  // Консультации и координация проекта
  const consultationCost = designerFee * 0.5

  // Непредвиденные расходы
  const subtotal = designerFee + materialsCost + laborCost + accessoriesCost + consultationCost
  const contingency = subtotal * 0.12

  // НДС 18%
  const vat = (subtotal + contingency) * 0.18

  const total = subtotal + contingency + vat

  // Получаем диапазон бюджета пользователя
  const budgetRange = getBudgetRange(budget)
  
  // Если цена больше максимального бюджета - масштабируем вниз
  let finalTotal = Math.round(total)
  let scaleFactor = 1.0
  
  if (finalTotal > budgetRange.max && budgetRange.max !== Infinity) {
    scaleFactor = budgetRange.max / total
    finalTotal = budgetRange.max
  }

  return {
    designerFee: Math.round(designerFee * scaleFactor),
    materialsCost: Math.round(materialsCost * scaleFactor),
    laborCost: Math.round(laborCost * scaleFactor),
    accessoriesCost: Math.round(accessoriesCost * scaleFactor),
    consultationCost: Math.round(consultationCost * scaleFactor),
    contingency: Math.round(contingency * scaleFactor),
    vat: Math.round(vat * scaleFactor),
    total: finalTotal,
  }
}

// Форматирование детальной сметы
const formatBudgetDetail = (priceDetails) => {
  return `
📋 **Разбор стоимости проекта:**

🎨 Услуги дизайнера: ${formatPrice(priceDetails.designerFee)}
💎 Материалы и отделка: ${formatPrice(priceDetails.materialsCost)}
🔨 Работы по монтажу: ${formatPrice(priceDetails.laborCost)}
✨ Детали и фурнитура: ${formatPrice(priceDetails.accessoriesCost)}
📋 Координация проекта: ${formatPrice(priceDetails.consultationCost)}
⚠️ Непредвиденные расходы: ${formatPrice(priceDetails.contingency)}
📊 НДС 18%: ${formatPrice(priceDetails.vat)}

**━━━━━━━━━━━━━━━━━━━━━━━━**
💰 **ИТОГО: ${formatPrice(priceDetails.total)}**

✓ Смета составлена с учётом вашего бюджета и требований проекта
✓ Включает все работы и материалы
✓ Реалистичные сроки выполнения
  `.trim()
}

// Генерация AI инсайтов на основе ответов
const generateAIInsight = (aiAnswers, propertyType, area) => {
  let insight = `На основе ваших ответов, А.И. составила персональное предложение:\n\n`

  if (aiAnswers.functionality) {
    insight += `✓ Приоритет: ${aiAnswers.functionality}\n`
  }
  if (aiAnswers.timeline) {
    insight += `⏱ Сроки: ${aiAnswers.timeline}\n`
  }
  if (aiAnswers.atmosphere) {
    insight += `🎭 Атмосфера: ${aiAnswers.atmosphere}\n`
  }

  insight += `\nМы специализируемся на уникальных проектах дизайна. Наша команда создаст пространство, которое полностью отражает ваши потребности о получит аккредитацию от ведущих дизайнеров интерьеров.`

  return insight
}

// Форматирование цены в рубли
const formatPrice = (price) => {
  return `${(price || 0).toLocaleString('ru-RU')} ₽`
}

// Генерация персонального письма от AI с детальными рекомендациями
export const generateAILetter = (quizData) => {
  const { 
    name, 
    propertyType, 
    area, 
    style, 
    budget, 
    zones, 
    aiAnswers = {},
    aiMode 
  } = quizData

  if (!aiMode) return null

  let letter = `Добрый день, ${name || 'друже'}! 👋\n\n`
  letter += `Спасибо за доверие! Проанализировав ваши ответы, я подготовил персональные рекомендации для вашего проекта.\n\n`

  // Анализ типа помещения
  const propertyAnalysis = {
    apartment: `Ваша квартира — идеальное место, чтобы создать личное пространство. С площадью ${area}м² мы разработаем функциональный и уютный интерьер, где каждая зона выполняет свою роль.`,
    house: `Ваш дом — это целостный проект! С учетом площади ${area}м² мы создадим гармоничность между всеми помещениями, обеспечив плавные переходы и единство стиля.`,
    office: `Ваш офис должен вдохновлять команду. На площади ${area}м² разместим зоны для фокусной работы и сотрудничества, создавая продуктивную среду.`,
    commercial: `Ваше коммерческое помещение площадью ${area}м² будет оптимизировано для привлечения клиентов и удобства персонала.`,
    studio: `Компактная студия требует максимальной функциональности! На ${area}м² используем трансформируемые решения и мультизонирование.`,
  }

  letter += propertyAnalysis[propertyType] || propertyAnalysis.apartment
  letter += '\n\n'

  // Анализ стиля
  const styleAnalysis = {
    modern: `Вы выбрали современный стиль — это означает, что вам нравятся четкие линии, функциональность и актуальные материалы. Мы создадим минималистичный интерьер с современными технологиями и комфортом.`,
    minimalism: `Минимализм — ваш выбор! Это требует тщательного отбора каждого элемента. В проекте будет только самое необходимое, без лишних деталей, но с максимальной гармонией.`,
    scandinavian: `Скандинавский стиль подарит уют и свет! Натуральные материалы, мягкая цветовая гамма и функциональный дизайн создадут спокойную атмосферу.`,
    loft: `Лофт — смелый выбор! Откроем архитектуру, используем промышленные элементы и натуральные материалы. Идеально для творческой энергии.`,
    neoclassic: `Неоклассика — баланс элегантности и современности! Классические пропорции с современными удобствами создадут престижный и вневременный интерьер.`,
    classic: `Классический стиль — это качество, масштабность и вечность! Каждая деталь будет тщательно продумана для создания гармоничного, изысканного пространства.`,
    countryside: `Деревенский стиль привнесет тепло и природность! Натуральные материалы, деревянные элементы и мягкие цвета создадут атмосферу уюта и спокойствия.`,
  }

  letter += styleAnalysis[style] || 'Мы определим оптимальный стиль для вашего пространства.'
  letter += '\n\n'

  // Специфичные рекомендации по AI ответам
  if (aiAnswers && Object.keys(aiAnswers).length > 0) {
    letter += '📊 На основе ваших ответов:\n\n'

    // Анализ по типу помещения и ответам
    if (propertyType === 'apartment') {
      if (aiAnswers.purpose) {
        letter += `• Назначение: ${aiAnswers.purpose} — подберём функциональность и стиль для вашего образа жизни\n`
      }
      if (aiAnswers.family) {
        letter += `• Количество проживающих: ${aiAnswers.family} — оптимизируем пространство для комфорта всех\n`
      }
      if (aiAnswers.lifestyle) {
        letter += `• Образ жизни: ${aiAnswers.lifestyle} — создадим интерьер, который поддерживает ваш стиль\n`
      }
    } else if (propertyType === 'house') {
      if (aiAnswers.purpose) {
        letter += `• Проживание: ${aiAnswers.purpose} — разработаем зонирование под вашу семейную структуру\n`
      }
      if (aiAnswers.outdoor) {
        letter += `• Связь с природой: ${aiAnswers.outdoor} — интегрируем внешнее пространство гармонично\n`
      }
    } else if (propertyType === 'office') {
      if (aiAnswers.workflow) {
        letter += `• Рабочий процесс: ${aiAnswers.workflow} — проектируем офис для вашего стиля работы\n`
      }
      if (aiAnswers.employees) {
        letter += `• Количество сотрудников: ${aiAnswers.employees} — оптимизируем площадь и эргономику\n`
      }
    } else if (propertyType === 'commercial') {
      if (aiAnswers.business_type) {
        letter += `• Тип бизнеса: ${aiAnswers.business_type} — создадим пространство для вашей ниши\n`
      }
      if (aiAnswers.footfall) {
        letter += `• Посещаемость: ${aiAnswers.footfall} — проектируем с учетом потока клиентов\n`
      }
    }
    
    letter += '\n'
  }

  // Рекомендации по зонам
  if (zones && zones.length > 0) {
    letter += `🎯 Ваши ${zones.length} зон требуют согласованного подхода:\n`
    letter += `Каждая зона получит индивидуальное решение, но единый стилевой язык свяжет их воедино. Это создаст ощущение целостного, продуманного пространства.\n\n`
  }

  // Итоговые рекомендации
  letter += `✨ Итоговый план запуска:\n`
  letter += `1️⃣ Концептуальный эскиз всех зон в выбранном ${style || 'согласованном'} стиле\n`
  letter += `2️⃣ 3D визуализация для утверждения макета\n`
  letter += `3️⃣ Детальная смета и график работ в диапазоне вашего бюджета (${budget || 'обсудим'})\n`
  letter += `4️⃣ Закупка материалов и организация работ\n`
  letter += `5️⃣ Реализация с контролем качества на каждом этапе\n\n`

  letter += `🚀 Ваш уникальный дизайн-проект готов к воплощению!\n\n`
  letter += `Наша команда с нетерпением ждёт возможности работать над вашим интерьером. Менеджер свяжется с вами в течение 24 часов для уточнения деталей.\n\n`
  letter += `С уважением,\n🤖 Ваш персональный AI-ассистент по дизайну`

  return letter
}

// ============================================
// 🎨 ЦВЕТОВЫЕ ПАЛИТРЫ
// ============================================
export const generateColorPalettes = (style, aiAnswers = {}) => {
  const palettes = {
    modern: [
      {
        name: 'Контрастный минимализм',
        colors: ['#000000', '#FFFFFF', '#F3F4F6', '#EF4444'],
        description: 'Черно-белая база с акцентом красного',
        hex: ['#000000', '#FFFFFF', '#F3F4F6', '#EF4444'],
      },
      {
        name: 'Нейтральный хай-тек',
        colors: ['#1F2937', '#9CA3AF', '#E5E7EB', '#3B82F6'],
        description: 'Серый спектр с голубым акцентом',
        hex: ['#1F2937', '#9CA3AF', '#E5E7EB', '#3B82F6'],
      },
      {
        name: 'Стальной образ',
        colors: ['#374151', '#D1D5DB', '#FFFFFF', '#06B6D4'],
        description: 'Холодные тона с голубым',
        hex: ['#374151', '#D1D5DB', '#FFFFFF', '#06B6D4'],
      },
    ],
    minimalism: [
      {
        name: 'Чистая белизна',
        colors: ['#FFFFFF', '#F9FAFB', '#F3F4F6', '#D1D5DB'],
        description: 'Максимально светлая палитра',
        hex: ['#FFFFFF', '#F9FAFB', '#F3F4F6', '#D1D5DB'],
      },
      {
        name: 'Серая гармония',
        colors: ['#111827', '#6B7280', '#E5E7EB', '#FFFFFF'],
        description: 'Три оттенка серого + белый',
        hex: ['#111827', '#6B7280', '#E5E7EB', '#FFFFFF'],
      },
    ],
    scandinavian: [
      {
        name: 'Скандинавский уют',
        colors: ['#FFFFFF', '#F3E8D8', '#DEB887', '#8B6F47'],
        description: 'Светлые натуральные тона',
        hex: ['#FFFFFF', '#F3E8D8', '#DEB887', '#8B6F47'],
      },
      {
        name: 'Ледяное озеро',
        colors: ['#F0FDFA', '#CCFBF1', '#99F6E4', '#14B8A6'],
        description: 'Голубые тона природы',
        hex: ['#F0FDFA', '#CCFBF1', '#99F6E4', '#14B8A6'],
      },
      {
        name: 'Лесная прогулка',
        colors: ['#FFFFFF', '#F0FDF4', '#DCFCE7', '#4ADE80'],
        description: 'Зеленые и белые тона',
        hex: ['#FFFFFF', '#F0FDF4', '#DCFCE7', '#4ADE80'],
      },
    ],
    loft: [
      {
        name: 'Промышленный шик',
        colors: ['#27272A', '#52525B', '#A1A1AA', '#FFFFFF'],
        description: 'Темный металлический стиль',
        hex: ['#27272A', '#52525B', '#A1A1AA', '#FFFFFF'],
      },
      {
        name: 'Кирпич и бетон',
        colors: ['#8B4513', '#A0522D', '#D2B48C', '#F5F5DC'],
        description: 'Теплые индустриальные тона',
        hex: ['#8B4513', '#A0522D', '#D2B48C', '#F5F5DC'],
      },
    ],
    neoclassic: [
      {
        name: 'Золотая элегия',
        colors: ['#1C1617', '#D4AF37', '#F5E6D3', '#FFFFFF'],
        description: 'Черный с золотом и слоновой костью',
        hex: ['#1C1617', '#D4AF37', '#F5E6D3', '#FFFFFF'],
      },
      {
        name: 'Серебристая роскошь',
        colors: ['#2C3E50', '#ECF0F1', '#95A5A6', '#34495E'],
        description: 'Благородная серебристая палитра',
        hex: ['#2C3E50', '#ECF0F1', '#95A5A6', '#34495E'],
      },
    ],
    classic: [
      {
        name: 'Королевское величие',
        colors: ['#2C1810', '#8B4513', '#D2B48C', '#F5DEB3'],
        description: 'Богатые коричневиые тона',
        hex: ['#2C1810', '#8B4513', '#D2B48C', '#F5DEB3'],
      },
      {
        name: 'Бургундская роза',
        colors: ['#3D0000', '#8B0000', '#D8A098', '#F5E6D3'],
        description: 'Классические красно-коричневые',
        hex: ['#3D0000', '#8B0000', '#D8A098', '#F5E6D3'],
      },
    ],
    countryside: [
      {
        name: 'Деревенское гостеприимство',
        colors: ['#8B7355', '#A0826D', '#E6D5C8', '#FFFAF0'],
        description: 'Теплые земляные тона',
        hex: ['#8B7355', '#A0826D', '#E6D5C8', '#FFFAF0'],
      },
      {
        name: 'Луговые цветы',
        colors: ['#9370DB', '#DDA0DD', '#FFB6C1', '#FFF0F5'],
        description: 'Нежные цветочные оттенки',
        hex: ['#9370DB', '#DDA0DD', '#FFB6C1', '#FFF0F5'],
      },
    ],
  }

  return palettes[style] || palettes.modern
}

// ============================================
// 🛋️ ПОДБОР МАТЕРИАЛОВ
// ============================================
export const generateMaterials = (style, budget, propertyType) => {
  const budgetLevel = {
    'up-to-500k': 'budget',
    '500k-1m': 'mid',
    '1m-2m': 'premium',
    '2m+': 'luxury',
    'undecided': 'mid',
  }

  const level = budgetLevel[budget] || 'mid'

  const materialsByStyle = {
    modern: {
      budget: {
        Основные: ['ДСП покрас', 'Ламинат', 'Крашеная штукатурка'],
        Текстиль: ['Синтетика', 'Смесовое полотно'],
        Акценты: ['Ластик, пластик'],
      },
      mid: {
        Основные: ['МДФ, Шпонированная плита', 'Паркетная доска', 'Микробетон'],
        Текстиль: ['Лён 30%, смесь', 'Технологичные ткани'],
        Акценты: ['Алюминий, стекло'],
      },
      premium: {
        Основные: ['Массив дуба, бука', 'Паркет высочайшего класса', 'Полированный бетон'],
        Текстиль: ['100% лён, хлопок', 'Итальянские ткани'],
        Акценты: ['Натуральный камень, латунь'],
      },
      luxury: {
        Основные: ['Экзотические породы дерева', 'Паркет венге, эбеновое дерево', 'Мраморный полис'],
        Текстиль: ['Дизайнерские итальянские', 'Французский велюр'],
        Акценты: ['Мрамор Калакатта, золотая фурнитура'],
      },
    },
    minimalism: {
      budget: {
        Основные: ['Белый ДСП', 'Наливной пол', 'Гипсокартон'],
        Текстиль: ['Микрофибра', 'Синтетика белая'],
        Акценты: ['Минимум металла'],
      },
      mid: {
        Основные: ['Белый МДФ', 'Светлый ламинат', 'Шпаклёванная стена'],
        Текстиль: ['Лён белый, серый', 'Хлопок'],
        Акценты: ['Сталь, чёрный металл'],
      },
      premium: {
        Основные: ['Белый массив', 'Светлый паркет', 'Штукатурка известковая'],
        Текстиль: ['Итальянский лён', 'Органический хлопок'],
        Акценты: ['Натуральный камень белый'],
      },
      luxury: {
        Основные: ['Финский берёза', 'Европейский дубовый паркет', 'Венецианская штукатурка'],
        Текстиль: ['Швейцарский лён', 'Японский хлопок'],
        Акценты: ['Белый мрамор, платина'],
      },
    },
    scandinavian: {
      budget: {
        Основные: ['Сосна, ель', 'Ламинат под дерево', 'Побеленная стена'],
        Текстиль: ['Хлопко-полиэстер', 'Вязаный трикотаж'],
        Акценты: ['Керамика'],
      },
      mid: {
        Основные: ['Сосна палубная', 'Паркетная доска сосна', 'Побеленная кирпичная стена'],
        Текстиль: ['Лён скандинавский', 'Шерсть мериносовая'],
        Акценты: ['Керамика ручной работы'],
      },
      premium: {
        Основные: ['Белёвый дубовый массив', 'Паркет сосна премиум', 'Натуральный кирпич'],
        Текстиль: ['100% исландская шерсть', 'Органический лён'],
        Акценты: ['Керамика от дизайнеров', 'медь'],
      },
      luxury: {
        Основные: ['Белётая ель итальянская', 'Паркет ручной укладки', 'Специально отобранный кирпич'],
        Текстиль: ['Казахский войлок', 'Пойранская шерсть'],
        Акценты: ['Датская керамика', 'медь с позолотой'],
      },
    },
    loft: {
      budget: {
        Основные: ['Окрашенный кирпич', 'Бетонная стяжка', 'Полированный бетон'],
        Текстиль: ['Брезент, парусина'],
        Акценты: ['Чёрный металл'],
      },
      mid: {
        Основные: ['Красный кирпич очищенный', 'Промышленный паркет', 'Микробетон'],
        Текстиль: ['Жёсткий лён', 'Хлопковая парусина'],
        Акценты: ['Чугун, сталь'],
      },
      premium: {
        Основные: ['Облицовочный кирпич', 'Массив дуба под индустрию', 'Художественный бетон'],
        Текстиль: ['Лён промышленный премиум', 'Хлопок индигосиний'],
        Акценты: ['Кованный металл'],
      },
      luxury: {
        Основные: ['Винтажный кирпич из Европы', 'Экзотический паркет', 'Эксклюзивный бетон'],
        Текстиль: ['Дизайнерский лён', 'Премиум хлопок'],
        Акценты: ['Ручная ковка, медь'],
      },
    },
    neoclassic: {
      budget: {
        Основные: ['Шпонированная плита', 'Ламинат премиум класс', 'Гипсовая лепнина'],
        Текстиль: ['Синтетика блеск'],
        Акценты: ['Пластиковая позолота'],
      },
      mid: {
        Основные: ['Шпонированная доска', 'Паркет светлый', 'Гипсовая колонна'],
        Текстиль: ['Жаккард, велюр'],
        Акценты: ['Золочёная фурнитура'],
      },
      premium: {
        Основные: ['Дубовый массив', 'Паркет классический', 'Гипserviceс резной'],
        Текстиль: ['Шёлк, гобелен'],
        Акценты: ['Позолота 14k'],
      },
      luxury: {
        Основные: ['Красное дерево палиcандр', 'Дворцовый паркет', 'Мраморная лепнина'],
        Текстиль: ['Шелк-шифон, гобелен ручной работы'],
        Акценты: ['Позолота 24k, бронза'],
      },
    },
    classic: {
      budget: {
        Основные: ['Шпонированная мебель', 'Ламинат премиум', 'Тяжелые обои'],
        Текстиль: ['Бархатистая синтетика'],
        Акценты: ['Карнизный пластик'],
      },
      mid: {
        Основные: ['Буковый массив', 'Дубовый паркет', 'Флоковые обои'],
        Текстиль: ['Велюр натуральный', 'Шерстяной гобелен'],
        Акценты: ['Деревянные карнизы'],
      },
      premium: {
        Основные: ['Красное дерево', 'Палаццо-паркет', 'Шелковые обои'],
        Текстиль: ['Дамаск, гобелен ручной работы'],
        Акценты: ['Позолоченные карнизы'],
      },
      luxury: {
        Основные: ['Палисандр, венге', 'Дворцовый паркет', 'Парчовые обои XVIII века'],
        Текстиль: ['Люкс гобелены', 'Дизайнерский гобелен'],
        Акценты: ['Позолота 24k, люстры Swarovski'],
      },
    },
    countryside: {
      budget: {
        Основные: ['Сосна, ель', 'Ламинат под дерево', 'Побелка'],
        Текстиль: ['Хлопок, лён бюджет'],
        Акценты: ['Керамика, лоза'],
      },
      mid: {
        Основные: ['Сосна натуральная', 'Паркетная доска', 'Кирпич натуральный'],
        Текстиль: ['Домотканая ткань', 'Шериль пестротканый'],
        Акценты: ['Гончарная керамика'],
      },
      premium: {
        Основные: ['Дубовый брус', 'Паркет сосна премиум', 'Облицовочный кирпич'],
        Текстиль: ['Льняная ткань премиум', 'Шерстяной войлок'],
        Акценты: ['Расписная керамика'],
      },
      luxury: {
        Основные: ['Экзотическое дерево', 'Врезанный паркет', 'Ручной кирпич'],
        Текстиль: ['Швейцарский лён', 'Английская шерсть'],
        Акценты: ['Авторская керамика'],
      },
    },
  }

  return materialsByStyle[style]?.[level] || materialsByStyle.modern[level]
}

// ============================================
// 💰 РАСШИРЕННАЯ СМЕТА
// ============================================
export const generateEstimate = (quizData) => {
  const { propertyType, area, budget, zones, style } = quizData

  const basePrice = calculateEstimatedPrice(propertyType, area, budget, style, zones)

  // Примерный breakdown (в процентах)
  const breakdown = {
    furniture: 35,      // мебель
    materials: 30,      // материалы (краска, плитка, обои)
    work: 20,          // работы дизайнера и строителей
    miscellaneous: 10,  // прочее (доставка, непредвиденное)
    markup: 5,         // наши услуги
  }

  const detailed = {
    total: basePrice,
    currency: '₽',
    breakdown: {
      furniture: Math.round(basePrice * (breakdown.furniture / 100)),
      materials: Math.round(basePrice * (breakdown.materials / 100)),
      work: Math.round(basePrice * (breakdown.work / 100)),
      miscellaneous: Math.round(basePrice * (breakdown.miscellaneous / 100)),
      markup: Math.round(basePrice * (breakdown.markup / 100)),
    },
    breakdownPercent: breakdown,
    perSqMeter: Math.round(basePrice / area),
    zoneCount: zones?.length || 1,
    estimatedDays: Math.round((area / 10) * 7), // примерно 10 м² в неделю
  }

  return detailed
}

// ============================================
// 📊 LEAD SCORING (ДЛЯ БИЗНЕСА)
// ============================================
export const calculateLeadScore = (quizData) => {
  const { budget, zones, aiMode, propertyType, area } = quizData

  let score = 0
  let factors = []

  // Бюджет (макс +40 баллов)
  const budgetScores = {
    'up-to-500k': 5,
    '500k-1m': 15,
    '1m-2m': 25,
    '2m+': 40,
    'undecided': 10,
  }
  score += budgetScores[budget] || 10
  if (budgetScores[budget] >= 25) factors.push('💰 Высокий бюджет')

  // Зоны (макс +20 баллов)
  const zoneCount = zones?.length || 1
  if (zoneCount >= 5) {
    score += 20
    factors.push('🏠 Много зон')
  } else if (zoneCount >= 3) {
    score += 15
    factors.push('🏠 Средне зон')
  } else {
    score += 5
  }

  // AI режим (макс +20 баллов)
  if (aiMode) {
    score += 20
    factors.push('🤖 Выбран AI режим')
  }

  // Площадь (макс +10 баллов)
  if (area > 100) {
    score += 10
    factors.push('📏 Большая площадь')
  } else if (area > 50) {
    score += 5
  }

  // Тип помещения (макс +10 баллов)
  if (propertyType === 'commercial' || propertyType === 'office') {
    score += 10
    factors.push('🏢 Коммерческие проекты')
  }

  // Определение уровня
  let level = '❄️ Холодный'
  let color = 'blue'

  if (score >= 80) {
    level = '🔥 Горячий клиент'
    color = 'red'
  } else if (score >= 60) {
    level = '🟡 Теплый клиент'
    color = 'orange'
  } else if (score >= 40) {
    level = '💙 Тепловой клиент'
    color = 'blue'
  }

  return {
    score,
    maxScore: 100,
    level,
    color,
    factors,
    percentage: Math.round((score / 100) * 100),
  }
}

// ============================================
// ⚠️ ГЕНЕРАЦИЯ ПРЕДУПРЕЖДЕНИЙ
// ============================================
export const generateWarnings = (quizData) => {
  const { budget, style, area, propertyType, zones } = quizData
  const warnings = []

  // Противоречие: классика + низкий бюджет
  if (style === 'classic' && (budget === 'up-to-500k' || budget === 'undecided')) {
    warnings.push({
      type: 'warning',
      icon: '⚠️',
      text: 'Классика требует качественных материалов. Бюджет может быть недостаточным.',
      suggestion: 'Рекомендуем увеличить бюджет или выбрать другой стиль.',
    })
  }

  // Предупреждение: маленькая площадь, много зон
  if (area < 40 && zones && zones.length > 5) {
    warnings.push({
      type: 'info',
      icon: 'ℹ️',
      text: 'На маленькой площади необходима особая тактика зонирования.',
      suggestion: 'Предложим компактные встроенные решения и трансформируемую мебель.',
    })
  }

  // Инфо: офис требует специфики
  if (propertyType === 'office') {
    warnings.push({
      type: 'info',
      icon: '💼',
      text: 'Для офиса критична эргономика рабочего места.',
      suggestion: 'Предложим актуальную мебель и освещение.',
    })
  }

  // Инфо: коммерческое потребует соответствия СНиПам
  if (propertyType === 'commercial') {
    warnings.push({
      type: 'info',
      icon: '📋',
      text: 'Коммерческое помещение требует соответствия строительным нормам.',
      suggestion: 'Согласуем все с инспекциями перед началом работ.',
    })
  }

  return warnings
}

// ============================================
// 🎯 ЛОГИКА "ЕСЛИ X ТО Y"
// ============================================
export const getSuggestionsBasedOnLogic = (quizData) => {
  const { area, zones, style, aiAnswers, propertyType } = quizData
  const suggestions = []

  // Маленькая площадь → встроенная мебель
  if (area < 50) {
    suggestions.push({
      icon: '🪑',
      title: 'Встроенная мебель',
      description: 'На маленькой площади встроенные шкафы сэкономят место на 30-40%',
    })
  }

  // Минимализм + высокий бюджет → дизайнерская мебель
  if (style === 'minimalism' && (quizData.budget === '2m+' || quizData.budget === '1m-2m')) {
    suggestions.push({
      icon: '✨',
      title: 'Дизайнерская мебель',
      description: 'Предложим мебель от известных дизайнеров (Vitra, USM, Hay)',
    })
  }

  // Много зон → стильное зонирование
  if (zones && zones.length >= 4) {
    suggestions.push({
      icon: '📐',
      title: 'Центры зонирования',
      description: 'Разделим зоны красивыми перегородками, не теряя света',
    })
  }

  // Офис → эргономика
  if (propertyType === 'office') {
    suggestions.push({
      icon: '💼',
      title: 'Эргономичная мебель',
      description: 'Массивные столы и кресла с подддержкой спины для производительности',
    })
  }

  // Лофт + высокий бюджет → сырые материалы
  if (style === 'loft' && quizData.budget !== 'up-to-500k') {
    suggestions.push({
      icon: '🧱',
      title: 'Экспонирование материалов',
      description: 'Откроем кирпич, бетон, балки для аутентичного лофта',
    })
  }

  // AI режим + семьи → зулу для детей
  if (aiAnswers?.family && (aiAnswers.family.includes('4') || aiAnswers.family.includes('5') || aiAnswers.family.includes('6'))) {
    suggestions.push({
      icon: '👶',
      title: 'Детская безопасность',
      description: 'Специальные краски, скруглённые углы, безопасные материалы',
    })
  }

  return suggestions
}

// ============================================
// 🚀 ШАГИ "С ЧЕГО НАЧАТЬ РЕМОНТ"
// ============================================
export const generateStartSteps = (quizData) => {
  const { propertyType, area, budget } = quizData

  const steps = [
    {
      step: 1,
      emoji: '📋',
      title: 'Согласование проекта',
      duration: '1-2 недели',
      description: 'Создаём 3D визуализацию, вы выбираете вариант',
    },
    {
      step: 2,
      emoji: '🛒',
      title: 'Закупка материалов',
      duration: '2-3 недели',
      description: 'Покупаем всё необходимое с доставкой на объект',
    },
    {
      step: 3,
      emoji: '🔨',
      title: 'Демонтаж и подготовка',
      duration: '1-2 недели',
      description: 'Снос старых покрытий, выравнивание поверхностей',
    },
    {
      step: 4,
      emoji: '🎨',
      title: 'Отделочные работы',
      duration: '2-4 недели',
      description: 'Покраска, укладка плитки, монтаж материалов',
    },
    {
      step: 5,
      emoji: '✨',
      title: 'Финализация и тесты',
      duration: '3-5 дней',
      description: 'Расстановка мебели, финальная уборка, сдача объекта',
    },
  ]

  // Видоизмение по площади
  const durationMultiplier = area / 50 // базовая площадь 50 м²

  return steps.map(s => ({
    ...s,
    durationMultiplier: Math.round(durationMultiplier * 10) / 10,
  }))
}

// ============================================
// 🔧 ВОПРОСЫ ПО БЮДЖЕТУ
// ============================================
export const getQuestionsByBudget = (budget) => {
  const questions = {
    'up-to-500k': [
      'Готовы ли вы к компромиссам в материалах?',
      'Много работ вы можете сделать самостоятельно?',
    ],
    '500k-1m': [
      'Какой процент можно отвести на авторский надзор?',
      'Предпочитаете ли вы кредит или оплату единовременно?',
    ],
    '1m-2m': [
      'Интересует ли вас дизайнерская мебель?',
      'Нужна ли вам полная консультация архитектора?',
    ],
    '2m+': [
      'Хотите ли вы эксклюзивные материалы?',
      'Интересует ли вас премиум управление проектом?',
    ],
  }

  return questions[budget] || []
}

// ============================================
// 💪 ОБОГАЩЕНИЕ РЕКОМЕНДАЦИЙ
// ============================================
export const enrichRecommendations = (recommendations, zones = [], area = 0, style = '') => {
  let enriched = [...recommendations]

  // Добавляем контекст к рекомендациям
  enriched = enriched.map((rec, idx) => {
    let additionalContext = ''

    if (rec.type === 'zones' && zones.length > 0) {
      additionalContext += ` Площадь под каждую зону: ${Math.round(area / zones.length)}м².`
    }

    if (rec.type === 'style') {
      if (area < 50) {
        additionalContext += ' На малом пространстве стиль особенно важен.'
      }
      if (zones && zones.length > 5) {
        additionalContext += ' Единый язык стиля связует много зон.'
      }
    }

    if (rec.type === 'budget' && area > 0) {
      additionalContext += ` Это примерно ${Math.round((parseFloat(rec.text) / area) * 1000)}₽ за метр.`
    }

    return {
      ...rec,
      text: rec.text + additionalContext,
    }
  })

  return enriched
}
