import { useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'

const screenSizeAtom = atom({
  default: { x: 0, y: 0 },
  key: 'screensize',
})

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useRecoilState(screenSizeAtom)

  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({ x: window.innerWidth, y: window.innerHeight })
    }
    window.addEventListener('resize', updateScreenSize)
    updateScreenSize()
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [setScreenSize])

  return screenSize
}
