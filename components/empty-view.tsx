"use client"

import { useRouter } from "next/navigation";
import UploadImage from "./upload-image";

export default function EmptyView() {
    const router = useRouter();

    const handleUpload = (url: string, filePath: string) => {
        console.log("filePath", filePath);
        router.push(`/create?signedUrl=${encodeURIComponent(url)}&filePath=${encodeURIComponent(filePath || '')}`);
    }

    return (
        <UploadImage 
            onUpload={handleUpload} 
        />
    )
}