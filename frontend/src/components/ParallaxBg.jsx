import { motion, useViewportScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

export const ParallaxBg = ({ children, enabled = false }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Проверка мобильного устройства
    setIsMobile(window.innerWidth < 768)

    // Обработка движения мыши (только для десктопа)
    if (!isMobile && enabled) {
      const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX / 50, y: e.clientY / 50 })
      }

      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isMobile, enabled])

  // Для scroll parallax используем viewport scroll
  const { scrollY } = useViewportScroll()
  const yTransform = useTransform(scrollY, [0, 300], [0, 100])

  if (!enabled) {
    return children
  }

  return (
    <div className="relative overflow-hidden">
      {/* Фоновые элементы с параллаксом */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          y: isMobile ? yTransform : 0,
          x: mousePosition.x,
          transition: 'all 0.3s ease-out',
        }}
      >
        {/* Левый фон */}
        <motion.div
          className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20"
          animate={{
            y: isMobile ? 0 : mousePosition.y * 0.3,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />

        {/* Правый фон */}
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-pink-200 to-purple-200 rounded-full blur-3xl opacity-20"
          animate={{
            y: isMobile ? 0 : -mousePosition.y * 0.3,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />

        {/* Центральный круг */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full blur-3xl opacity-10"
          animate={{
            y: isMobile ? 0 : -mousePosition.y * 0.2,
            x: isMobile ? 0 : mousePosition.x * 0.2,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Контент поверх фона */}
      <motion.div className="relative z-10">
        {children}
      </motion.div>
    </div>
  )
}

// Альтернативный компонент для простого параллакса
export const SimpleParallax = ({ children, offset = 0.5 }) => {
  const { scrollY } = useViewportScroll()
  const y = useTransform(scrollY, [0, 300], [0, 300 * offset])

  return (
    <motion.div style={{ y }}>
      {children}
    </motion.div>
  )
}
