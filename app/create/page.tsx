"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
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

import Image from 'next/image'
import TagsSelector from "@/components/tags-selector"
import UploadImage from "@/components/upload-image"

const formSchema = z.object({
    content: z.string().min(1, "Content is required").max(200, "Content must be at most 200 characters"),
    image: z.url({ message: "Invalid image URL" }),
    tags: z.array(z.string()).min(0),
})

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
            image: decodedUrl || '',
            tags: [],
        }
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const formData = new FormData();
        formData.append('content', data.content);
        formData.append('image', data.image);
        formData.append('tags', JSON.stringify(data.tags));
        const res = await fetch('/api/create-moment', {
            method: 'POST',
            body: formData,
        })
        if (res.ok) {
            window.location.href = '/';
        } else {
            const errorData = await res.json();
            console.error('Error creating moment:', errorData.error);
        }
    }

    useEffect(() => {
        if (decodedUrl) {
            form.setValue('image', decodedUrl);
        }
    }, [decodedUrl, form]);

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
                        <form onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}>
                            {!decodedUrl ? (
                                <div className="border-4 border-dashed border-border rounded-md p-16 mb-4">
                                    <UploadImage 
                                        onUpload={setUrl} 
                                        uploading={uploading} 
                                        setUploading={setUploading} 
                                    />
                                </div>

                            ) : 
                            <div className="mb-4">
                                <Image src={decodedUrl} alt="Uploaded Image" width={300} height={300} className="rounded-md" />
                            </div>
                            }
                            <FormField 
                                control={form.control}
                                name="tags"
                                render={() => (
                                    <FormItem>
                                        <FormControl>
                                            <TagsSelector form={form} name="tags" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                            <Button type="submit" className="mt-4 w-full cursor-pointer" disabled={!decodedUrl || uploading}>{uploading ? 'Uploading...' : 'Create Momento'}</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}