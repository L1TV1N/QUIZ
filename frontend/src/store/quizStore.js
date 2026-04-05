import { create } from 'zustand'
import { defaultQuizConfig } from '../config/defaultQuizConfig'

const useQuizStore = create((set) => ({
  // Состояние квиза (из ТЗ с корректировками)
  quizState: {
    // Режим работы
    aiMode: false,
    
    // Основные поля из ТЗ
    propertyType: '',      // Тип помещения (квартира, дом, офис, коммерч, студия, другое)
    zones: [],             // Зоны (множественный выбор - кухня, гостиная и т.д.)
    area: 60,              // Площадь помещения (число, ползунок 20-300)
    style: '',             // Стиль интерьера (одиночный выбор - современный, минимализм и т.д.)
    budget: '',            // Бюджет (одиночный выбор)
    
    // AI режим - дополнительные ответы
    aiAnswers: {},         // Ответы на AI вопросы {questionId: answer}
    
    // Контактные данные
    name: '',              // Имя (обязательно)
    phone: '',             // Телефон (обязательно)
    email: '',             // Email (опционально)
    comment: '',           // Комментарий (опционально)
    agreeToTerms: false,   // Чекбокс согласия на обработку данных (обязательно)
  },
  
  // Текущий шаг квиза
  currentStep: 0,
  
  quizConfig: defaultQuizConfig,

  // Результат AI
  aiResult: null,
  
  // AI-вопросы (для промежуточного этапа)
  aiQuestions: [],
  
  // Loading states
  isLoading: false,
  
  // Actions
  setQuizState: (newState) =>
    set((state) => ({
      quizState: { ...state.quizState, ...newState },
    })),
  
  updateField: (field, value) =>
    set((state) => ({
      quizState: { ...state.quizState, [field]: value },
    })),
  
  // Обновить стиль (ОДИНОЧНЫЙ выбор по ТЗ)
  updateStyle: (style) =>
    set((state) => ({
      quizState: { ...state.quizState, style },
    })),
  
  // Обновить зоны (множественный выбор)
  updateZones: (zone) =>
    set((state) => {
      const currentZones = state.quizState.zones || []
      const newZones = currentZones.includes(zone)
        ? currentZones.filter((z) => z !== zone)
        : [...currentZones, zone]
      
      return {
        quizState: { ...state.quizState, zones: newZones },
      }
    }),
  
  nextStep: () =>
    set((state) => ({
      currentStep: state.currentStep + 1,
    })),
  
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),
  
  setStep: (step) =>
    set(() => ({
      currentStep: step,
    })),
  
  setQuizConfig: (config) =>
    set(() => ({
      quizConfig: config || defaultQuizConfig,
    })),

  setAiResult: (result) =>
    set(() => ({
      aiResult: result,
    })),
  
  setAiQuestions: (questions) =>
    set(() => ({
      aiQuestions: questions,
    })),
  
  setLoading: (loading) =>
    set(() => ({
      isLoading: loading,
    })),
  
  reset: () =>
    set(() => ({
      quizState: {
        aiMode: false,
        propertyType: '',
        zones: [],
        area: 60,
        style: '',
        budget: '',
        aiAnswers: {},
        name: '',
        phone: '',
        email: '',
        comment: '',
        agreeToTerms: false,
      },
      currentStep: 0,
      quizConfig: defaultQuizConfig,
      aiResult: null,
      aiQuestions: [],
      isLoading: false,
    })),
}))

export default useQuizStore
