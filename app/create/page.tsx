"use client"

import { useSearchParams } from "next/navigation"
import Image from 'next/image'
import { Textarea } from "@/components/ui/textarea";

export default function CreatePage() {
    const searchParams = useSearchParams();
    const signedUrl = searchParams.get("signedUrl");
    const decodedUrl = signedUrl ? decodeURIComponent(signedUrl) : null;

    return (
        <div>
            <h1>Create a new post</h1>
            {decodedUrl && (
                <Image src={decodedUrl} alt="Uploaded Image" width={300} height={300} />
            )}
            <Textarea placeholder="Write your post content here..." />
        </div>
    )
}