"use client"

import { Camera } from "lucide-react";

export default function EmptyView() {
    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {

    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 min-h-screen">
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center gap-4 cursor-pointer hover:opacity-80 transition-opacity">
                <input id="file-upload" type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                <Camera className="w-24 h-24 text-muted-foreground" />
                <h1>Take a quick moment...</h1>
            </label>

        </div>
    )
}