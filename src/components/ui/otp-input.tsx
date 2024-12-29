import React, { useState, useRef, KeyboardEvent, ClipboardEvent } from 'react'
import { Input } from "@/components/ui/input"

interface OtpInputProps {
  length: number
  value: string
  onChange: (value: string) => void
}

export function OtpInput({ length, value, onChange }: OtpInputProps) {
  const [otp, setOtp] = useState(value.padEnd(length, ' ').split(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = e.target.value
    if (newValue.length > 1) return // Prevent pasting multiple characters into a single input

    const newOtp = [...otp]
    newOtp[index] = newValue
    setOtp(newOtp)
    onChange(newOtp.join('').trim())

    if (newValue && index < length - 1) {
      focusInput(index + 1)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      focusInput(index - 1)
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length)
    const newOtp = pastedData.padEnd(length, ' ').split('').slice(0, length)
    setOtp(newOtp)
    onChange(newOtp.join('').trim())
    focusInput(Math.min(pastedData.length, length - 1))
  }

  return (
    <div className="flex gap-2">
      {otp.map((digit, index) => (
        <Input
          key={index}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={digit === ' ' ? '' : digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          ref={(el) => (inputRefs.current[index] = el)}
          className="w-12 h-12 text-center text-lg"
        />
      ))}
    </div>
  )
}

