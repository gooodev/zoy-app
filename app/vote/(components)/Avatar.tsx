import classNames from 'classnames'
import Image from 'next/image'

type Props = {
  src: string
  alt: string
  className?: string
}

export const Avatar = ({ className, src, alt }: Props) => {
  return (
    <figure className={classNames(className)}>
      <Image
        className="rounded-full"
        width={500}
        height={500}
        src={src}
        alt={alt}
      />
    </figure>
  )
}
