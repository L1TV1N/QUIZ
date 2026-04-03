import { motion } from 'framer-motion'
import { QuizStep, Input, Button } from '../QuizStep'
import useQuizStore from '../../store/quizStore'
import { submitQuiz } from '../../services/api'

export const Step6Contacts = ({ onNext, onPrev }) => {
  const quizState = useQuizStore((state) => state.quizState)
  const updateField = useQuizStore((state) => state.updateField)
  const setAiResult = useQuizStore((state) => state.setAiResult)
  const setLoading = useQuizStore((state) => state.setLoading)
  const isLoading = useQuizStore((state) => state.isLoading)

  const isValid = quizState.name && quizState.contact

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const result = await submitQuiz(quizState)
      setAiResult(result.ai_result)
      onNext()
    } catch (error) {
      console.error('Submit error:', error)
      alert('Ошибка при отправке заявки. Попробуйте ещё раз.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <QuizStep
      title="Последний шаг!"
      subtitle="Оставьте свои контакты, и мы свяжемся с вами"
      currentStep={5}
      totalSteps={6}
      onNext={handleSubmit}
      onPrev={onPrev}
      nextDisabled={!isValid || isLoading}
      hideNextButton={true}
    >
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-lg font-semibold text-gray-900 mb-3">
            Ваше имя
          </label>
          <Input
            placeholder="Введите имя"
            value={quizState.name}
            onChange={(e) => updateField('name', e.target.value)}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-lg font-semibold text-gray-900 mb-3">
            Контакт (телефон или email)
          </label>
          <Input
            placeholder="Например: +7(999)123-45-67 или email@example.com"
            value={quizState.contact}
            onChange={(e) => updateField('contact', e.target.value)}
          />
        </motion.div>

        {/* Информация */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-4 bg-blue-50 rounded-lg border border-blue-200"
        >
          <p className="text-sm text-blue-900">
            ✅ Ваша заявка будет обработана в ближайшие 24 часа
          </p>
          <p className="text-sm text-blue-900 mt-2">
            🔒 Мы не передаём данные третьим лицам
          </p>
        </motion.div>

        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button
            onClick={onPrev}
            variant="secondary"
            className="flex-1"
            disabled={isLoading}
          >
            ← Назад
          </Button>

          <Button
            onClick={handleSubmit}
            variant="primary"
            className="flex-1"
            disabled={!isValid || isLoading}
          >
            {isLoading ? '⏳ Отправляем...' : '✓ Получить результат'}
          </Button>
        </motion.div>
      </div>
    </QuizStep>
  )
}
