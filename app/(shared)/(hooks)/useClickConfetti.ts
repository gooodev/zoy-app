import { useElementProperty } from '@hooks/useElementProperty'
import { useScreenSize } from '@hooks/useScreenSize'
import confetti from 'canvas-confetti'
import { createRef } from 'react'

export const useConfettiClick = () => {
  const screenSize = useScreenSize()
  const ref = createRef<HTMLButtonElement>()
  const { getElementProperty } = useElementProperty(ref)

  const explode = async () => {
    const buttonCenter = {
      x: getElementProperty('x') + getElementProperty('width') / 2,
      y: getElementProperty('y') + getElementProperty('height') / 2,
    }
    await confetti({
      particleCount: 50,
      spread: 50,
      origin: {
        x: buttonCenter.x / screenSize.x,
        y: buttonCenter.y / screenSize.y,
      },
    })
  }

  return { ref, explode }
}
