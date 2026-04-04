import { motion } from 'framer-motion'
import { QuizStep } from '../QuizStep'
import { Card } from '../ui/SharedUI'
import useQuizStore from '../../store/quizStore'
import { getZonesByProperty } from '../../config/adaptiveContent'

export const Step3Zones = ({ onNext, onPrev }) => {
  const quizState = useQuizStore((state) => state.quizState)
  const setQuizState = useQuizStore((state) => state.setQuizState)

  const selectedZones = quizState.zones || []
  const propertyType = quizState.propertyType
  
  // Получаем адаптивные зоны на основе типа помещения
  const availableZones = getZonesByProperty(propertyType)

  // Логика переключения зон
  const handleZoneToggle = (zoneId) => {
    let newZones = [...selectedZones]
    
    if (newZones.includes(zoneId)) {
      newZones = newZones.filter(z => z !== zoneId)
    } else {
      newZones.push(zoneId)
    }
    
    setQuizState({ zones: newZones })
  }

  const isValid = selectedZones.length > 0

  // Адаптивный заголовок в зависимости от типа помещения
  const getTitleForProperty = (type) => {
    const titles = {
      apartment: 'Какие комнаты входят в проект?',
      house: 'Какие помещения входят в проект?',
      office: 'Какие зоны офиса требуют дизайна?',
      commercial: 'Какие зоны входят в проект?',
      studio: 'Как разделить студию на зоны?',
      other: 'Какие зоны входят в проект?',
    }
    return titles[type] || titles.other
  }

  const getSubtitleForProperty = (type) => {
    const subtitles = {
      apartment: 'Выберите комнаты для дизайна-проекта',
      house: 'Дом требует целостного подхода - выберите все помещения',
      office: 'Разные зоны требуют разного подхода',
      commercial: 'От витрины до склада - каждая зона важна',
      studio: 'Оптимизируем пространство для вашего образа жизни',
      other: 'Определите пространства для проектирования',
    }
    return subtitles[type] || subtitles.other
  }

  return (
    <QuizStep
      title={getTitleForProperty(propertyType)}
      subtitle={getSubtitleForProperty(propertyType)}
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
                <div className="text-2xl mb-2">{zone.label.split(' ')[0]}</div>
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
          <span className="font-semibold">💡 Совет:</span> Выбранные зоны будут спроектированы с учётом единого стилевого подхода.
        </p>
      </div>
    </QuizStep>
  )
}
