import { motion } from 'framer-motion'
import { Card, Button, ProgressBar } from './SharedUI'

export const QuizStep = ({ 
  title,
  subtitle = '',
  currentStep,
  totalSteps,
  children,
  onNext,
  onPrev,
  nextDisabled = false,
  hidePrevButton = false,
  hideNextButton = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center py-8 px-4"
    >
      <div className="w-full max-w-2xl">
        <ProgressBar current={currentStep} total={totalSteps} />
        
        <Card className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">{title}</h1>
          {subtitle && (
            <p className="text-lg text-gray-600 mb-8">{subtitle}</p>
          )}
          
          <div className="my-8">
            {children}
          </div>
          
          <div className="flex gap-4 mt-12">
            {!hidePrevButton && (
              <Button
                variant="secondary"
                onClick={onPrev}
                className="flex-1"
              >
                ← Назад
              </Button>
            )}
            
            {!hideNextButton && (
              <Button
                variant="primary"
                onClick={onNext}
                disabled={nextDisabled}
                className="flex-1"
              >
                Далее →
              </Button>
            )}
          </div>
        </Card>
      </div>
    </motion.div>
  )
}
