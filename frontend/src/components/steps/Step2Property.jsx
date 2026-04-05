import { motion } from 'framer-motion'
import { QuizStep } from '../QuizStep'
import { Card } from '../ui/SharedUI'
import useQuizStore from '../../store/quizStore'
import { useSound } from '../../hooks/useSound'

export const Step2Property = ({ onNext, onPrev }) => {
  const quizState = useQuizStore((state) => state.quizState)
  const quizConfig = useQuizStore((state) => state.quizConfig)
  const updateField = useQuizStore((state) => state.updateField)
  const { play } = useSound()

  const selected = quizState.propertyType
  const propertyStep = quizConfig?.steps?.property
  const propertyOptions = propertyStep?.options || []

  const handleSelect = (typeId) => {
    play('select')
    updateField('propertyType', typeId)
  }

  return (
    <QuizStep
      title={propertyStep?.title || 'Какое помещение вы планируете оформить?'}
      subtitle={propertyStep?.subtitle || 'Выбранный тип поможет нам подобрать оптимальное решение'}
      currentStep={1}
      totalSteps={9}
      onNext={onNext}
      onPrev={onPrev}
      nextDisabled={!selected}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {propertyOptions.map((type, idx) => {
          const icon = (type.label || '').split(' ')[0]
          return (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <Card
                className={`
                  p-4 cursor-pointer border-2 transition-all
                  ${selected === type.id 
                    ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-gray-700' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                  }
                `}
                onClick={() => handleSelect(type.id)}
              >
                <div className="text-3xl mb-2">{icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{type.label}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{type.description}</p>
                
                {selected === type.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mt-3 text-blue-500 dark:text-blue-400 text-lg font-bold"
                  >
                    ✓ Выбрано
                  </motion.div>
                )}
              </Card>
            </motion.div>
          )
        })}
      </div>
    </QuizStep>
  )
}
