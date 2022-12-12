import { useCallback, useEffect } from 'react'
import { atom, useRecoilState } from 'recoil'

type NotificationState = {
  open: boolean
  text: string
  timeout: number
}

const notificationStateAtom = atom<NotificationState>({
  key: 'NotificationState',
  default: {
    open: false,
    text: '',
    timeout: 1000,
  },
})

export const useNotification = () => {
  const [notificationState, setNotificationState] = useRecoilState(
    notificationStateAtom
  )

  const closeNotification = useCallback(() => {
    setNotificationState((prev) => ({ ...prev, open: false }))
  }, [setNotificationState])

  useEffect(() => {
    if (!notificationState.open) {
      return
    }
    let timer = setTimeout(closeNotification, notificationState.timeout)
    return () => clearTimeout(timer)
  }, [notificationState, closeNotification])

  const notify = (text: string, timeout: number = 1000) => {
    setNotificationState({ open: true, text, timeout })
  }

  return { notificationState, notify, closeNotification }
}
