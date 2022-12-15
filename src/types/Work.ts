export type Work = {
  id: string
  title: string
  comment: string
  mainImage: {
    src: string
    height: number
    width: number
  }
  workUrl: string
  designers: {
    name: string
    avatarSrc: string
  }[]
}
