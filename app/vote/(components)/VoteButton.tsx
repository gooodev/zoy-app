'use client'

import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import { ButtonHTMLAttributes, DetailedHTMLProps, forwardRef } from 'react'

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  isVoted: boolean
}

// eslint-disable-next-line react/display-name
const VotingButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { isVoted, className, ...others } = props
  return (
    <button
      className={classNames(
        className,
        'flex w-full justify-center gap-2',
        'rounded-md border-2 border-solid',
        {
          'border-pink-500 bg-pink-100 text-pink-600': isVoted,
        },
        {
          'border-gray-300 bg-white text-gray-500': !isVoted,
        }
      )}
      ref={ref}
      {...others}
    >
      {isVoted ? (
        <HeartIconSolid
          className={classNames('text-md my-auto h-5 w-5 text-pink-500')}
        />
      ) : (
        <HeartIconOutline
          className={classNames('text-md my-auto h-5 w-5 text-gray-300')}
        />
      )}
      {isVoted ? `投票済み` : `投票する`}
    </button>
  )
})

export default VotingButton
