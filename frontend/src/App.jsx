import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import useQuizStore from './store/quizStore'
import { Step1Intro } from './components/steps/Step1Intro'
import { Step2Property } from './components/steps/Step2Property'
import { Step3Params } from './components/steps/Step3Params'
import { Step4Style } from './components/steps/Step4Style'
import { Step5Budget } from './components/steps/Step5Budget'
import { Step6Contacts } from './components/steps/Step6Contacts'
import { ResultScreen } from './components/ResultScreen'
import './styles/index.css'

function App() {
  const currentStep = useQuizStore((state) => state.currentStep)
  const nextStep = useQuizStore((state) => state.nextStep)
  const prevStep = useQuizStore((state) => state.prevStep)
  const reset = useQuizStore((state) => state.reset)
  // const setStep = useQuizStore((state) => state.setStep)
  const aiResult = useQuizStore((state) => state.aiResult)

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

  const handleRestart = () => {
    reset()
  }

  return (
    <div className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {/* Финальный результат */}
        {aiResult ? (
          <ResultScreen key="result" onRestart={handleRestart} />
        ) : null}

        {/* Шаги квиза */}
        {!aiResult && (
          <>
            {currentStep === 0 && (
              <Step1Intro key="step-1" onNext={nextStep} />
            )}

            {currentStep === 1 && (
              <Step2Property
                key="step-2"
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {currentStep === 2 && (
              <Step3Params
                key="step-3"
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {currentStep === 3 && (
              <Step4Style
                key="step-4"
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {currentStep === 4 && (
              <Step5Budget
                key="step-5"
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {currentStep === 5 && (
              <Step6Contacts
                key="step-6"
                onNext={nextStep}
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
