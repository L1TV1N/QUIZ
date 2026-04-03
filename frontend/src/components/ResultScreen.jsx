import { AnimatePresence, motion } from 'framer-motion'
import { Button, Card } from './ui/SharedUI'
import useQuizStore from '../store/quizStore'

export const ResultScreen = ({ onRestart }) => {
  const aiResult = useQuizStore((state) => state.aiResult)
  const quizState = useQuizStore((state) => state.quizState)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center py-8 px-4 bg-gradient-to-b from-blue-50 to-white"
    >
      <motion.div
        className="w-full max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Заголовок */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl mb-4"
          >
            ✨
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Ваш персональный дизайн-проект готов!
          </h1>
          <p className="text-gray-600 text-lg">
            Вот что мы создали специально для вас
          </p>
        </motion.div>

        {/* AI Результат */}
        <motion.div variants={itemVariants}>
          <Card className="mb-8 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {aiResult || 'Загрузка результата...'}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Краткие итоги */}
        <motion.div variants={itemVariants}>
          <Card className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Ваши ответы</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Тип помещения</p>
                <p className="text-lg font-semibold text-gray-900 capitalize">
                  {quizState.propertyType}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Площадь</p>
                <p className="text-lg font-semibold text-gray-900">
                  {quizState.area}м²
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Стиль интерьера</p>
                <p className="text-lg font-semibold text-gray-900">
                  {quizState.style?.join(', ') || 'Не выбран'}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Бюджет</p>
                <p className="text-lg font-semibold text-gray-900 capitalize">
                  {quizState.budget}
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-8 text-white text-center mb-8"
        >
          <h3 className="text-2xl font-bold mb-3">🎯 Что дальше?</h3>
          <p className="mb-6 text-lg">
            Наш менеджер свяжется с вами в ближайшие 24 часа, чтобы обсудить детали и начать работу!
          </p>
          <p className="text-sm opacity-90">
            Если вы не получите звонок — проверьте спам или напишите нам сами
          </p>
        </motion.div>

        {/* Кнопки */}
        <motion.div
          variants={itemVariants}
          className="flex gap-4 flex-col sm:flex-row"
        >
          <Button
            onClick={onRestart}
            variant="secondary"
            className="flex-1"
          >
            ← Создать новый проект
          </Button>
          
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => alert('Спасибо за заявку! Мы свяжемся с вами скоро 🎨')}
          >
            ✓ Заявка отправлена!
          </Button>
        </motion.div>

        {/* Благодарность */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <p className="text-gray-600">
            💌 Спасибо за доверие!
            <br />
            <span className="text-sm">© 2026 Smart Quiz Interior Design</span>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
