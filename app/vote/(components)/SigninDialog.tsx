'use client'
import { Dialog, Transition } from '@headlessui/react'
import { useAuth } from '@hooks/useAuth'
import { FC, Fragment } from 'react'
import { FcGoogle } from 'react-icons/fc'

type Props = {
  open: boolean
  closeDialog: () => void
}

const SigninDialog: FC<Props> = ({ open, closeDialog }) => {
  const { signin } = useAuth()

  return (
    <>
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
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-center text-lg font-medium leading-6 text-gray-900"
                  >
                    投票にはログインが必要です。
                  </Dialog.Title>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="mx-auto flex items-center justify-center gap-2  bg-blue-500 px-4 py-2 text-sm font-medium text-white"
                      onClick={async () => {
                        await signin()
                        closeDialog()
                      }}
                    >
                      <FcGoogle className="h-5 w-5 bg-white" />
                      ログイン
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
export default SigninDialog
