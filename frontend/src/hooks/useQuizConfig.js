import { useEffect, useState } from 'react'
import { fetchQuizConfig, getQuizConfig } from '../config/quizConfig'

export const useQuizConfig = () => {
  const [config, setConfig] = useState(getQuizConfig())

  useEffect(() => {
    let active = true
    fetchQuizConfig().then((data) => {
      if (active) setConfig(data)
    })
    return () => {
      active = false
    }
  }, [])

  return config
}
