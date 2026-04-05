import { defaultQuizConfig } from './defaultQuizConfig'

export const getZonesByPropertyFromConfig = (config, propertyType) => {
  const source = config?.steps?.zones?.optionsByProperty || defaultQuizConfig.steps.zones.optionsByProperty
  return source[propertyType] || source.other || []
}

export const getZoneTextByPropertyFromConfig = (config, propertyType) => {
  const source = config?.steps?.zones?.titles || defaultQuizConfig.steps.zones.titles
  return source[propertyType] || source.other
}

export const getAIQuestionsByPropertyFromConfig = (config, propertyType) => {
  const source = config?.steps?.ai?.questionsByProperty || defaultQuizConfig.steps.ai.questionsByProperty
  return source[propertyType] || source.other || []
}

export const getRandomizedAIQuestionsFromConfig = (config, propertyType) => {
  const propertyQuestions = getAIQuestionsByPropertyFromConfig(config, propertyType)
  const universal = config?.steps?.ai?.universalQuestions || defaultQuizConfig.steps.ai.universalQuestions
  return [...propertyQuestions, ...universal]
}
