import { HeartIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import Image from 'next/image'
import { FC } from 'react'
import { Work } from '~/types/Work'

type Props = {
  work: Work
  isVoted: boolean
  onClick: () => void
}

export const VotingCard: FC<Props> = ({
  work: {
    title,
    mainImage,
    designer: { avatarSrc, name },
  },
  isVoted,
  onClick,
}) => (
  <div
    className={classNames(
      'card',
      'w-80 cursor-pointer bg-base-100 shadow-xl',
      'mr-0'
    )}
    onClick={onClick}
  >
    <figure className="relative h-52">
      <Image width={400} height={300} src={mainImage.src} alt={title} />
      {isVoted && (
        <HeartIcon
          className={classNames(
            'h-10 w-10 p-2',
            'absolute top-4 right-4',
            'text-lg text-pink-500',
            'border-2 border-solid border-pink-500',
            'rounded-full bg-pink-200'
          )}
        />
      )}
    </figure>
    <div className={classNames('h-24', 'px-6', 'py-6')}>
      <div className="flex h-full items-center">
        <h2
          className={classNames(
            'card-title',
            'grow text-lg',
            'text-row-hidden'
          )}
        >
          {title}
        </h2>
      </div>
    </div>
  </div>
)

export default VotingCard
