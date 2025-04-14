"use client"

import confetti from "canvas-confetti"
import { useEffect } from "react"

export default function Confetti() {
  useEffect(() => {
    const duration = 2 * 1000
    const end = Date.now() + duration

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval)
        return
      }

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 1 },
      })
    }, 250)
  }, [])

  return null // no renderiza nada, es solo efecto
}