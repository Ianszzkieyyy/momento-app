"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { Entry } from "@/lib/types" 

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { MultiSelect, MultiSelectContent, MultiSelectGroup, MultiSelectItem, MultiSelectTrigger, MultiSelectValue } from "@/components/ui/multi-select"
import { useUserTags } from "@/hooks/use-user-tags"

const formSchema = z.object({
    title: z.string().min(1, "Title is required").max(70, "Title must be at most 70 characters"),
    content: z.string().min(1, "Content is required").max(200, "Content must be at most 200 characters"),
    image: z.url({ message: "Invalid image URL" }).optional(),
    tags: z.array(z.string()).min(0),
})



export default function EditForm({ entry }: { entry: Entry }) {
    const [uploading, setUploading] = useState<boolean>(false);
    const router = useRouter();
    const { tags: userTags } = useUserTags();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

        defaultValues: {
            title: entry.title || '',
            content: entry.text || '',
            image: entry.image_url || '',
            tags: entry.tags?.map(tag => tag.name) || [], 
        }
    });

    

    async function onSubmit(data: z.infer<typeof formSchema>) {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('tags', JSON.stringify(data.tags));

        setUploading(true);
        const res = await fetch(`/api/entries/${entry.id}`, {
            method: 'PUT',
            body: formData,
        });

        if (res.ok) {
            router.push(`/entry/${entry.id}`);
            router.refresh(); 
            setUploading(false);
        } else {
            const errorData = await res.json();
            console.error('Error updating moment:', errorData.error);
        }
    }

    return (
        <div className="w-full max-w-sm mx-auto px-4 py-8">
            <Card>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="mb-4">
                                <Image src={entry.image_url} alt="Uploaded Image" width={300} height={300} className="rounded-md" />
                            </div>
                            <FormField 
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Select Tags</FormLabel>
                                        <MultiSelect
                                            onValuesChange={(field.onChange)}
                                            values={field.value || []}
                                        >
                                            <FormControl>
                                                <MultiSelectTrigger className="w-full">
                                                    <MultiSelectValue placeholder="Select tags" />
                                                </MultiSelectTrigger>
                                            </FormControl>
                                            <MultiSelectContent
                                                allowCreate={true}
                                                createLabel="Create tag"
                                                search={{ 
                                                    placeholder: "Search or create tags...",
                                                    emptyMessage: "No tags found." 
                                                }}
                                            >
                                                <MultiSelectGroup>
                                                    {/* Map tags associated with the user */}
                                                    {userTags?.map((tag) => (
                                                        <MultiSelectItem key={tag.id} value={tag.name}>
                                                            {tag.name}
                                                        </MultiSelectItem>
                                                    ))}
                                                    
                                                </MultiSelectGroup>
                                            </MultiSelectContent>
                                        </MultiSelect>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <Textarea className="resize-none h-32 w-full min-w-0" placeholder="What's on your mind?" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="mt-4 w-full" disabled={uploading}>
                                {uploading ? 'Uploading...' : 'Update Momento'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}