import { Toast } from '@/components/ui/Toast'
import React from 'react'
import { Toaster } from 'react-hot-toast'
Toast

export const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <Toaster position="top-right">
        {(t) => <Toast t={t} message={t.message as string} />}
      </Toaster>
    </>
  )
}

