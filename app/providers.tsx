'use client'
import Notification from '@components/Notification'
import { PropsWithChildren } from 'react'
import { RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <RecoilRoot>
      <SWRConfig value={{ suspense: true }}>{children}</SWRConfig>
      <Notification />
    </RecoilRoot>
  )
}
