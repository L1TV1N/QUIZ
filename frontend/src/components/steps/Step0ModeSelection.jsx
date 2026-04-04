import { motion } from 'framer-motion'
import { Button, Card } from '../ui/SharedUI'
import useQuizStore from '../../store/quizStore'
import { useSound } from '../../hooks/useSound'

const MODES = [
  {
    id: false,
    label: '🎯 Обычный режим',
    description: 'Простой и быстрый квиз',
    features: [
      'Быстрое заполнение',
      'Базовые параметры',
      'Стандартные вопросы'
    ],
    icon: '✓',
    variant: 'secondary'
  },
  {
    id: true,
    label: '🤖 AI-режим (Премиум)',
    description: 'Персональный подход с искусственным интеллектом',
    features: [
      'Адаптивные вопросы',
      'AI анализ предпочтений',
      'Детальные рекомендации'
    ],
    icon: '✨',
    variant: 'primary',
    recommended: true
  }
]

export const Step0ModeSelection = ({ onNext }) => {
  const quizState = useQuizStore((state) => state.quizState)
  const updateField = useQuizStore((state) => state.updateField)
  const { play } = useSound()

  const selected = quizState.aiMode

  const handleSelect = (modeId) => {
    play('select')
    updateField('aiMode', modeId)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center py-8 px-4 bg-white dark:bg-gray-900 transition-colors"
    >
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Выберите режим квиза
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Обычный режим — быстро и просто, или AI-режим для персонального подхода?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {MODES.map((mode, idx) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2 }}
              onClick={() => handleSelect(mode.id)}
              className={`cursor-pointer relative ${mode.recommended ? 'md:scale-105' : ''}`}
            >
              {mode.recommended && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                >
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                    Рекомендуем
                  </span>
                </motion.div>
              )}

              <Card className={`h-full border-2 transition-all ${
                selected === mode.id 
                  ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-gray-800' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}>
                  <div className="flex flex-col h-full">
                  <div className="text-5xl mb-4">{mode.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {mode.label}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                    {mode.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {mode.features.map((feature, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                      >
                        <span className="text-blue-500">✓</span>
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full py-3 rounded-lg font-semibold text-center transition-all ${
                      selected === mode.id
                        ? 'bg-blue-500 dark:bg-blue-600 text-white ring-2 ring-blue-300 dark:ring-blue-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {selected === mode.id ? '✓ Выбрано' : 'Выбрать'}
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4"
        >
          <Button
            onClick={() => {
              // Вернуться назад нельзя, но можно добавить логику
            }}
            variant="secondary"
            className="flex-1 opacity-0 pointer-events-none"
          >
            ← Назад
          </Button>

          <Button
            onClick={onNext}
            disabled={selected === undefined}
            variant="primary"
            className="flex-1"
            sound="next"
          >
            Продолжить →
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
