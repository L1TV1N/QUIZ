import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Button, Card } from './ui/SharedUI'
import useQuizStore from '../store/quizStore'
import { 
  generateAIRecommendations, 
  generateAILetter,
  generateColorPalettes,
  generateMaterials,
  generateEstimate,
  generateStartSteps,
  generateWarnings,
  getSuggestionsBasedOnLogic,
  enrichRecommendations,
  calculateLeadScore,
} from '../config/adaptiveContent'
import { streamingItemVariants } from '../config/animations'

export const ResultScreen = ({ onRestart }) => {
  const quizState = useQuizStore((state) => state.quizState)
  
  // States для стриминга
  const [visibleSections, setVisibleSections] = useState({
    letter: false,
    recommendations: false,
    palettes: false,
    materials: false,
    estimate: false,
    warnings: false,
    suggestions: false,
    startSteps: false,
    score: false,
  })

  // Получаем все данные
  const aiRecommendations = quizState.aiMode ? enrichRecommendations(
    generateAIRecommendations(quizState),
    quizState.zones,
    quizState.area,
    quizState.style
  ) : null
  const aiLetter = quizState.aiMode ? generateAILetter(quizState) : null
  const colorPalettes = quizState.aiMode ? generateColorPalettes(quizState.style, quizState.aiAnswers) : null
  const materials = quizState.aiMode ? generateMaterials(quizState.style, quizState.budget, quizState.propertyType) : null
  const estimate = quizState.aiMode ? generateEstimate(quizState) : null
  const startSteps = quizState.aiMode ? generateStartSteps(quizState) : null
  const warnings = quizState.aiMode ? generateWarnings(quizState) : null
  const suggestions = quizState.aiMode ? getSuggestionsBasedOnLogic(quizState) : null
  const leadScore = quizState.aiMode ? calculateLeadScore(quizState) : null

  // Стриминг показа элементов
  useEffect(() => {
    if (!quizState.aiMode) return

    const timings = {
      letter: 300,
      recommendations: 1000,
      palettes: 1800,
      materials: 2600,
      estimate: 3400,
      warnings: 4000,
      suggestions: 4600,
      startSteps: 5200,
      score: 5800,
    }

    Object.entries(timings).forEach(([section, delay]) => {
      if (quizState.aiMode) {
        setTimeout(() => {
          setVisibleSections((prev) => ({ ...prev, [section]: true }))
        }, delay)
      }
    })
  }, [quizState.aiMode])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  // Labels
  const zoneLabels = {
    'kitchen': '🍳 Кухня', 'living_room': '🛋️ Гостиная', 'bedroom': '🛏️ Спальня',
    'nursery': '👶 Детская', 'bathroom': '🚿 Санузел', 'hallway': '🚪 Прихожая',
    'office': '💼 Кабинет', 'wardrobe': '👗 Гардеробная', 'balcony': '🌿 Балкон/лоджия',
    'workspace': '💻 Рабочая зона', 'conference': '🤝 Переговорная', 'storefront': '🪟 Витрина',
    'checkout': '🛒 Кассовая зона', 'storage': '📦 Склад', 'admin': '📋 Админ',
    'main_room': '🎨 Основная комната', 'main_zone': '📍 Основная зона',
    'secondary_zone': '📍 Дополнительная зона', 'service_zone': '📍 Служебная зона',
  }

  const budgetLabels = {
    'up-to-500k': '💰 До 500 000 ₽', '500k-1m': '💰 500 000 – 1 000 000 ₽',
    '1m-2m': '💰 1 000 000 – 2 000 000 ₽', '2m+': '💎 От 2 000 000 ₽', 'undecided': '❔ Пока не знаю'
  }

  const styleLabels = {
    'modern': '⚫ Современный', 'minimalism': '⚪ Минимализм', 'scandinavian': '❄️ Скандинавский',
    'loft': '🏭 Лофт', 'neoclassic': '🎭 Неоклассика', 'classic': '👑 Классика',
    'countryside': '🌄 Деревенский', 'undecided': '❔ Пока не определился'
  }

  const propertyLabels = {
    'apartment': '🏢 Квартира', 'house': '🏠 Частный дом', 'office': '💼 Офис',
    'commercial': '🛍️ Коммерческое помещение', 'studio': '🎨 Студия / апартаменты', 'other': '❓ Другое'
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen py-12 px-4 ${
        quizState.aiMode 
          ? 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900'
          : 'bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-900'
      }`}
    >
      <motion.div
        className="w-full max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* === ЗАГОЛОВОК === */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl md:text-7xl mb-4"
          >
            {quizState.aiMode ? '✨' : '🎨'}
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
            {quizState.aiMode ? 'Ваш персональный дизайн-проект готов!' : 'Спасибо за вашу заявку!'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {quizState.aiMode ? 'Вот что мы создали специально для вас' : 'Наш менеджер свяжется с вами в ближайшие 24 часа'}
          </p>
        </motion.div>

        {/* === LETTER === */}
        {aiLetter && quizState.aiMode && visibleSections.letter && (
          <motion.div variables={itemVariants} initial="hidden" animate="visible" className="mb-10">
            <Card className="border-l-4 border-purple-500 bg-gradient-to-r from-purple-50 via-pink-50 to-transparent dark:from-gray-800 dark:via-gray-800 dark:to-gray-900">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-3xl">💌</span>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Персональное письмо от AI</h2>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm md:text-base">{aiLetter}</p>
            </Card>
          </motion.div>
        )}

        {/* === РЕКОМЕНДАЦИИ === */}
        {aiRecommendations && quizState.aiMode && visibleSections.recommendations && (
          <motion.div variants={itemVariants} className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">🤖 Основные рекомендации</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiRecommendations.map((rec, idx) => (
                <motion.div key={idx} custom={idx} variants={streamingItemVariants} initial="hidden" animate="visible">
                  <Card className="border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-transparent dark:from-gray-800 dark:to-gray-900 h-full">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {rec.type === 'concept' && '💡'}
                      {rec.type === 'zones' && '📐'}
                      {rec.type === 'style' && '🎨'}
                      {rec.type === 'budget' && '💰'}
                      {rec.type === 'ai' && '🤖'}
                      {' '}{rec.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{rec.text}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* === ЦВЕТОВЫЕ ПАЛИТРЫ === */}
        {colorPalettes && quizState.aiMode && visibleSections.palettes && (
          <motion.div variables={itemVariants} initial="hidden" animate="visible" className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">🎨 Цветовые палитры</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {colorPalettes.map((palette, idx) => (
                <motion.div key={idx} custom={idx} variants={streamingItemVariants} initial="hidden" animate="visible">
                  <Card className="overflow-hidden h-full hover:shadow-xl transition-shadow dark:bg-gray-800">
                    <div className="flex gap-2 mb-4">
                      {palette.hex.map((color, cIdx) => (
                        <motion.div
                          key={cIdx}
                          className="flex-1 h-16 rounded-lg border-2 border-gray-200 dark:border-gray-600"
                          style={{ backgroundColor: color }}
                          whileHover={{ scale: 1.1 }}
                          title={color}
                        />
                      ))}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{palette.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{palette.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* === МАТЕРИАЛЫ === */}
        {materials && quizState.aiMode && visibleSections.materials && (
          <motion.div variables={itemVariants} initial="hidden" animate="visible" className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">🛋️ Подобранные материалы</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(materials).map(([category, items], idx) => (
                <motion.div key={idx} custom={idx} variants={streamingItemVariants} initial="hidden" animate="visible">
                  <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{category}</h3>
                    <ul className="space-y-2">
                      {items.map((item, iIdx) => (
                        <motion.li
                          key={iIdx}
                          className="text-gray-700 dark:text-gray-300 pl-4 border-l-2 border-blue-300 dark:border-blue-500"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: iIdx * 0.1 }}
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* === СМЕТА === */}
        {estimate && quizState.aiMode && visibleSections.estimate && (
          <motion.div variables={itemVariants} initial="hidden" animate="visible" className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">💰 Примерная смета</h2>
            <motion.div custom={0} variants={streamingItemVariants} initial="hidden" animate="visible">
              <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-800 border-l-4 border-yellow-400">
                <div className="mb-6">
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">
                    {estimate.total.toLocaleString('ru-RU')} ₽
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    ~{estimate.perSqMeter.toLocaleString('ru-RU')}₽/м² на {estimate.zoneCount} {estimate.zoneCount === 1 ? 'зону' : 'зон'}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Примерный срок: {estimate.estimatedDays} дней
                  </div>
                </div>

                {/* Диаграмма breakdown */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Распределение бюджета</h4>
                  <div className="space-y-2">
                    {Object.entries(estimate.breakdownPercent).map(([key, percent], idx) => (
                      <motion.div key={key} custom={idx} variants={streamingItemVariants} initial="hidden" animate="visible">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                            {key === 'furniture' && 'Мебель'}
                            {key === 'materials' && 'Материалы'}
                            {key === 'work' && 'Работы'}
                            {key === 'miscellaneous' && 'Прочее'}
                            {key === 'markup' && 'Наши услуги'}
                          </span>
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">{percent}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${percent}%` }}
                            transition={{ delay: idx * 0.15, duration: 0.8 }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Детальный breakdown */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  {Object.entries(estimate.breakdown).map(([key, value]) => (
                    <motion.div key={key} className="text-center p-2 bg-white dark:bg-gray-700 rounded-lg" custom={key} initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.5}}>
                      <div className="text-xs text-gray-600 dark:text-gray-300 capitalize mb-1">
                        {key === 'furniture' && 'Мебель'}
                        {key === 'materials' && 'Материалы'}
                        {key === 'work' && 'Работы'}
                        {key === 'miscellaneous' && 'Прочее'}
                        {key === 'markup' && 'Наши услуги'}
                      </div>
                      <div className="font-bold text-gray-900 dark:text-white text-sm">{value.toLocaleString('ru-RU')}</div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* === ПРЕДУПРЕЖДЕНИЯ === */}
        {warnings && warnings.length > 0 && quizState.aiMode && visibleSections.warnings && (
          <motion.div variables={itemVariants} initial="hidden" animate="visible" className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">⚠️  Важные замечания</h2>
            <div className="space-y-3">
              {warnings.map((warning, idx) => (
                <motion.div key={idx} custom={idx} variants={streamingItemVariants} initial="hidden" animate="visible">
                  <Card className={`border-l-4 ${
                    warning.type === 'warning' ? 'border-yellow-400 bg-yellow-50 dark:bg-gray-800' :
                    'border-blue-400 bg-blue-50 dark:bg-gray-800'
                  }`}>
                    <div className="flex gap-3">
                      <span className="text-2xl flex-shrink-0">{warning.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{warning.text}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">💡 {warning.suggestion}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* === ПРЕДЛОЖЕНИЯ === */}
        {suggestions && suggestions.length > 0 && quizState.aiMode && visibleSections.suggestions && (
          <motion.div variables={itemVariants} initial="hidden" animate="visible" className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">✨ Специальные предложения</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suggestions.map((sug, idx) => (
                <motion.div key={idx} custom={idx} variants={streamingItemVariants} initial="hidden" animate="visible">
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 border border-green-200 dark:border-green-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{sug.icon} {sug.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{sug.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* === ШАГИ РЕМОНТА === */}
        {startSteps && quizState.aiMode && visibleSections.startSteps && (
          <motion.div variables={itemVariants} initial="hidden" animate="visible" className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">🚀 С чего начать ремонт</h2>
            <div className="space-y-4">
              {startSteps.map((step, idx) => (
                <motion.div key={idx} custom={idx} variants={streamingItemVariants} initial="hidden" animate="visible">
                  <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 border-l-4 border-indigo-400">
                    <div className="flex gap-4">
                      <div className="text-4xl flex-shrink-0">{step.emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                            Этап {step.step}: {step.title}
                          </h3>
                          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{step.duration}</span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm">{step.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* === LEAD SCORE === */}
        {leadScore && quizState.aiMode && visibleSections.score && (
          <motion.div variables={itemVariants} initial="hidden" animate="visible" className="mb-10">
            <Card className={`bg-gradient-to-r ${
              leadScore.score >= 80 ? 'from-red-50 to-pink-50 dark:from-gray-800 dark:to-gray-800 border-l-4 border-red-400' :
              leadScore.score >= 60 ? 'from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-800 border-l-4 border-orange-400' :
              'from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800 border-l-4 border-blue-400'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-5xl">{leadScore.level.split(' ')[0]}</div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{leadScore.level}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Ваш рейтинг: {leadScore.score}/100</p>
                </div>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                <motion.div
                  className={`h-full bg-gradient-to-r ${
                    leadScore.score >= 80 ? 'from-red-500 to-pink-500' :
                    leadScore.score >= 60 ? 'from-orange-500 to-yellow-500' :
                    'from-blue-500 to-cyan-500'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${leadScore.percentage}%` }}
                  transition={{ duration: 1.5 }}
                />
              </div>
              {leadScore.factors.length > 0 && (
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold mb-2">Факторы:</p>
                  <div className="flex flex-wrap gap-2">
                    {leadScore.factors.map((factor, idx) => (
                      <motion.span
                        key={idx}
                        className="text-xs bg-white dark:bg-gray-700 px-3 py-1 rounded-full text-gray-700 dark:text-gray-200 font-medium"
                        initial={{ opacity: 0, scale:0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        {factor}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {/* === ИТОГИ === */}
        <motion.div variants={itemVariants} className="mb-10">
          <Card className={quizState.aiMode ? 'bg-white dark:bg-gray-800' : 'bg-white dark:bg-gray-800'}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">📋 Ваши ответы</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: 'Режим квиза', value: quizState.aiMode ? '🤖 AI-режим' : '🎯 Обычный' },
                { label: 'Тип помещения', value: propertyLabels[quizState.propertyType] || quizState.propertyType },
                { label: 'Зоны', value: quizState.zones?.length > 0 ? quizState.zones.map(z => zoneLabels[z] || z).join(', ') : 'Не указаны' },
                { label: 'Площадь', value: quizState.area + 'м²' },
                { label: 'Стиль', value: styleLabels[quizState.style] || quizState.style || 'Не выбран' },
                { label: 'Бюджет', value: budgetLabels[quizState.budget] || quizState.budget },
              ].map((item, idx) => (
                <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.1 }}>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{item.label}</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* === CTA === */}
        <motion.div
          variants={itemVariants}
          className={`rounded-xl p-8 text-white text-center mb-10 ${
            quizState.aiMode
              ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
              : 'bg-gradient-to-r from-blue-500 to-cyan-500'
          }`}
        >
          <h3 className="text-2xl font-bold mb-3">🎯 Что дальше?</h3>
          <p className="mb-3 text-lg">
            Наш менеджер свяжется с вами в ближайшие 24 часа для обсуждения деталей и запуска проекта!
          </p>
          <p className="text-sm opacity-90">
            Контакт: <span className="font-semibold">{quizState.phone}</span>
            {quizState.email && ` | ${quizState.email}`}
          </p>
        </motion.div>

        {/* === BUTTONS === */}
        <motion.div variants={itemVariants} className="flex gap-4 flex-col sm:flex-row">
          <Button onClick={onRestart} variant="secondary" className="flex-1">
            ← Создать новый проект
          </Button>
          <Button variant="primary" luxury className="flex-1" onClick={() => alert(`✨ Заявка записана!\n\nПривет, ${quizState.name}!\nМы свяжемся с вами по номеру ${quizState.phone} в ближайшие 24 часа.`)}>
            ✓ Заявка принята!
          </Button>
        </motion.div>

        {/* === FOOTER === */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400">
            📈 <span className="font-semibold">SpasiBo za doverие!</span>
            <br />
            <span className="text-xs text-gray-500 dark:text-gray-500">© 2026 реализованно командой CyberPink228</span>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
