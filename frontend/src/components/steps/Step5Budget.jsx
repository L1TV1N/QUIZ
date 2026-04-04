import { motion } from 'framer-motion'
import { QuizStep } from '../QuizStep'
import { Card } from '../ui/SharedUI'
import useQuizStore from '../../store/quizStore'
import { BUDGET_TIERS } from '../../config/adaptiveContent'

export const Step5Budget = ({ onNext, onPrev }) => {
  const quizState = useQuizStore((state) => state.quizState)
  const updateField = useQuizStore((state) => state.updateField)

  const selected = quizState.budget

  return (
    <QuizStep
      title="Какой бюджет на реализацию интерьера вы рассматриваете?"
      subtitle="Это поможет определить масштаб и качество решений"
      currentStep={5}
      totalSteps={9}
      onNext={onNext}
      onPrev={onPrev}
      nextDisabled={!selected}
    >
      <div className="space-y-3">
        {BUDGET_TIERS.map((option, idx) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08 }}
          >
            <Card
              className={`
                p-4 cursor-pointer border-2 transition-all
                ${selected === option.id 
                  ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-gray-700' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                }
              `}
              onClick={() => updateField('budget', option.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{option.label}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{option.description}</p>
                </div>
                {selected === option.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-blue-500 dark:text-blue-400 text-2xl font-bold"
                  >
                    ✓
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700"
      >
        <p className="text-sm text-blue-900 dark:text-blue-100">
          💡 Бюджет определяет качество материалов и сложность решений.
        </p>
      </motion.div>
    </QuizStep>
  )
}
