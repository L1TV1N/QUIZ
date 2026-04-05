import { create } from 'zustand'
import api from '../services/api'
import defaultQuizConfig from '../config/defaultQuizConfig'

const useQuizConfigStore = create((set, get) => ({
  config: defaultQuizConfig,
  isLoading: false,
  hasLoaded: false,
  error: null,
  loadConfig: async (force = false) => {
    if (get().hasLoaded && !force) return get().config

    set({ isLoading: true, error: null })
    try {
      const response = await api.get('/quiz-config')
      const config = response?.data?.config || defaultQuizConfig
      set({ config, isLoading: false, hasLoaded: true, error: null })
      return config
    } catch (error) {
      console.warn('Не удалось загрузить удалённую конфигурацию квиза, используется локальная.', error)
      set({ config: defaultQuizConfig, isLoading: false, hasLoaded: true, error: error?.message || 'load_failed' })
      return defaultQuizConfig
    }
  },
}))

export default useQuizConfigStore
