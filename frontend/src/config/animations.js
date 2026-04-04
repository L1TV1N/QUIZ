/**
 * 🎬 СИСТЕМА АНИМАЦИЙ
 * Duolingo-style анимации для каждого шага
 */

// ============================================
// ОСНОВНЫЕ ВАРИАНТЫ АНИМАЦИЙ
// ============================================

export const slideInAnimation = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export const slideInRightAnimation = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export const fadeInUpAnimation = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export const scaleInAnimation = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

export const rotateInAnimation = {
  initial: { opacity: 0, rotate: -10, scale: 0.9 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  exit: { opacity: 0, rotate: 10, scale: 0.9 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export const bounceInAnimation = {
  initial: { opacity: 0, scale: 0.3 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    }
  },
  exit: { opacity: 0, scale: 0.3 },
  transition: { duration: 0.5 },
}

export const flipInAnimation = {
  initial: { opacity: 0, rotateY: 90 },
  animate: { opacity: 1, rotateY: 0 },
  exit: { opacity: 0, rotateY: -90 },
  transition: { duration: 0.7, ease: 'easeOut' },
}

export const zigzagAnimation = {
  initial: { opacity: 0, x: -50, y: 50 },
  animate: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 50, y: 50 },
  transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
}

export const pulseInAnimation = {
  initial: { opacity: 0, scale: 0.5 },
  animate: {
    opacity: 1,
    scale: [0.5, 1.05, 1],
  },
  exit: { opacity: 0, scale: 0.5 },
  transition: { duration: 0.5, ease: 'easeOut' },
}

// ============================================
// КОНТЕЙНЕР АНИМАЦИЙ (для списков)
// ============================================

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

// ============================================
// АНИМИРУЮЩИЕСЯ КНОПКИ
// ============================================

export const buttonHoverVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.98 },
}

export const luxuryButtonHoverVariants = {
  initial: { 
    scale: 1,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  hover: { 
    scale: 1.08,
    boxShadow: '0 20px 25px rgba(0, 0, 0, 0.2)',
    // gradient hover
  },
  tap: { scale: 0.95 },
}

// ============================================
// ПРОГРЕСС БАР АНИМАЦИИ
// ============================================

export const progressBarVariants = {
  initial: { width: '0%' },
  animate: (progress) => ({
    width: `${progress}%`,
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  }),
}

export const progressPulseVariants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
}

// ============================================
// LOADING АНИМАЦИИ
// ============================================

export const spinningDotVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

export const bouncingDotsVariants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// ============================================
// КАРТОЧКА УСПЕХА/ОШИБКИ
// ============================================

export const successCardVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
}

export const errorCardVariants = {
  initial: { opacity: 0, x: -50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
}

// ============================================
// СТРИМИНГ ЭЛЕМЕНТОВ (для результатов)
// ============================================

export const streamingItemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2, // каждый элемент задержка
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
}

// ============================================
// ПАРАЛЛАКС ФОНОВЫЙ
// ============================================

export const parallaxVariants = {
  animate: (scrollY) => ({
    y: scrollY * 0.5,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  }),
}

// ============================================
// ФУНКЦИЯ: ПОЛУЧИТЬ АНИМАЦИЮ ПО ШАГУ
// ============================================

export const getStepAnimation = (step) => {
  const animations = [
    slideInAnimation,           // Step 0
    slideInRightAnimation,      // Step 1
    fadeInUpAnimation,          // Step 2
    scaleInAnimation,           // Step 3
    rotateInAnimation,          // Step 4
    bounceInAnimation,          // Step 5
    flipInAnimation,            // Step 6
    zigzagAnimation,            // Step 7
    pulseInAnimation,           // Step 8
  ]

  return animations[step] || slideInAnimation
}

// ============================================
// КОМБИНИРОВАННЫЕ АНИМАЦИИ (для сложных)
// ============================================

export const getCardAnimation = (index, style = 'default') => {
  const styles = {
    default: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.1, duration: 0.5 },
    },
    luxury: {
      initial: { opacity: 0, scale: 0.8, rotate: -5 },
      animate: { opacity: 1, scale: 1, rotate: 0 },
      transition: { 
        delay: index * 0.15, 
        duration: 0.7,
        type: 'spring',
        stiffness: 80,
      },
    },
    playful: {
      initial: { opacity: 0, x: -50, rotate: 10 },
      animate: { opacity: 1, x: 0, rotate: 0 },
      transition: { 
        delay: index * 0.12, 
        duration: 0.6,
        type: 'spring',
        bounce: 0.4,
      },
    },
  }

  return styles[style] || styles.default
}

// ============================================
// НАВИГАЦИОННЫЕ ПЕРЕХОДЫ
// ============================================

export const pageTransitionVariants = {
  exit: {
    opacity: 0,
    y: -50,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

// ============================================
// MODAL/POPUP АНИМАЦИИ
// ============================================

export const modalBackdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const modalContentVariants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 20 },
  transition: { type: 'spring', stiffness: 300, damping: 30 },
}

// ============================================
// ЗНАЧКОВ И EMOJI АНИМАЦИИ
// ============================================

export const emojiReactionVariants = {
  hidden: { opacity: 0, scale: 0, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: -50,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    scale: 0,
    y: 0,
    transition: { duration: 0.3 },
  },
}

export const bounceEmojiVariants = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    scale: [1, 1.2, 1],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

// ============================================
// ТЕКСТОВОЙ ANMS (для букв/слов)
// ============================================

export const textRevealVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.05,
      duration: 0.5,
    },
  }),
}

export const typewriterVariants = {
  animate: {
    width: ['0%', '100%'],
    transition: {
      duration: 2,
      ease: 'easeInOut',
    },
  },
}

// ============================================
// UTILITY: ПРИЛОЖИТЬ ГЛУБИНУ
// ============================================

export const addDepthVariants = (baseVariants) => ({
  ...baseVariants,
  whileHover: {
    ...(baseVariants.whileHover || {}),
    boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)',
    zIndex: 10,
  },
})

// ============================================
// ЦВЕТНАЯ ПУЛЬСАЦИЯ
// ============================================

export const colorPulseVariants = (color1, color2) => ({
  animate: {
    backgroundColor: [color1, color2, color1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
})

// ============================================
// БЕСКОНЕЧНОЕ ВРАЩЕНИЕ С ПОВОРОТОМ
// ============================================

export const spinningRotateVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

// ============================================
// ФОКУС НА ЭЛЕМЕНТ
// ============================================

export const focusVariants = {
  initial: { opacity: 0.5, scale: 0.95 },
  focused: { opacity: 1, scale: 1 },
  unfocused: { opacity: 0.5, scale: 0.95 },
}
