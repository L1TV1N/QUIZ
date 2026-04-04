import { useCallback } from 'react'

// Пути к звукам
const soundPaths = {
  next: '/sounds/далее.mp3',
  prev: '/sounds/назад.mp3',
  select: '/sounds/выбор.mp3',
  submit: '/sounds/анкета отправлена.mp3',
  error: '/sounds/ошибка.mp3',
  scrollLeft: '/sounds/скролл-left.mp3',
  scrollRight: '/sounds/скролл-right.mp3',
}

export const useSound = () => {
  const play = useCallback((soundType) => {
    try {
      const soundPath = soundPaths[soundType]
      if (soundPath) {
        // Создаём новый объект Audio каждый раз для каждого воспроизведения
        const audio = new Audio(soundPath)
        audio.volume = 0.6
        audio.play().catch(err => {
          console.warn(`Не удалось воспроизвести звук ${soundType}:`, err)
        })
      } else {
        console.warn(`Неизвестный тип звука: ${soundType}`)
      }
    } catch (error) {
      console.warn('Ошибка при воспроизведении звука:', error)
    }
  }, [])

  return { play }
}

// Функция для отключения/включения звуков (уже не используется с новой системой, но оставляуо для совместимости)
export const setSoundsEnabled = (enabled) => {
  // Теперь звуки просто не будут вызываться если disabled
}
