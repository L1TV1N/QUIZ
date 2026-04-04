import { motion } from 'framer-motion'

export const AiLoadingScreen = ({ message = 'AI анализирует ваши ответы...' }) => {
  const dotVariants = {
    animate: (custom) => ({
      opacity: [0, 1, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        delay: custom * 0.2,
      },
    }),
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  }

  const spinVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors"
    >
      <motion.div
        className="text-center max-w-md"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* 🤖 Иконка с анимацией */}
        <motion.div
          className="text-7xl mb-8"
          variants={spinVariants}
          animate="animate"
        >
          🤖
        </motion.div>

        {/* Основной текст */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {message}
        </motion.h1>

        {/* Диоточки загрузки (вариант 1) */}
        <div className="flex justify-center gap-3 mb-8">
          {[0, 1, 2].map((dot) => (
            <motion.div
              key={dot}
              custom={dot}
              variants={dotVariants}
              animate="animate"
              className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            />
          ))}
        </div>

        {/* Переходящая полоса */}
        <motion.div className="mb-8">
          <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              animate={{
                width: ['0%', '100%', '0%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>

        {/* Подвижная подсказка */}
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Пожалуйста, подождите...
        </motion.p>

        {/* Квадраты центра (вариант 2 - пульсирующие) */}
        <motion.div className="flex justify-center gap-4 mt-8">
          {['💡', '✨', '🎯'].map((emoji, idx) => (
            <motion.div
              key={idx}
              className="text-4xl"
              variants={pulseVariants}
              animate="animate"
              custom={idx}
              transition={{
                delay: idx * 0.15,
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </motion.div>

        {/* Под-текст */}
        <motion.div
          className="mt-12 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-sm text-gray-600 dark:text-gray-300">
            💭 AI анализирует ваши ответы и подбирает идеальный дизайн для вашего пространства...
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
