'use client'
import { useNotification } from '@/(shared)/(hooks)/useNotification'
import { useVoteRecord } from '@/(shared)/(hooks)/useVoteRecord'
import { Dialog, Transition } from '@headlessui/react'
import { useConfettiClick } from '@hooks/useClickConfetti'
import classNames from 'classnames'
import Image from 'next/image'
import {
  createRef,
  FC,
  FormEvent,
  Fragment,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { Work } from '~/types/Work'
import VotingButton from './VoteButton'

type Props = {
  work: Work | null
  closeDialog: () => void
}

const VotingDialog: FC<Props> = ({ work, closeDialog }) => {
  const open = useMemo(() => work != null, [work])
  const { pushVoteRecord, deleteVoteRecord, selectVoteRecordByWorkId } =
    useVoteRecord()
  const voteRecord = useMemo(
    () => (work ? selectVoteRecordByWorkId(work.id) : null),
    [work, selectVoteRecordByWorkId]
  )
  const [inputComment, setInputComment] = useState(voteRecord?.comment)
  const [loading, setLoading] = useState(false)
  const { ref, explode } = useConfettiClick()
  const dialogRef = createRef<HTMLDivElement>()
  const { notify } = useNotification()
  const handleClickVotingButton = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      if (!work) {
        return
      }
      if (voteRecord == null) {
        setLoading(true)
        await explode()
        await pushVoteRecord({ workId: work.id, comment: inputComment || '' })
        setLoading(false)
        notify('投票完了！')
      } else {
        setLoading(true)
        await deleteVoteRecord(work.id)
        setLoading(false)
        notify('投票を取り消しました。')
      }
    },
    [
      work,
      voteRecord,
      explode,
      pushVoteRecord,
      inputComment,
      notify,
      deleteVoteRecord,
    ]
  )

  if (work == null) {
    return null
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={closeDialog}
        open={open}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto" ref={dialogRef}>
          <div className="flex h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={classNames(
                  'max-h-[650px] w-[70vw] min-w-[375px] max-w-lg',
                  'transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all'
                )}
              >
                {loading && (
                  <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-white bg-opacity-60">
                    <div className="z-10 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                  </div>
                )}
                <Dialog.Title className="mb-4 w-full text-left text-xl font-bold">
                  {work.title}
                </Dialog.Title>
                <figure className="mx-auto mb-6 block">
                  <Image
                    src={work.mainImageSrc}
                    alt={work.title}
                    width={300}
                    height={200}
                    className="w-full rounded-md"
                  />
                </figure>

                <form onSubmit={handleClickVotingButton}>
                  <div className="mb-4">
                    <label
                      className="mb-2 text-lg"
                      htmlFor={`comment-${work.id}`}
                    >
                      ひとことコメント（100文字以内）
                    </label>
                    <textarea
                      id={`comment-${work.id}`}
                      onChange={(e) => {
                        const inputText = e.target.value
                        if (inputText.length <= 100) {
                          setInputComment(e.target.value)
                        }
                      }}
                      defaultValue={inputComment}
                      className={classNames(
                        'min-h-[70px] w-full rounded-sm border-2 border-solid border-gray-400 p-3'
                      )}
                      disabled={voteRecord != null}
                    />
                  </div>
                  <VotingButton
                    type="submit"
                    isVoted={voteRecord != null}
                    ref={ref}
                    className="py-2"
                  />
                  {voteRecord != null && (
                    <button
                      className={classNames(
                        'py-2',
                        'flex w-full justify-center gap-2',
                        'text-gray-500'
                      )}
                    >
                      取り消す
                    </button>
                  )}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
export default VotingDialog
