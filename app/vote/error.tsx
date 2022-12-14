'use client'

import { useNotification } from '@/(shared)/(hooks)/useNotification'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const { notify } = useNotification()
  useEffect(() => {
    notify(error.message)
  }, [error, notify])

  return null
}
