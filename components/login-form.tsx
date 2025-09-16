"use client"

import { login } from '@/app/auth/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from "react-hook-form"
import Link from 'next/link'

import GoogleOAuthButton from '@/components/google-button'
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
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(100),
})

async function onSubmit(data: z.infer<typeof formSchema>) {
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('password', data.password);
  await login(formData)
}

export default function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
   })

  return (
    <div className='flex flex-col w-lg items-center justify-center min-h-screen gap-4'>
      <h1 className='text-3xl'>momento</h1>
      <Card className='w-full max-w-sm'>
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
                        <Input type="password" placeholder="********" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type='submit' className='w-full mb-2'>Log In</Button>
            </form>
          </Form>
          <div className='flex flex-col gap-2 items-center'>
            <div className='text-xs text-muted-foreground/50'>──────── <span className='font-bold'>  Or  </span> ────────</div>
            <GoogleOAuthButton />
            <Button asChild variant="link">
              <Link href="/signup">Don&apos;t have an account? Sign Up</Link>
            </Button>
          </div>
        </CardContent>
      </Card>   
    </div>
  )
}
