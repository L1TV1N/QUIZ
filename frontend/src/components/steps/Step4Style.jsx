import { motion } from 'framer-motion'
import { QuizStep } from '../QuizStep'
import { Card } from '../ui/SharedUI'
import useQuizStore from '../../store/quizStore'

export const Step4Style = ({ onNext, onPrev }) => {
  const quizState = useQuizStore((state) => state.quizState)
  const quizConfig = useQuizStore((state) => state.quizConfig)
  const updateStyle = useQuizStore((state) => state.updateStyle)

  const selected = quizState.style
  const styleStep = quizConfig?.steps?.styles
  const styles = styleStep?.options || []

  return (
    <QuizStep
      title={styleStep?.title || 'Какой стиль интерьера вам ближе?'}
      subtitle={styleStep?.subtitle || 'Выберите один стиль, который вдохновляет вас больше всего'}
      currentStep={4}
      totalSteps={9}
      onNext={onNext}
      onPrev={onPrev}
      nextDisabled={!selected}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {styles.map((style, idx) => (
          <motion.div key={style.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }}>
            <Card
              className={`h-full border-2 cursor-pointer transition-all ${selected === style.id ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-200 dark:ring-blue-700 bg-blue-50 dark:bg-gray-800' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'}`}
              onClick={() => updateStyle(style.id)}
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{style.label}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{style.description}</p>
              {selected === style.id && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <span className="text-lg">✓</span>
                  <span className="text-sm font-semibold">Выбрано</span>
                </motion.div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </QuizStep>
  )
}
