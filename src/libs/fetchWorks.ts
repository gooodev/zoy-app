import { Work } from '~/types/Work'

import fsPromises from 'fs/promises'
import path from 'path'

export const fetchWorks = async (year: number) => {
  const jsonPath = path.join(process.cwd(), 'public/works', `${year}.json`)
  const jsonData = await fsPromises.readFile(jsonPath)
  return JSON.parse(jsonData.toString()) as Work[]
}

export const fetchWorkById = async (year: number, id: string) => {
  const works = await fetchWorks(year)
  return works.find((v) => v.id === id)
}
