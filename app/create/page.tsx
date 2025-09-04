"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import handleUploadImage from "@/utils/upload";

import { Camera } from "lucide-react";

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

    const [uploading, setUploading] = useState<boolean>(false);
    const [url, setUrl] = useState<string | null>(decodedUrl);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: '',
            image: decodedUrl || ''
        }
    });

    useEffect(() => {
        if (url) {
            router.replace(`/create?signedUrl=${encodeURIComponent(url)}`);
        }
    }, [url, router])

    return (
        <div>
            <Card>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            {!decodedUrl ? (
                                <div className="border-4 border-dashed border-border rounded-md p-16 mb-4">
                                    <label htmlFor="file-upload" className="flex flex-col items-center justify-center gap-4 cursor-pointer hover:opacity-80 transition-opacity">
                                        <input id="file-upload" type="file" accept="image/*" onChange={e => handleUploadImage(e, setUploading, setUrl)} className="hidden" />
                                        <Camera className="w-24 h-24 text-secondary" />
                                        <h1>Take a quick moment...</h1>
                                        {uploading && <p>Uploading...</p>}
                                    </label>
                                </div>

                            ) : 
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
                                        <FormMessage />
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