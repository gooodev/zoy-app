import { getProviders } from 'next-auth/react'
import PageView from './view'

const Page = async () => {
  const providers = await getProviders()
  const provider = providers?.google
  if (!provider) {
    return null
  }
  return <PageView provider={provider} />
}

export default Page
