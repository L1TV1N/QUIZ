import { motion } from 'framer-motion'
import { QuizStep, SelectCard } from '../QuizStep'
import useQuizStore from '../../store/quizStore'

const STYLES = [
  { 
    id: 'minimalism', 
    label: '⚪ Минимализм', 
    description: 'Простота и функциональность',
    color: 'from-gray-50 to-blue-50'
  },
  { 
    id: 'modern', 
    label: '⚫ Современный', 
    description: 'Чистые линии и инновации',
    color: 'from-blue-50 to-indigo-50'
  },
  { 
    id: 'scandinavian', 
    label: '❄️ Скандинавский', 
    description: 'Уют и натуральные материалы',
    color: 'from-slate-50 to-blue-50'
  },
  { 
    id: 'industrial', 
    label: '🏭 Индустриальный', 
    description: 'Кирпич, металл, бетон',
    color: 'from-gray-100 to-gray-50'
  },
  { 
    id: 'luxury', 
    label: '👑 Люкс', 
    description: 'Элегантность и премиум',
    color: 'from-amber-50 to-orange-50'
  },
  { 
    id: 'eclectic', 
    label: '🎨 Эклектика', 
    description: 'Микс стилей и цветов',
    color: 'from-pink-50 to-purple-50'
  },
]

export const Step4Style = ({ onNext, onPrev }) => {
  const quizState = useQuizStore((state) => state.quizState)
  const updateStyle = useQuizStore((state) => state.updateStyle)

  const selectedStyles = quizState.style || []

  return (
    <QuizStep
      title="Какой стиль вам нравится?"
      subtitle="Выберите от 1 до 3 стилей, которые вас вдохновляют"
      currentStep={3}
      totalSteps={6}
      onNext={onNext}
      onPrev={onPrev}
      nextDisabled={selectedStyles.length === 0}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STYLES.map((style, idx) => (
          <motion.div
            key={style.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <SelectCard
              selected={selectedStyles.includes(style.id)}
              onClick={() => updateStyle(style.id)}
              className={`h-full bg-gradient-to-br ${style.color} border-2 ${
                selectedStyles.includes(style.id) 
                  ? 'border-blue-500 ring-2 ring-blue-200' 
                  : 'border-gray-200'
              }`}
            >
              <h3 className="text-lg font-bold text-gray-900">{style.label}</h3>
              <p className="text-sm text-gray-600 mt-2">{style.description}</p>
              
              {selectedStyles.includes(style.id) && (
                <div className="mt-4 flex items-center gap-2 text-blue-600">
                  <span className="text-lg">✓</span>
                  <span className="text-sm font-semibold">Выбрано</span>
                </div>
              )}
            </SelectCard>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
      >
        <p className="text-sm text-blue-900">
          💡 Вы выбрали: <span className="font-semibold">{selectedStyles.length}</span> {selectedStyles.length === 1 ? 'стиль' : 'стиля'}
        </p>
      </motion.div>
    </QuizStep>
  )
}
