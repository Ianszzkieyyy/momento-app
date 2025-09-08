"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadImage from "./upload-image";

export default function EmptyView() {
    const [uploading, setUploading] = useState<boolean>(false);
    const router = useRouter();

    const handleUpload = (url: string, filePath: string) => {
        console.log("filePath", filePath);
        router.push(`/create?signedUrl=${encodeURIComponent(url)}&filePath=${encodeURIComponent(filePath || '')}`);
    }

    return (
        <UploadImage 
            onUpload={handleUpload} 
            uploading={uploading} 
            setUploading={setUploading} 
        />
    )
}