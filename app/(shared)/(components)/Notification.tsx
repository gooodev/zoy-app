import { useNotification } from '@/(shared)/(hooks)/useNotification'
import { Transition } from '@headlessui/react'
import classNames from 'classnames'

const Notification = () => {
  const {
    notificationState: { open, type, text },
    notify,
    closeNotification,
  } = useNotification()
  return (
    <Transition
      show={open}
      enter="transition ease-out"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
      className="fixed inset-x-0 bottom-10 z-50 mx-auto mr-[-2rem] w-2/3 md:w-1/3"
    >
      <div
        className={classNames(
          'mb-4 rounded-lg py-5 px-6 text-base',
          'border-2 border-solid',
          {
            'border-blue-700 bg-blue-100 text-blue-700': type === 'info',
            'border-yellow-600 bg-yellow-100 text-yellow-600': type === 'warn',
            'border-red-600 bg-red-100 text-red-600': type === 'error',
          }
        )}
        role="alert"
      >
        {text}
      </div>
    </Transition>
  )
}

export default Notification
