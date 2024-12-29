import  { useState, useEffect } from 'react'
import { Message, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { OtpInput } from "@/components/ui/otp-input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { verifyAccountSchema } from '@/lib/validations/auth'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { OtpRequest, verifyOtpRequest } from '@/redux/Auth/authasync'
import toast from 'react-hot-toast'
import { RejectedPayload } from '@/types'
import { Spinner } from '@/components/ui/Spinner'

type VerifyAccountValues = {
  otp: string
}

export function VerifyAccount() {
  const location = useLocation();
  const [countdown, setCountdown] = useState(30)
  const [isResendDisabled, setIsResendDisabled] = useState(true)
  const form = useForm<VerifyAccountValues>({
    resolver: zodResolver(verifyAccountSchema),
    defaultValues: {
      otp: "",
    },
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate()
  const email = location.state;
  const {loading} = useSelector((state:RootState) => state.auth.verifyOtp)
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer)
          setIsResendDisabled(false)
          return 0
        }
        return prevCountdown - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  function onSubmit(values: VerifyAccountValues) {
    const {otp} = values
    // TODO: Implement account verification logic
    dispatch(verifyOtpRequest({otp,email})).then(() =>{
      toast.success('Email verified');
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    }).catch((error: RejectedPayload) =>{
      toast.error(error.message as Message)
     })
  }
  function handleResendCode() {
    setIsResendDisabled(true); // Disable the button immediately
    dispatch(OtpRequest({ email }))
      .then(() => {
        toast.success('OTP sent successfully');
        setCountdown(30); // Reset countdown only on success
      })
      .catch((error: RejectedPayload) => {
        toast.error(error.message || 'Failed to resend OTP. Please try again.');
        setIsResendDisabled(false); // Re-enable button in case of an error
      });
  }
  

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Verify Account</CardTitle>
          <CardDescription>Enter the 6-digit verification code sent to your email</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <OtpInput
                        length={6}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled ={loading} className="w-full">{
                loading ? <Spinner /> : "Verify Account"}</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button
            variant="link"
            onClick={handleResendCode}
            disabled={isResendDisabled}
          >
            Resend Code
          </Button>
          {isResendDisabled && (
            <span className="text-sm text-muted-foreground">
              Resend in {countdown}s
            </span>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

