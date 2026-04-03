import { motion } from 'framer-motion'
import { QuizStep, Input, SelectCard } from '../QuizStep'
import useQuizStore from '../../store/quizStore'

const CONDITION_OPTIONS = [
  { id: 'pristine', label: '✨ Нулевой ремонт', description: 'Только отделка' },
  { id: 'cosmetic', label: '🎨 Косметический ремонт' },
  { id: 'major', label: '🔨 Капитальный ремонт' },
]

const ROOM_OPTIONS = [
  { id: '1', label: '1 комната' },
  { id: '2', label: '2 комнаты' },
  { id: '3', label: '3 комнаты' },
  { id: '4+', label: '4+ комнаты' },
]

export const Step3Params = ({ onNext, onPrev }) => {
  const quizState = useQuizStore((state) => state.quizState)
  const updateField = useQuizStore((state) => state.updateField)

  const isValid = quizState.area && quizState.rooms && quizState.condition

  return (
    <QuizStep
      title="Параметры помещения"
      subtitle={`Расскажите нам немного больше о вашем ${quizState.propertyType === 'apartment' ? 'жилье' : 'пространстве'}`}
      currentStep={2}
      totalSteps={6}
      onNext={onNext}
      onPrev={onPrev}
      nextDisabled={!isValid}
    >
      <div className="space-y-8">
        {/* Площадь */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-lg font-semibold text-gray-900 mb-3">
            Площадь (м²)
          </label>
          <Input
            type="number"
            placeholder="Например: 60"
            value={quizState.area}
            onChange={(e) => updateField('area', e.target.value)}
          />
        </motion.div>

        {/* Количество комнат */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-lg font-semibold text-gray-900 mb-3">
            Количество комнат
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ROOM_OPTIONS.map((room) => (
              <SelectCard
                key={room.id}
                selected={quizState.rooms === room.id}
                onClick={() => updateField('rooms', room.id)}
              >
                <p className="font-semibold text-center text-gray-900">{room.label}</p>
              </SelectCard>
            ))}
          </div>
        </motion.div>

        {/* Состояние помещения */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-lg font-semibold text-gray-900 mb-3">
            Состояние помещения
          </label>
          <div className="space-y-3">
            {CONDITION_OPTIONS.map((option) => (
              <SelectCard
                key={option.id}
                selected={quizState.condition === option.id}
                onClick={() => updateField('condition', option.id)}
              >
                <h3 className="font-semibold text-gray-900">{option.label}</h3>
                {option.description && (
                  <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                )}
              </SelectCard>
            ))}
          </div>
        </motion.div>
      </div>
    </QuizStep>
  )
}
