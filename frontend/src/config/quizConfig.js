import { defaultQuizConfig } from './defaultQuizConfig'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
let cachedConfig = null

export const getDefaultQuizConfig = () => JSON.parse(JSON.stringify(defaultQuizConfig))

export const fetchQuizConfig = async () => {
  try {
    const response = await fetch(`${API_BASE}/quiz-config`)
    if (!response.ok) throw new Error('Не удалось загрузить конфиг')
    const data = await response.json()
    cachedConfig = data
    return data
  } catch (error) {
    console.warn('Используется дефолтный конфиг:', error.message)
    const fallback = getDefaultQuizConfig()
    cachedConfig = fallback
    return fallback
  }
}

export const getQuizConfig = () => cachedConfig || getDefaultQuizConfig()

export const getZonesByProperty = (propertyType) => {
  const config = getQuizConfig()
  return config?.zonesByProperty?.[propertyType] || config?.zonesByProperty?.other || []
}

export const getRandomizedAIQuestions = (propertyType) => {
  const config = getQuizConfig()
  const aiCfg = config?.aiQuestions || {}
  const propertyQuestions = aiCfg?.byProperty?.[propertyType] || aiCfg?.byProperty?.other || []
  const universalQuestions = aiCfg?.universal || []
  const minQuestions = aiCfg?.minQuestions ?? 5
  const maxQuestions = aiCfg?.maxQuestions ?? 9

  const shuffled = [...propertyQuestions, ...universalQuestions].sort(() => Math.random() - 0.5)
  const count = Math.min(maxQuestions, Math.max(minQuestions, shuffled.length))
  return shuffled.slice(0, count)
}
