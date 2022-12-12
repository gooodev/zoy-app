import { useNotification } from '@/(shared)/(hooks)/useNotification'
import { Transition } from '@headlessui/react'

const Notification = () => {
  const { notificationState, notify, closeNotification } = useNotification()

  return (
    <Transition
      show={notificationState.open}
      enter="transition ease-out"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
      className="fixed inset-x-0 bottom-5 z-50 mx-auto w-2/3 md:w-1/3"
    >
      <div
        className="mb-4 rounded-lg bg-blue-100 py-5 px-6 text-base text-blue-700"
        role="alert"
      >
        {notificationState.text}
      </div>
    </Transition>
  )
}

export default Notification
