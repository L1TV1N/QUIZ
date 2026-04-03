import { motion } from 'framer-motion'
import { QuizStep, SelectCard } from '../QuizStep'
import useQuizStore from '../../store/quizStore'

const PROPERTY_TYPES = [
  { id: 'apartment', label: '🏢 Квартира', description: 'Жилая квартира' },
  { id: 'house', label: '🏠 Дом', description: 'Частный дом' },
  { id: 'office', label: '🏢 Офис', description: 'Офисное пространство' },
  { id: 'studio', label: '🎨 Студия', description: 'Творческое пространство' },
  { id: 'retail', label: '🛍️ Магазин', description: 'Розничное помещение' },
]

export const Step2Property = ({ onNext, onPrev }) => {
  const quizState = useQuizStore((state) => state.quizState)
  const updateField = useQuizStore((state) => state.updateField)

  const selected = quizState.propertyType

  return (
    <QuizStep
      title="Какое помещение вы хотите спроектировать?"
      subtitle="Выбранный тип поможет нам подобрать оптимальное решение"
      currentStep={1}
      totalSteps={6}
      onNext={onNext}
      onPrev={onPrev}
      nextDisabled={!selected}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PROPERTY_TYPES.map((type, idx) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <SelectCard
              selected={selected === type.id}
              onClick={() => updateField('propertyType', type.id)}
              className="h-full"
            >
              <div className="text-2xl mb-2">{type.label.split(' ')[0]}</div>
              <h3 className="font-semibold text-gray-900">{type.label}</h3>
              <p className="text-sm text-gray-600 mt-1">{type.description}</p>
            </SelectCard>
          </motion.div>
        ))}
      </div>
    </QuizStep>
  )
}
