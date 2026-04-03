import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Отправить квиз
export const submitQuiz = async (quizData) => {
  try {
    const response = await api.post('/submit-quiz', quizData)
    return response.data
  } catch (error) {
    console.error('API Error:', error)
    throw error
  }
}

// Проверка health
export const checkHealth = async () => {
  try {
    const response = await api.get('/health')
    return response.data
  } catch (error) {
    console.error('Health check failed:', error)
    return null
  }
}

// Получить все заявки (для админ-панели)
export const getLeads = async () => {
  try {
    const response = await api.get('/leads')
    return response.data
  } catch (error) {
    console.error('Error fetching leads:', error)
    return []
  }
}

export default api
