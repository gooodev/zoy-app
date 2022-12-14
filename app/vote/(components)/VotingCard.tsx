import { HeartIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import Image from 'next/image'
import { FC } from 'react'
import { Work } from '~/types/Work'
import { Avatar } from './Avatar'

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
    <div className={classNames('card-body', 'h-28', 'p-5', 'pt-4')}>
      <div className="flex items-center gap-2">
        <h2
          className={classNames(
            'card-title',
            'grow text-lg',
            'text-row-hidden'
          )}
        >
          {title}
        </h2>
        <div className="stack gap-1">
          <Avatar className="h-12 w-12" src={avatarSrc} alt={name} />
          <p className="text-center text-xs">{name}</p>
        </div>
      </div>
      {/* <p className="overflow-y-scroll text-[0.95rem]">
        {comment.replaceAll('\\n', '')}
      </p> */}
      {/* <div className="card-actions gap-5">{buttonElement}</div> */}
    </div>
  </div>
)

export default VotingCard
