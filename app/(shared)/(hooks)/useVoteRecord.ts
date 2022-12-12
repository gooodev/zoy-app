import { useAuth } from '@hooks/useAuth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useMemo } from 'react'
import useSWR from 'swr'
import { VoteRecord } from '~/types/VoteRecord'
import { Work } from '~/types/Work'
import { firebaseApps } from '~/vendor/firebase/client'

export const useVoteRecord = () => {
  const { authState } = useAuth()
  const docPath = useMemo(
    () =>
      (authState.isAuthenticated &&
        `voting/${process.env.NEXT_PUBLIC_YEAR}/records/${authState.uid}`) ||
      null,
    [authState]
  )
  const { data: voteRecords, mutate } = useSWR(docPath, async (path) => {
    const docRef = doc(firebaseApps.db, path)
    const result = (await getDoc(docRef)).data()
    if (result && typeof result === 'object' && 'votes' in result) {
      const { votes } = result
      if (Array.isArray(votes)) {
        return votes as Array<VoteRecord>
      }
    }
    return null
  })

  const syncVoteRecord = async (newValue: Array<VoteRecord>) => {
    if (docPath) {
      const docRef = doc(firebaseApps.db, docPath)
      await setDoc(docRef, { votes: newValue })
      await mutate(newValue)
    }
  }

  const pushVoteRecord = async (record: VoteRecord) => {
    if (
      voteRecords &&
      voteRecords.length >= process.env.NEXT_PUBLIC_MAX_VOTE_COUNT
    ) {
      throw new Error(
        `投票数が最大数(${process.env.NEXT_PUBLIC_MAX_VOTE_COUNT})を超えています。`
      )
    }
    const newValue = voteRecords ? [...voteRecords, record] : [record]
    await syncVoteRecord(newValue)
  }

  const deleteVoteRecord = async (workId: string) => {
    if (voteRecords?.find((v) => v.workId === workId)) {
      const newValue = [...voteRecords.filter((v) => v.workId !== workId)]
      await syncVoteRecord(newValue)
    }
  }

  const selectVoteRecordByWorkId = (workId: string) => {
    return (
      voteRecords?.find((v) => {
        return v.workId === workId
      }) || null
    )
  }

  const isVotedWork = (work: Work) => {
    return selectVoteRecordByWorkId(work.id) !== null
  }

  const voteCount = useMemo(() => {
    return voteRecords?.length || 0
  }, [voteRecords])

  return {
    isVotedWork,
    voteCount,
    selectVoteRecordByWorkId,
    pushVoteRecord,
    deleteVoteRecord,
  }
}
