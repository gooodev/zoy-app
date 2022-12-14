'use client'
import { ClientSafeProvider, signIn } from 'next-auth/react'

type Props = {
  provider: ClientSafeProvider
}
const PageView = ({ provider }: Props) => {
  return (
    <div key={provider.name}>
      <button onClick={() => signIn(provider.id)}>
        Sign in with {provider.name}
      </button>
    </div>
  )
}
export default PageView
