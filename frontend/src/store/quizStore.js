import { create } from 'zustand'

const useQuizStore = create((set) => ({
  // Состояние квиза (из конституции)
  quizState: {
    propertyType: '',
    area: '',
    rooms: '',
    condition: '',
    style: [],
    budget: '',
    timeline: '',
    name: '',
    contact: '',
  },
  
  // Текущий шаг (0-5 это шаги, 6 - финальный результат)
  currentStep: 0,
  
  // Результат AI
  aiResult: null,
  
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
  
  updateStyle: (style) =>
    set((state) => {
      const currentStyles = state.quizState.style || []
      const newStyles = currentStyles.includes(style)
        ? currentStyles.filter((s) => s !== style)
        : [...currentStyles, style]
      
      return {
        quizState: { ...state.quizState, style: newStyles },
      }
    }),
  
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 6),
    })),
  
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 0),
    })),
  
  setStep: (step) =>
    set(() => ({
      currentStep: step,
    })),
  
  setAiResult: (result) =>
    set(() => ({
      aiResult: result,
    })),
  
  setLoading: (loading) =>
    set(() => ({
      isLoading: loading,
    })),
  
  reset: () =>
    set(() => ({
      quizState: {
        propertyType: '',
        area: '',
        rooms: '',
        condition: '',
        style: [],
        budget: '',
        timeline: '',
        name: '',
        contact: '',
      },
      currentStep: 0,
      aiResult: null,
      isLoading: false,
    })),
}))

export default useQuizStore
