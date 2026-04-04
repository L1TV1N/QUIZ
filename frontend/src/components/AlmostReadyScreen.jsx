import { motion } from 'framer-motion'

export const AlmostReadyScreen = ({ onComplete }) => {
  // Fake progress (1-2 секунды для реализма)
  const progressVariants = {
    animate: {
      width: ['0%', '100%'],
      transition: {
        duration: 2.5,
        ease: 'easeInOut',
      },
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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

  const checkmarkVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.3,
      },
    },
  }

  const tasks = [
    '📊 Анализ данных',
    '🎨 Вычисление стилей',
    '💰 Расчет сметы',
    '✨ Генерация материалов',
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors"
    >
      <motion.div
        className="w-full max-w-md mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Заголовок */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div
            className="text-6xl mb-4"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ✨
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Почти готово!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Формируем ваш персональный дизайн-проект...
          </p>
        </motion.div>

        {/* Список задач */}
        <motion.div variants={itemVariants} className="space-y-4 mb-10">
          {tasks.map((task, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
            >
              <motion.div
                className="flex-shrink-0"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: idx * 0.15,
                }}
              >
                {task.split(' ')[0]}
              </motion.div>
              <span className="text-gray-900 dark:text-white font-medium">
                {task.split(' ').slice(1).join(' ')}
              </span>
              <motion.div
                className="ml-auto"
                variants={checkmarkVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.5 + idx * 0.15 }}
              >
                <span className="text-green-500 text-xl">✓</span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress bar */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Прогресс</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">100%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              variants={progressVariants}
              animate="animate"
              onAnimationComplete={onComplete}
            />
          </div>
        </motion.div>

        {/* Советы */}
        <motion.div
          variants={itemVariants}
          className="p-6 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg border border-blue-200 dark:border-blue-700 text-center"
        >
          <p className="text-sm text-blue-900 dark:text-blue-100">
            💡 <span className="font-semibold">Интересный факт:</span> AI использует машинное обучение для подбора идеального дизайна специально для вас!
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
