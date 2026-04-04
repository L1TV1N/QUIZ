import { motion } from 'framer-motion'
import { useSound } from '../../hooks/useSound'

export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false,
  luxury = false,
  className = '',
  sound = null, // 'next', 'prev', 'select', 'submit', 'error'
  ...props 
}) => {
  const { play } = useSound()
  
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300'
  
  const variants = {
    primary: 'bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700 active:scale-95',
    secondary: 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 active:scale-95',
    ghost: 'text-blue-500 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800',
  }
  
  // Luxury вариант (для дорогого вида)
  const luxuryVariant = 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-2xl'
  
  const handleClick = (e) => {
    if (!disabled && sound) {
      play(sound)
    }
    if (onClick && !disabled) {
      onClick(e)
    }
  }
  
  return (
    <motion.button
      whileHover={{ 
        scale: disabled ? 1 : luxury ? 1.08 : 1.02,
        ...(luxury && { 
          boxShadow: '0 20px 25px rgba(59, 130, 246, 0.4)',
        }),
      }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={handleClick}
      disabled={disabled}
      className={`
        ${baseStyles} 
        ${luxury ? luxuryVariant : variants[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''} 
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export const Card = ({ children, className = '', onClick, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-xl p-6 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const SelectCard = ({ 
  selected = false, 
  onClick,
  children,
  luxury = false,
  className = '',
  sound = 'select' // звук при выборе
}) => {
  const { play } = useSound()

  const handleClick = () => {
    if (sound) {
      play(sound)
    }
    if (onClick) {
      onClick()
    }
  }

  return (
    <motion.div
      whileHover={{ 
        scale: luxury ? 1.08 : 1.05,
        ...(luxury && {
          boxShadow: selected 
            ? '0 20px 25px rgba(59, 130, 246, 0.3)' 
            : '0 15px 20px rgba(0, 0, 0, 0.1)',
        }),
      }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`
        p-4 rounded-lg border-2 cursor-pointer transition-all
        ${luxury ? 'border border-gray-300 dark:border-gray-600' : ''}
        ${selected 
          ? luxury 
            ? 'border-blue-500 dark:border-blue-400 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-800 shadow-lg dark:shadow-xl'
            : 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-gray-700' 
          : luxury
            ? 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600'
            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
        }
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}

export const ProgressBar = ({ current, total, showEmoji = true }) => {
  const percentage = ((current + 1) / total) * 100
  
  // Эмоджи по прогрессу
  let emoji = '🙂'
  if (percentage >= 70) emoji = '💎'
  else if (percentage >= 30) emoji = '🔥'
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          {showEmoji && <span className="text-xl">{emoji}</span>}
          <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            Шаг {current + 1} из {total}
          </span>
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
        />
      </div>
    </div>
  )
}

export const Input = ({ 
  placeholder = '', 
  value = '', 
  onChange,
  type = 'text',
  className = '',
  ...props 
}) => {
  return (
    <motion.input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600
        focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all
        text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
        bg-white dark:bg-gray-800
        ${className}
      `}
      {...props}
    />
  )
}

export const Textarea = ({ 
  placeholder = '', 
  value = '', 
  onChange,
  className = '',
  ...props 
}) => {
  return (
    <motion.textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-600
        focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all
        text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none
        bg-white dark:bg-gray-800
        min-h-[120px]
        ${className}
      `}
      {...props}
    />
  )
}
