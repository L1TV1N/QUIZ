import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { QuizStep } from '../QuizStep'
import { Card, Button, SelectCard } from '../ui/SharedUI'
import useQuizStore from '../../store/quizStore'
import { getRandomizedAIQuestions } from '../../config/adaptiveContent'

export const Step7AiQuestions = ({ onNext, onPrev }) => {
  const quizState = useQuizStore((state) => state.quizState)
  const setQuizState = useQuizStore((state) => state.setQuizState)
  const isLoading = useQuizStore((state) => state.isLoading)
  
  const [questionsData, setQuestionsData] = useState([])

  const propertyType = quizState.propertyType
  const aiAnswers = quizState.aiAnswers || {}
  
  // Инициализируем вопросы один раз при загрузке компонента
  useEffect(() => {
    const questions = getRandomizedAIQuestions(propertyType) || []
    setQuestionsData(questions)
  }, [propertyType])

  const handleAnswerSelect = (questionId, answer) => {
    setQuizState({
      aiAnswers: {
        ...aiAnswers,
        [questionId]: answer,
      },
    })
  }

  // Проверяем что все вопросы ответлены
  const allAnswered = questionsData.every(q => aiAnswers[q.id])

  return (
    <QuizStep
      title="🤖 Уточняющие вопросы от AI"
      subtitle="Эти вопросы помогут создать более персональный и точный дизайн-проект"
      currentStep={7}
      totalSteps={9}
      onNext={onNext}
      onPrev={onPrev}
      nextDisabled={!allAnswered || isLoading}
    >
      <div className="space-y-8">
        {questionsData.map((question, idx) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="border-blue-200 dark:border-blue-800 border-2">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-600 text-white flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex-1">
                  {question.question}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {question.options.map((option) => {
                  const isSelected = aiAnswers[question.id] === option
                  
                  return (
                    <SelectCard
                      key={option}
                      selected={isSelected}
                      onClick={() => handleAnswerSelect(question.id, option)}
                      className="!justify-center !text-center dark:bg-gray-800 dark:border-gray-700"
                    >
                      <p className="font-semibold text-gray-900 dark:text-white">{option}</p>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mt-2 text-blue-500 dark:text-blue-400"
                        >
                          ✓
                        </motion.div>
                      )}
                    </SelectCard>
                  )
                })}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-4 bg-gradient-to-r from-blue-50 dark:from-blue-900 to-cyan-50 dark:to-blue-800 rounded-lg border-l-4 border-blue-500 dark:border-blue-400"
      >
        <p className="text-sm text-gray-700 dark:text-blue-100">
          <span className="font-semibold text-blue-600 dark:text-blue-300">💡 Подсказка:</span> Эти ответы помогут AI создать по-настоящему персональный дизайн-проект, соответствующий вашему образу жизни и предпочтениям.
        </p>
      </motion.div>
    </QuizStep>
  )
}
