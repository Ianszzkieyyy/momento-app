"use client"

import { useState, useEffect } from "react";
import  handleUploadImage  from "@/utils/upload";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmptyView() {
    const [uploading, setUploading] = useState<boolean>(false);
    const [signedUrl, setSignedUrl] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (signedUrl) {
            router.push(`/create?signedUrl=${encodeURIComponent(signedUrl)}`);
        }
    }, [signedUrl, router])

    return (
        <div>
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center gap-4 cursor-pointer hover:opacity-80 transition-opacity">
                <input id="file-upload" type="file" accept="image/*" onChange={e => handleUploadImage(e, setUploading, setSignedUrl)} className="hidden" />
                <Camera className="w-24 h-24 text-secondary" />
                <h1>Take a quick moment...</h1>
                {uploading && <p>Uploading...</p>}
            </label>

        </div>
    )
}