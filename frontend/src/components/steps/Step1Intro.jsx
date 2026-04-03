import { motion } from 'framer-motion'
import { Button, Card } from '../ui/SharedUI'
import useQuizStore from '../../store/quizStore'

export const Step1Intro = ({ onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center py-8 px-4"
    >
      <div className="w-full max-w-2xl text-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            ✨ Ваш персональный дизайн ждёт
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            За 5 минут мы поймём ваш стиль и создадим идеальный дизайн-проект для вашего помещения.
            
            <br/><br/>
            <span className="text-base text-gray-500">
              Просто ответьте на несколько вопросов, и мы сделаем всё остальное 🎨
            </span>
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 mb-8">
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🏠</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Адаптирующиеся вопросы</h3>
                  <p className="text-sm text-gray-600">Квиз подстраивается под ваши ответы</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <h3 className="font-semibold text-gray-900">AI анализ</h3>
                  <p className="text-sm text-gray-600">Получите персональные рекомендации</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">💼</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Быстрый контакт</h3>
                  <p className="text-sm text-gray-600">Менеджер свяжется с вами сразу же</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onNext}
            variant="primary"
            className="px-12 py-4 text-lg w-full sm:w-auto"
          >
            Начать квиз →
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
