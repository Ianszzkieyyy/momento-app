"use client"

import { login } from '../auth/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from "react-hook-form"
import Link from 'next/link'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
})

async function onSubmit(data: z.infer<typeof formSchema>) {
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('password', data.password);
  await login(formData)
}

export default function LoginPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
   })


  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
      <h1 className='text-3xl'>momento</h1>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle className='text-center font-bold'>Log in to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='mb-6'>
                <FormField 
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="name@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='mb-8'>
                <FormField 
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex flex-row justify-between items-center mt-4'>
                <Button type='submit'>Log In</Button>
                <Button asChild variant="link">
                  <Link href="/signup">Don&apos;t have an account? Sign Up</Link>
                </Button>
              </div>
            </form>
          </Form>

        </CardContent>
      </Card>   
    </div>
  )
}