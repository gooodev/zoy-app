'use client'
import { useAuth } from '@/(shared)/(hooks)/useAuth'
import { useVoteRecord } from '@/(shared)/(hooks)/useVoteRecord'
import classNames from 'classnames'
import { createRef, useCallback, useState } from 'react'
import { Work } from '~/types/Work'
import SigninDialog from './(components)/SigninDialog'
import VotingButton from './(components)/VoteButton'
import VotingCard from './(components)/VotingCard'
import VotingDialog from './(components)/VotingDialog'

type Props = {
  works: Work[]
}

const PageView = ({ works }: Props) => {
  const ref = createRef<HTMLElement>()
  const [selectedWork, setSelectedWork] = useState<Work | null>(null)
  const [isOpenSigninDialog, setOpenSigninDialog] = useState<boolean>(false)
  const { authState } = useAuth()
  const { isVotedWork } = useVoteRecord()

  const handleClickVotingButton = useCallback(
    (work: Work) => () => {
      if (authState.isAuthenticated) {
        setSelectedWork(work)
      } else {
        setOpenSigninDialog(true)
      }
    },
    [authState]
  )

  return (
    <section className="content-width min-h-[var(--main-min-height)]">
      <div
        className={classNames('bg-base-100', 'sticky top-0 z-10 w-full py-5')}
      >
        <p className="mr-10 text-right text-xs text-pink-500 md:text-sm lg:text-lg">
          {`現在の投票数：1 / 3`}
        </p>
      </div>
      <article
        className={classNames(
          'mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'
        )}
        ref={ref}
      >
        {works.map((work) => (
          <div key={`work-${work.id}`} className="center mb-3">
            <VotingCard
              work={work}
              buttonElement={
                <VotingButton
                  className="py-2"
                  isVoted={isVotedWork(work)}
                  onClick={handleClickVotingButton(work)}
                />
              }
            />
          </div>
        ))}
      </article>
      <SigninDialog
        open={isOpenSigninDialog}
        closeDialog={() => setOpenSigninDialog(false)}
      />
      <VotingDialog
        work={selectedWork}
        closeDialog={() => setSelectedWork(null)}
      />
    </section>
  )
}

export default PageView
