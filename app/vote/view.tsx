'use client'
import { useAuth } from '@/(shared)/(hooks)/useAuth'
import { useVoteRecord } from '@/(shared)/(hooks)/useVoteRecord'
import Loading from '@/loading'
import classNames from 'classnames'
import { createRef, Suspense, useCallback, useState } from 'react'
import { isVotingTerm } from '~/libs/isVotingTerm'
import { Work } from '~/types/Work'
import SigninDialog from './(components)/SigninDialog'
import VotingCard from './(components)/VotingCard'
import VotingDialog from './(components)/VotingDialog'
import VotingFinishDialog from './(components)/VotingFinishDialog'

type Props = {
  works: Work[]
}

const PageView = ({ works }: Props) => {
  const ref = createRef<HTMLElement>()
  const [selectedWork, setSelectedWork] = useState<Work | null>(null)
  const [isOpenSigninDialog, setOpenSigninDialog] = useState<boolean>(false)
  const { authState } = useAuth()
  const { isVotedWork, voteCount } = useVoteRecord()

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
        <p className="mr-10 text-right text-sm text-pink-500 lg:text-lg">
          {`現在の投票数：${voteCount} / ${process.env.NEXT_PUBLIC_MAX_VOTE_COUNT}`}
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
              isVoted={isVotedWork(work)}
              onClick={handleClickVotingButton(work)}
            />
          </div>
        ))}
      </article>
      <SigninDialog
        open={isOpenSigninDialog}
        closeDialog={() => setOpenSigninDialog(false)}
      />
      <Suspense fallback={<Loading />}>
        {isVotingTerm() ? (
          <VotingDialog
            work={selectedWork}
            closeDialog={() => setSelectedWork(null)}
          />
        ) : (
          <VotingFinishDialog
            open={selectedWork != null}
            closeDialog={() => setSelectedWork(null)}
          />
        )}
      </Suspense>
    </section>
  )
}

export default PageView
