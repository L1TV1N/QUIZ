import { motion } from 'framer-motion'
import { QuizStep, SelectCard } from '../QuizStep'
import useQuizStore from '../../store/quizStore'

const BUDGET_OPTIONS = [
  { id: 'low', label: '💰 До 500k', description: 'Экономный вариант' },
  { id: 'medium', label: '💰💰 500k-2M', description: 'Оптимальный баланс' },
  { id: 'high', label: '💰💰💰 2M+', description: 'Премиум качество' },
]

const TIMELINE_OPTIONS = [
  { id: 'week', label: '⚡ 1-2 недели', description: 'Срочно' },
  { id: 'month', label: '📅 1 месяц', description: 'В течение месяца' },
  { id: 'quarter', label: '📅📅 1-3 месяца', description: 'Спокойный темп' },
  { id: 'flexible', label: '🕐 Нет спешки', description: 'Когда получится' },
]

export const Step5Budget = ({ onNext, onPrev }) => {
  const quizState = useQuizStore((state) => state.quizState)
  const updateField = useQuizStore((state) => state.updateField)

  const isValid = quizState.budget && quizState.timeline

  return (
    <QuizStep
      title="Бюджет и сроки"
      subtitle="Помогите нам понять масштаб проекта"
      currentStep={4}
      totalSteps={6}
      onNext={onNext}
      onPrev={onPrev}
      nextDisabled={!isValid}
    >
      <div className="space-y-8">
        {/* Бюджет */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            Примерный бюджет (тыс. рублей)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {BUDGET_OPTIONS.map((option) => (
              <SelectCard
                key={option.id}
                selected={quizState.budget === option.id}
                onClick={() => updateField('budget', option.id)}
              >
                <p className="text-xl font-bold text-gray-900">{option.label}</p>
                <p className="text-sm text-gray-600 mt-2">{option.description}</p>
              </SelectCard>
            ))}
          </div>
        </motion.div>

        {/* Сроки */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            Когда нужен результат?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TIMELINE_OPTIONS.map((option) => (
              <SelectCard
                key={option.id}
                selected={quizState.timeline === option.id}
                onClick={() => updateField('timeline', option.id)}
              >
                <p className="font-bold text-gray-900">{option.label}</p>
                <p className="text-sm text-gray-600 mt-2">{option.description}</p>
              </SelectCard>
            ))}
          </div>
        </motion.div>
      </div>
    </QuizStep>
  )
}
