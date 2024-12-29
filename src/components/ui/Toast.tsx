import React from 'react'
import { Toast as HotToast, ToastBar, toast as hotToast } from 'react-hot-toast'
import { X } from 'lucide-react'

interface ToastProps {
  t: HotToast
  message: string
}

export const Toast: React.FC<ToastProps> = ({ t, message }) => {
  return (
    <ToastBar toast={t}>
      {({ icon, message: toastMessage }) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <div className="flex-1 p-4 w-full">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">{icon}</div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">{message || toastMessage}</p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => hotToast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </ToastBar>
  )
}

export const toast = hotToast

