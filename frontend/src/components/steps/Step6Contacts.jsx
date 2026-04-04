import { motion } from 'framer-motion'
import { QuizStep } from '../QuizStep'
import { Card, Button } from '../ui/SharedUI'
import useQuizStore from '../../store/quizStore'
import { submitQuiz } from '../../services/api'
import { useSound } from '../../hooks/useSound'

export const Step6Contacts = ({ onNext, onPrev }) => {
  const quizState = useQuizStore((state) => state.quizState)
  const updateField = useQuizStore((state) => state.updateField)
  const setAiResult = useQuizStore((state) => state.setAiResult)
  const setAiQuestions = useQuizStore((state) => state.setAiQuestions)
  const setLoading = useQuizStore((state) => state.setLoading)
  const isLoading = useQuizStore((state) => state.isLoading)
  const { play } = useSound()

  // Валидация: имя, телефон и согласие обязательны
  const isValid = quizState.name && quizState.phone && quizState.agreeToTerms

  // Простая валидация телефона
  const isValidPhone = (phone) => {
    return phone.replace(/\D/g, '').length >= 10
  }

  const handleSubmit = async () => {
    if (!isValidPhone(quizState.phone)) {
      play('error')
      alert('Пожалуйста, укажите корректный номер телефона')
      return
    }

    if (!quizState.agreeToTerms) {
      play('error')
      alert('Пожалуйста, согласитесь с обработкой персональных данных')
      return
    }

    // Проигрываем звук отправки
    play('submit')

    // Сразу показываем анимацию загрузки
    setLoading(true)
    onNext()

    // Запрос на сервер выполняется в фоне
    try {
      const result = await submitQuiz(quizState)
      
      // Если это AI-режим и сервер вернул вопросы, показываем их
      if (quizState.aiMode && result.ai_questions) {
        setAiQuestions(result.ai_questions)
      } else {
        // Иначе показываем финальный результат
        setAiResult(result.ai_result)
      }
      // setLoading будет выключен через handleAlmostReadyComplete когда aiResult установится
    } catch (error) {
      console.error('Submit error:', error)
      play('error')
      alert('Ошибка при отправке заявки. Попробуйте ещё раз.')
      setLoading(false)
    }
  }

  return (
    <QuizStep
      title="Оставьте контакты"
      subtitle="Мы свяжемся с вами по вашему проекту"
      currentStep={6}
      totalSteps={9}
      onPrev={onPrev}
      hideNextButton={true}
      nextDisabled={false}
    >
      <div className="space-y-5">
        {/* Имя */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Ваше имя <span className="text-red-500">*</span>
          </label>
          <input
            placeholder="Введите имя"
            value={quizState.name}
            onChange={(e) => updateField('name', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </motion.div>

        {/* Телефон */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Телефон <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            placeholder="Например: +7(999)123-45-67"
            value={quizState.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Мы используем этот номер для связи</p>
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Email <span className="text-gray-500 dark:text-gray-400">(опционально)</span>
          </label>
          <input
            type="email"
            placeholder="example@mail.ru"
            value={quizState.email}
            onChange={(e) => updateField('email', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </motion.div>

        {/* Комментарий */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Комментарий <span className="text-gray-500 dark:text-gray-400">(опционально)</span>
          </label>
          <textarea
            placeholder="Расскажите о ваших пожеланиях и идеях для проекта..."
            value={quizState.comment}
            onChange={(e) => updateField('comment', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </motion.div>

        {/* Чекбокс согласия */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <input
            type="checkbox"
            id="agree"
            checked={quizState.agreeToTerms}
            onChange={(e) => updateField('agreeToTerms', e.target.checked)}
            className="w-5 h-5 mt-1 cursor-pointer accent-blue-500 dark:accent-blue-400"
          />
          <label htmlFor="agree" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer flex-1">
            Я соглашаюсь на обработку персональных данных и получение информации о новых проектах <span className="text-red-500 dark:text-red-400">*</span>
          </label>
        </motion.div>

        {/* Информация о конфиденциальности */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-800"
        >
          <p className="text-xs text-blue-900 dark:text-blue-100">
            ✅ <span className="font-semibold">Ваша заявка будет обработана в ближайшие 24 часа</span>
            <br/>
            🔒 Мы не передаём данные третьим лицам
          </p>
        </motion.div>

        {/* Кнопки */}
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          <Button
            onClick={onPrev}
            variant="secondary"
            className="flex-1"
            disabled={isLoading}
            sound="prev"
          >
            ← Назад
          </Button>

          <Button
            onClick={handleSubmit}
            variant="primary"
            className="flex-1"
            disabled={!isValid || isLoading}
            sound={isValid && !isLoading ? 'submit' : null}
          >
            {isLoading ? '⏳ Отправляем...' : '✓ Получить консультацию'}
          </Button>
        </motion.div>
      </div>
    </QuizStep>
  )
}
