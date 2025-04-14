// hooks/useConfetti.ts
'use client'

import confetti from 'canvas-confetti'

type ConfettiOptions = Partial<confetti.Options>

export function useConfetti() {
  const fire = (options?: ConfettiOptions) => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      ...options,
    })
  }

  const fireBurst = () => {
    const duration = 2 * 1000
    const end = Date.now() + duration

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval)
        return
      }

      fire()
    }, 250)
  }

  const fireRain = () => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        fire({
          particleCount: 10,
          spread: 90,
          startVelocity: 30,
          origin: { x: Math.random(), y: -0.1 },
          gravity: 1,
        })
      }, i * 200)
    }
  }

  const fireFireworks = () => {
    const end = Date.now() + 1500
    const colors = ['#bb0000', '#ffffff', '#0000ff']

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval)
        return
      }

      fire({
        particleCount: 50,
        angle: Math.random() * 360,
        spread: 70,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.8,
        },
        colors,
      })
    }, 200)
  }

  const fireEmojis = () => {
    confetti({
      particleCount: 40,
      spread: 80,
      origin: { y: 0.6 },
      scalar: 1.2,
      shapes: ['text'],
      ticks: 200,
      gravity: 0.6,
      emojis: ['🎉', '🔥', '✨', '🚀', '💯'],
    } as any) // `emojis` no está tipado oficialmente, por eso el cast
  }

  return {
    fire,
    fireBurst,
    fireRain,
    fireFireworks,
    fireEmojis,
  }
}
