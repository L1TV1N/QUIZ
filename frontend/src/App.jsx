import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import useQuizStore from './store/quizStore'
import { Step0ModeSelection } from './components/steps/Step0ModeSelection'
import { Step1Intro } from './components/steps/Step1Intro'
import { Step2Property } from './components/steps/Step2Property'
import { Step3Zones } from './components/steps/Step3Zones'
import { Step4Area } from './components/steps/Step4Area'
import { Step4Style } from './components/steps/Step4Style'
import { Step5Budget } from './components/steps/Step5Budget'
import { Step6Contacts } from './components/steps/Step6Contacts'
import { Step7AiQuestions } from './components/steps/Step7AiQuestions'
import { ResultScreen } from './components/ResultScreen'
import { AiLoadingScreen } from './components/AiLoadingScreen'
import { AlmostReadyScreen } from './components/AlmostReadyScreen'
import { AdminPanel } from './components/AdminPanel'
import { AdminLogin } from './components/AdminLogin'
import './styles/index.css'

function App() {
  const currentStep = useQuizStore((state) => state.currentStep)
  const nextStep = useQuizStore((state) => state.nextStep)
  const prevStep = useQuizStore((state) => state.prevStep)
  const reset = useQuizStore((state) => state.reset)
  const aiResult = useQuizStore((state) => state.aiResult)
  const aiMode = useQuizStore((state) => state.quizState.aiMode)

  // States для навигации промежуточных экранов
  const [showAlmostReady, setShowAlmostReady] = useState(false)
  const [showLoading, setShowLoading] = useState(false)

  // Админ-панель
  const [isAdminRoute, setIsAdminRoute] = useState(false)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false)

  // Темная тема
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  // Проверяем маршрут при загрузке
  useEffect(() => {
    const checkAdminRoute = () => {
      const isAdmin = window.location.pathname.includes('/admin')
      setIsAdminRoute(isAdmin)

      if (isAdmin) {
        // Проверяем если пользователь уже залогинен
        const loggedIn = localStorage.getItem('adminLoggedIn')
        const loginTime = localStorage.getItem('adminLoginTime')

        if (loggedIn && loginTime) {
          // Сессия действительна 24 часа
          const hoursPassed = (Date.now() - parseInt(loginTime)) / (1000 * 60 * 60)
          if (hoursPassed < 24) {
            setIsAdminLoggedIn(true)
          } else {
            localStorage.removeItem('adminLoggedIn')
            localStorage.removeItem('adminLoginTime')
          }
        }
      }
    }

    checkAdminRoute()

    // Слушаем изменения маршрута
    window.addEventListener('hashchange', checkAdminRoute)
    window.addEventListener('popstate', checkAdminRoute)

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute)
      window.removeEventListener('popstate', checkAdminRoute)
    }
  }, [])

  // Сохраняем темную тему в localStorage и применяем класс при старте
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    
    // Обновляем класс html
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Применяем сохраненную тему при загрузке компонента
  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved && JSON.parse(saved)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Проверяем backend на старте
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/health')
        if (!response.ok) {
          console.warn('⚠️ Backend не доступен')
        } else {
          console.log('✅ Backend доступен')
        }
      } catch (error) {
        console.warn('⚠️ Backend не запущен:', error.message)
      }
    }
    
    checkBackend()
  }, [])



  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true)
  }

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false)
    localStorage.removeItem('adminLoggedIn')
    localStorage.removeItem('adminLoginTime')
    window.location.href = '/'
  }

  const handleRestart = () => {
    reset()
    setShowAlmostReady(false)
    setShowLoading(false)
  }

  const handleContactsNext = () => {
    if (aiMode) {
      // AI режим: показываем "почти готово" экран
      setShowAlmostReady(true)
    } else {
      // Обычный режим: сразу到 результат
      nextStep()
    }
  }

  const handleAlmostReadyComplete = () => {
    // Показываем AI Loading экран
    setShowLoading(true)
    
    // Ждём пока aiResult будет установлена
    const checkInterval = setInterval(() => {
      // Если aiResult уже есть - закрываем loading и результат
      const currentAiResult = useQuizStore.getState().aiResult
      if (currentAiResult) {
        clearInterval(checkInterval)
        setShowAlmostReady(false)
        setShowLoading(false)
      }
    }, 100) // Проверяем каждые 100ms
    
    // На случай зависания - максимальная задержка 5 сек
    setTimeout(() => {
      clearInterval(checkInterval)
      setShowAlmostReady(false)
      setShowLoading(false)
      nextStep()
    }, 5000)
  }

  // Админ-панель (если маршрут /admin)
  if (isAdminRoute) {
    if (!isAdminLoggedIn) {
      return <AdminLogin onLogin={handleAdminLogin} />
    }
    return <AdminPanel onLogout={handleAdminLogout} />
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Dark Mode Toggle */}
      <motion.button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-4 right-4 z-50 p-3 rounded-full backdrop-blur-sm transition-all ${
          darkMode 
            ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
            : 'bg-white text-blue-500 hover:bg-gray-100 shadow-lg'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle dark mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </motion.button>

      {/* Admin Panel Button */}
      <motion.a
        href="/admin"
        className="fixed top-4 left-4 z-50 p-2 rounded-full backdrop-blur-sm transition-all opacity-25 hover:opacity-75 text-xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="Админ-панель"
      >
        ⚙️
      </motion.a>

      <AnimatePresence mode="wait">
        {/* AI Loading Screen */}
        {showLoading && aiMode && (
          <AiLoadingScreen key="ai-loading" />
        )}

        {/* Финальный результат */}
        {aiResult ? (
          <ResultScreen key="result" onRestart={handleRestart} />
        ) : null}

        {/* Almost Ready Screen (перед результатом в AI режиме) */}
        {showAlmostReady && aiMode && !showLoading && (
          <AlmostReadyScreen key="almost-ready" onComplete={handleAlmostReadyComplete} />
        )}

        {/* Основные шаги квиза */}
        {!aiResult && !showAlmostReady && !showLoading && (
          <>
            {/* Шаг 0: Выбор режима */}
            {currentStep === 0 && (
              <Step0ModeSelection key="step-0" onNext={nextStep} />
            )}

            {/* Шаг 1: Введение */}
            {currentStep === 1 && (
              <Step1Intro key="step-1" onNext={nextStep} />
            )}

            {/* Шаг 2: Тип помещения */}
            {currentStep === 2 && (
              <Step2Property
                key="step-2"
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {/* Шаг 3: Зоны */}
            {currentStep === 3 && (
              <Step3Zones
                key="step-3"
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {/* Шаг 4: Площадь */}
            {currentStep === 4 && (
              <Step4Area
                key="step-4"
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {/* Шаг 5: Стиль */}
            {currentStep === 5 && (
              <Step4Style
                key="step-5"
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {/* Шаг 6: Бюджет */}
            {currentStep === 6 && (
              <Step5Budget
                key="step-6"
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {/* Шаг 7: AI вопросы (только если aiMode включен) */}
            {currentStep === 7 && aiMode && (
              <Step7AiQuestions
                key="step-7"
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {/* Шаг 8 (если AI) или Шаг 7 (если обычный): Контакты */}
            {((aiMode && currentStep === 8) || (!aiMode && currentStep === 7)) && (
              <Step6Contacts
                key="step-contacts"
                onNext={aiMode ? handleContactsNext : nextStep}
                onPrev={prevStep}
              />
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
