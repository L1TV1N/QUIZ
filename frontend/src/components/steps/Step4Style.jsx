import { motion } from 'framer-motion'
import { QuizStep } from '../QuizStep'
import { Card } from '../ui/SharedUI'
import useQuizStore from '../../store/quizStore'

const STYLES = [
  { 
    id: 'modern', 
    label: '⚫ Современный', 
    description: 'Чистые линии и инновации',
    color: 'from-blue-50 dark:from-gray-800 to-indigo-50 dark:to-gray-800'
  },
  { 
    id: 'minimalism', 
    label: '⚪ Минимализм', 
    description: 'Простота и функциональность',
    color: 'from-gray-50 dark:from-gray-800 to-blue-50 dark:to-gray-800'
  },
  { 
    id: 'scandinavian', 
    label: '❄️ Скандинавский', 
    description: 'Уют и натуральные материалы',
    color: 'from-slate-50 dark:from-gray-800 to-blue-50 dark:to-gray-800'
  },
  { 
    id: 'loft', 
    label: '🏭 Лофт', 
    description: 'Кирпич, металл, бетон',
    color: 'from-gray-100 dark:from-gray-800 to-gray-50 dark:to-gray-800'
  },
  { 
    id: 'neoclassic', 
    label: '🎭 Неоклассика', 
    description: 'Элегантные формы и материалы',
    color: 'from-amber-50 dark:from-gray-800 to-orange-50 dark:to-gray-800'
  },
  { 
    id: 'classic', 
    label: '👑 Классика', 
    description: 'Традиционный роскошный стиль',
    color: 'from-amber-100 dark:from-gray-800 to-yellow-50 dark:to-gray-800'
  },
  { 
    id: 'countryside', 
    label: '🌄 Деревенский', 
    description: 'Природные материалы и уют',
    color: 'from-green-50 dark:from-gray-800 to-yellow-50 dark:to-gray-800'
  },
  { 
    id: 'undecided', 
    label: '❔ Пока не определился', 
    description: 'Помогите мне выбрать',
    color: 'from-purple-50 dark:from-gray-800 to-pink-50 dark:to-gray-800'
  },
]

export const Step4Style = ({ onNext, onPrev }) => {
  const quizState = useQuizStore((state) => state.quizState)
  const updateStyle = useQuizStore((state) => state.updateStyle)

  const selected = quizState.style

  return (
    <QuizStep
      title="Какой стиль интерьера вам ближе?"
      subtitle="Выберите один стиль, который вдохновляет вас больше всего"
      currentStep={4}
      totalSteps={9}
      onNext={onNext}
      onPrev={onPrev}
      nextDisabled={!selected}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STYLES.map((style, idx) => (
          <motion.div
            key={style.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card
              className={`
                h-full bg-gradient-to-br ${style.color} border-2 cursor-pointer transition-all
                ${selected === style.id 
                  ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-200 dark:ring-blue-700' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
              onClick={() => updateStyle(style.id)}
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{style.label}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{style.description}</p>
              
              {selected === style.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400"
                >
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
