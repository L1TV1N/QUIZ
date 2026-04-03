import { motion } from 'framer-motion'

export const Button = ({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300'
  
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 active:scale-95',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 active:scale-95',
    ghost: 'text-blue-500 hover:bg-blue-50',
  }
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}

export const Card = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-xl shadow-lg p-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export const SelectCard = ({ 
  selected = false, 
  onClick,
  children,
  className = ''
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        p-4 rounded-lg border-2 cursor-pointer transition-all
        ${selected 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 bg-white hover:border-gray-300'
        }
        ${className}
      `}
    >
      {children}
    </motion.div>
  )
}

export const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-gray-600">
          Шаг {current + 1} из {total}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
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
        w-full px-4 py-3 rounded-lg border-2 border-gray-200
        focus:border-blue-500 focus:outline-none transition-all
        text-gray-900 placeholder-gray-500
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
        w-full px-4 py-3 rounded-lg border-2 border-gray-200
        focus:border-blue-500 focus:outline-none transition-all
        text-gray-900 placeholder-gray-500 resize-none
        min-h-[120px]
        ${className}
      `}
      {...props}
    />
  )
}
