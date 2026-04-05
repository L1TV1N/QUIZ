import { useRef } from 'react'
import { motion } from 'framer-motion'
import { QuizStep } from '../QuizStep'
import { Card } from '../ui/SharedUI'
import { useSound } from '../../hooks/useSound'
import useQuizStore from '../../store/quizStore'

export const Step4Area = ({ onNext, onPrev }) => {
  const quizState = useQuizStore((state) => state.quizState)
  const updateField = useQuizStore((state) => state.updateField)

  const area = quizState.area || 60
  const maxArea = 300
  const minArea = 20
  const step = 5
  const { play } = useSound()
  const lastAreaRef = useRef(area)

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value)

    if (newValue > lastAreaRef.current) {
      play('scrollRight')
    } else if (newValue < lastAreaRef.current) {
      play('scrollLeft')
    }

    lastAreaRef.current = newValue
    updateField('area', newValue)
  }

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || minArea
    if (value >= minArea && value <= maxArea) {
      updateField('area', value)
    }
  }

  // Расчет процента для визуализации
  const percentage = ((area - minArea) / (maxArea - minArea)) * 100

  return (
    <QuizStep
      title="Укажите примерную площадь помещения"
      subtitle="Это поможет нам подобрать оптимальное решение"
      currentStep={3}
      totalSteps={9}
      onNext={onNext}
      onPrev={onPrev}
      nextDisabled={false}
    >
      <div className="space-y-8">
        {/* Визуализация */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 dark:from-gray-800 to-cyan-50 dark:to-gray-800 border-blue-200 dark:border-blue-800 text-center p-8">
            <div className="text-7xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {area} <span className="text-3xl text-gray-600 dark:text-gray-300">м²</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              {area < 40 && '🏠 Студия / маленькая квартира'}
              {area >= 40 && area < 80 && '🏘️ Средняя квартира'}
              {area >= 80 && area < 150 && '🏠 Большая квартира / малый дом'}
              {area >= 150 && 'Villa Просторный дом'}
            </p>
          </Card>
        </motion.div>

        {/* Ползунок */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-lg font-semibold text-gray-900 dark:text-white">
                Площадь (м²)
              </label>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {minArea} - {maxArea} м²
              </span>
            </div>

            {/* Slider */}
            <div className="relative">
              <input
                type="range"
                min={minArea}
                max={maxArea}
                step={step}
                value={area}
                onChange={handleSliderChange}
                className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`
                }}
              />
              
              {/* Track with grid */}
              <div className="absolute top-4 w-full h-8 pointer-events-none">
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{minArea}</span>
                  <span>{minArea + 70}</span>
                  <span>{minArea + 140}</span>
                  <span>{minArea + 210}</span>
                  <span>{maxArea}</span>
                </div>
              </div>
            </div>

            {/* Предустановленные значения */}
            <div className="grid grid-cols-4 gap-2 mt-8">
              {[30, 60, 100, 200].map((preset) => (
                <motion.button
                  key={preset}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => updateField('area', preset)}
                  className={`py-2 px-3 rounded-lg font-semibold transition-all text-sm ${
                    area === preset
                      ? 'bg-blue-500 dark:bg-blue-600 text-white ring-2 ring-blue-300 dark:ring-blue-700'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {preset}м²
                </motion.button>
              ))}
            </div>

            {/* Input для точного значения */}
            <div className="mt-6">
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">
                Или введите точное значение:
              </label>
              <input
                type="number"
                min={minArea}
                max={maxArea}
                value={area}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none text-center text-lg font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </motion.div>

        {/* Подсказка */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="p-4 bg-amber-50 dark:bg-amber-900 rounded-lg border border-amber-200 dark:border-amber-700"
        >
          <p className="text-sm text-amber-900 dark:text-amber-100">
            💡 Площадь определяет стоимость проекта и время на разработку. Укажите примерное значение.
          </p>
        </motion.div>
      </div>
    </QuizStep>
  )
}
