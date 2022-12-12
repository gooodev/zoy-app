'use client'

import confetti from 'canvas-confetti'
import { PropsWithChildren, useEffect } from 'react'

const randomInRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min
}

const generateConfettiSettings = (originXA: number, originXB: number) => ({
  startVelocity: 30,
  spread: 360,
  ticks: 60,
  zIndex: 0,
  particleCount: 150,
  origin: {
    x: randomInRange(originXA, originXB),
    y: Math.random() - 0.2,
  },
})

const Template = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const startConfetti = async () => {
      await confetti(generateConfettiSettings(0.1, 0.3))
      await confetti(generateConfettiSettings(0.7, 0.9))
      await confetti(generateConfettiSettings(0.5, 0.5))
    }
    startConfetti()
  }, [])
  return <>{children}</>
}

export default Template
