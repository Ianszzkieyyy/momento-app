"use client"

import  handleUploadImage  from "@/utils/upload";
import { Camera } from "lucide-react";

type UploadImageProps = {
    onUpload: (url: string, filePath: string) => void
    uploading: boolean
    setUploading: (v: boolean) => void
}

export default function UploadImage({ onUpload, uploading, setUploading }: UploadImageProps) {
    return (
        <div>
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center gap-4 cursor-pointer hover:opacity-80 transition-opacity">
                <input 
                    id="file-upload" 
                    type="file" 
                    accept="image/*" 
                    onChange={e => handleUploadImage(
                        e, 
                        setUploading, 
                        (url: string | null, filePath: string | null) => {
                            if (url && filePath) {
                                onUpload(url, filePath)
                            }
                        }
                        
                    )} 
                    className="hidden" />
                <Camera className="w-24 h-24 text-secondary" />
                <h1>Take a quick moment...</h1>
                {uploading && <p>Uploading...</p>}
            </label>

        </div>
    )
}