import { Message, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import {useDispatch, useSelector} from 'react-redux'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { signupSchema } from '@/lib/validations/auth'
//import { useAuthContext } from '@/contexts/AuthContext'
import { Spinner } from '@/components/ui/Spinner'
import { AppDispatch, RootState } from '@/redux/store'
import { OtpRequest, registerRequest } from '@/redux/Auth/authasync'
import { RejectedPayload } from '@/types'
import { toast } from '@/components/ui/Toast'
type SignupValues = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword?: string
}

export function SignUp() {
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const dispatch = useDispatch<AppDispatch>()
  const {loading} = useSelector((state: RootState) => state.auth.register);
  const navigate = useNavigate();
  function onSubmit({
    firstName,
    lastName,
    email,
    password
  }: SignupValues) {
   
   dispatch(registerRequest({
    firstName,
    lastName,
    email,
    password
   })).unwrap().then((res) =>{
    toast.success(res.message);
    dispatch(OtpRequest({email}));
    setTimeout(() =>{
      navigate('/verify', {state : email});
    }, 1000)
   }).catch((error: RejectedPayload) =>{
    toast.error(error.message as Message)
   })
  }
  
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create a new account to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Create a password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirm your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled ={loading}
              >{loading ? <Spinner /> : "Sign Up"}</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Link to="/login" className="text-sm text-primary hover:underline">
            Already have an account? Log in
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

