import classNames from 'classnames'
import Image from 'next/image'
import { FC, ReactNode } from 'react'
import { Work } from '~/types/Work'

type Props = {
  work: Work
  buttonElement: ReactNode
}

export const VotingCard: FC<Props> = ({
  work: {
    title,
    mainImageSrc,
    comment,
    workUrl,
    designer: { avatarSrc, name },
  },
  buttonElement,
}) => (
  <div className={classNames('card', 'w-80 bg-base-100 shadow-xl', 'mr-0')}>
    <figure className="h-52">
      <a href={workUrl} target="_blank" rel="noreferrer">
        <Image width={400} height={300} src={mainImageSrc} alt={title} />
      </a>
    </figure>
    <div className={classNames('card-body', 'h-72', 'p-5', 'pt-4')}>
      <div className="flex gap-2">
        <h2 className={classNames('card-title', 'grow text-lg')}>{title}</h2>
        <div className="stack gap-1">
          <div className="avatar w-12">
            <figure className="h-12 w-12 rounded-full">
              <Image width={500} height={500} src={avatarSrc} alt={name} />
            </figure>
          </div>
          <p className="text-center text-xs">{name}</p>
        </div>
      </div>
      <p className="text-[0.95rem]">{comment.replaceAll('\\n', '')}</p>
      <div className="card-actions gap-5">{buttonElement}</div>
    </div>
  </div>
)

export default VotingCard
