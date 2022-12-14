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
  designer: {
    name: string
    avatarSrc: string
  }
}
