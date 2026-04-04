import { useCallback } from 'react'

// Предварительно загружаем звуки
const sounds = {
  next: new Audio('/sounds/далее.mp3'),
  prev: new Audio('/sounds/назад.mp3'),
  select: new Audio('/sounds/выбор.mp3'),
  submit: new Audio('/sounds/анкета отправлена.mp3'),
  error: new Audio('/sounds/ошибка.mp3'),
}

// Устанавливаем громкость и предотвращаем перекрытие звуков
Object.values(sounds).forEach(sound => {
  sound.volume = 0.6 // 60% громкости, чтобы не слишком громко
})

export const useSound = () => {
  const play = useCallback((soundType) => {
    try {
      // Сбрасываем позицию и проигрываем
      if (sounds[soundType]) {
        sounds[soundType].currentTime = 0
        sounds[soundType].play().catch(err => {
          console.warn(`Не удалось воспроизвести звук ${soundType}:`, err)
        })
      }
    } catch (error) {
      console.warn('Ошибка при воспроизведении звука:', error)
    }
  }, [])

  return { play }
}

// Функция для отключения/включения звуков
export const setSoundsEnabled = (enabled) => {
  Object.values(sounds).forEach(sound => {
    sound.muted = !enabled
  })
}
