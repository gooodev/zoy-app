import { fetchWorks } from '~/libs/fetchWorks'
import PageView from './view'

const Page = async () => {
  const works = await fetchWorks(process.env.NEXT_PUBLIC_YEAR)
  return <PageView works={works} />
}

export default Page
