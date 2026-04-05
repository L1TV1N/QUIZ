import { motion } from 'framer-motion'
import { QuizStep } from '../QuizStep'
import { Card } from '../ui/SharedUI'
import useQuizStore from '../../store/quizStore'
import { getZonesByPropertyFromConfig, getZoneTextByPropertyFromConfig } from '../../config/quizConfigHelpers'

export const Step3Zones = ({ onNext, onPrev }) => {
  const quizState = useQuizStore((state) => state.quizState)
  const quizConfig = useQuizStore((state) => state.quizConfig)
  const setQuizState = useQuizStore((state) => state.setQuizState)

  const selectedZones = quizState.zones || []
  const propertyType = quizState.propertyType
  const availableZones = getZonesByPropertyFromConfig(quizConfig, propertyType)
  const zoneText = getZoneTextByPropertyFromConfig(quizConfig, propertyType)

  const handleZoneToggle = (zoneId) => {
    let newZones = [...selectedZones]
    if (newZones.includes(zoneId)) {
      newZones = newZones.filter((z) => z !== zoneId)
    } else {
      newZones.push(zoneId)
    }
    setQuizState({ zones: newZones })
  }

  const isValid = selectedZones.length > 0

  return (
    <QuizStep
      title={zoneText?.title || 'Какие зоны входят в проект?'}
      subtitle={zoneText?.subtitle || 'Выберите нужные зоны'}
      currentStep={2}
      totalSteps={9}
      onNext={onNext}
      onPrev={onPrev}
      nextDisabled={!isValid}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableZones.map((zone, idx) => {
          const isSelected = selectedZones.includes(zone.id)
          return (
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card
                className={`
                  p-4 cursor-pointer border-2 transition-all
                  ${isSelected 
                    ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-gray-700' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                  }
                `}
                onClick={() => handleZoneToggle(zone.id)}
              >
                <div className="text-2xl mb-2">{(zone.label || '').split(' ')[0]}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{zone.label}</h3>
                {isSelected && (
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
      
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border-l-4 border-blue-500 dark:border-blue-400">
        <p className="text-sm text-gray-700 dark:text-gray-200">
          <span className="font-semibold">{quizConfig?.steps?.zones?.hint || '💡 Совет: Выбранные зоны влияют на состав проекта и точность расчёта.'}</span>
        </p>
      </div>
    </QuizStep>
  )
}
