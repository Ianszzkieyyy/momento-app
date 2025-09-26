"use client"

import { Camera } from "lucide-react";
import { useImageUpload } from "@/hooks/use-image-upload";

type UploadImageProps = {
    onUpload: (url: string, filePath: string) => void
}

export default function UploadImage({ onUpload }: UploadImageProps) {
    const { uploading, handleFileChange } = useImageUpload(onUpload)

    return (
        <div>
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center gap-4 cursor-pointer hover:opacity-80 transition-opacity">
                <input
                    disabled={uploading} 
                    id="file-upload" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    className="hidden" />
                <Camera className="w-24 h-24 text-secondary" />
                <h1>Take a quick moment...</h1>
                {uploading && <p>Uploading image...</p>}
            </label>

        </div>
    )
}