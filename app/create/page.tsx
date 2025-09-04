"use client"

import { useSearchParams } from "next/navigation"
import Image from 'next/image'
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from "react-hook-form"

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

const formSchema = z.object({
    content: z.string().min(1, "Content is required").max(200, "Content must be at most 200 characters"),
    image: z.url({ message: "Invalid image URL" }).refine(
        (url) => /\.(jpg|jpeg|png|gif|webp|svg|heic)$/i.test(url),
        { message: "URL must point to an image file" }
    )
})

async function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('image', data.image);
}

export default function CreatePage() {
    const searchParams = useSearchParams();
    const signedUrl = searchParams.get("signedUrl");
    const decodedUrl = signedUrl ? decodeURIComponent(signedUrl) : null;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: '',
            image: decodedUrl || ''
        }
    });

    return (
        <div>
            <Card>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            {!decodedUrl ? <FormField 
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Image URL</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Enter image URL" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            /> : 
                            <div className="mb-4">
                                <Image src={decodedUrl} alt="Uploaded Image" width={300} height={300} className="rounded-md" />
                            </div>
                            }
                            <FormField 
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea className="resize-none h-32" placeholder="What's on your mind?" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="mt-4 w-full">Create Momento</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}