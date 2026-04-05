import { motion } from 'framer-motion'
import { QuizStep } from '../QuizStep'
import { Button } from '../ui/SharedUI'
import useQuizStore from '../../store/quizStore'
import { submitQuiz } from '../../services/api'

export const Step6Contacts = ({ onNext, onPrev }) => {
  const quizState = useQuizStore((state) => state.quizState)
  const quizConfig = useQuizStore((state) => state.quizConfig)
  const updateField = useQuizStore((state) => state.updateField)
  const setLoading = useQuizStore((state) => state.setLoading)
  const setAiResult = useQuizStore((state) => state.setAiResult)
  const isLoading = useQuizStore((state) => state.isLoading)

  const c = quizConfig?.steps?.contacts || {}
  const isValid = quizState.name.trim() && quizState.phone.trim() && quizState.agreeToTerms

  const handleSubmit = async () => {
    if (!isValid || isLoading) return
    try {
      setLoading(true)
      const result = await submitQuiz(quizState)
      if (result?.ai_result) setAiResult(result.ai_result)
      onNext()
    } catch (error) {
      console.error(error)
      alert('Не удалось отправить заявку')
    } finally {
      setLoading(false)
    }
  }

  return (
    <QuizStep
      title={c.title || 'Оставьте контакты для связи'}
      subtitle={c.subtitle || 'Мы подготовим предложение и свяжемся с вами'}
      currentStep={6}
      totalSteps={9}
      onNext={handleSubmit}
      onPrev={onPrev}
      nextDisabled={!isValid || isLoading}
      hideNextButton
    >
      <div className="space-y-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">{c.nameLabel || 'Ваше имя'} <span className="text-red-500">*</span></label>
          <input placeholder={c.namePlaceholder || 'Введите имя'} value={quizState.name} onChange={(e) => updateField('name', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">{c.phoneLabel || 'Телефон'} <span className="text-red-500">*</span></label>
          <input type="tel" placeholder={c.phonePlaceholder || 'Например: +7(999)123-45-67'} value={quizState.phone} onChange={(e) => updateField('phone', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{c.phoneHint || 'Мы используем этот номер для связи'}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">{c.emailLabel || 'Email'} <span className="text-gray-500 dark:text-gray-400">({c.emailOptional || 'опционально'})</span></label>
          <input type="email" placeholder={c.emailPlaceholder || 'example@mail.ru'} value={quizState.email} onChange={(e) => updateField('email', e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">{c.commentLabel || 'Комментарий'} <span className="text-gray-500 dark:text-gray-400">({c.emailOptional || 'опционально'})</span></label>
          <textarea placeholder={c.commentPlaceholder || 'Расскажите о ваших пожеланиях и идеях для проекта...'} value={quizState.comment} onChange={(e) => updateField('comment', e.target.value)} rows={4} className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <input type="checkbox" id="agree" checked={quizState.agreeToTerms} onChange={(e) => updateField('agreeToTerms', e.target.checked)} className="w-5 h-5 mt-1 cursor-pointer accent-blue-500 dark:accent-blue-400" />
          <label htmlFor="agree" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer flex-1">{c.agreeText || 'Я соглашаюсь на обработку персональных данных и получение информации о новых проектах'} <span className="text-red-500 dark:text-red-400">*</span></label>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-800">
          {(c.privacyHint || '').split('\n').map((line, idx) => <p key={idx} className="text-xs text-blue-900 dark:text-blue-100">{line}</p>)}
        </motion.div>
        <motion.div className="flex gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
          <Button onClick={onPrev} variant="secondary" className="flex-1" disabled={isLoading} sound="prev">← Назад</Button>
          <Button onClick={handleSubmit} variant="primary" className="flex-1" disabled={!isValid || isLoading} sound={isValid && !isLoading ? 'submit' : null}>{isLoading ? '⏳ Отправляем...' : (c.submitText || '✓ Получить консультацию')}</Button>
        </motion.div>
      </div>
    </QuizStep>
  )
}
