"use client"

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Camera } from "lucide-react";

export default function EmptyView() {
    const [uploading, setUploading] = useState<boolean>(false);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        const file = event.target.files?.[0]
        if (!file) return

        setUploading(true)

        const fileExt = file.name.split('.').pop()
        const fileName = `${user?.id}-${Date.now()}.${fileExt}`
        const filePath = `${user?.id}/${fileName}`

        const { error: uploadError } = await supabase.storage
            .from("entry-photo")
            .upload(filePath, file)
        if (uploadError) {
            console.error("Error uploading image: ", uploadError)
            setUploading(false)
        }

        console.log("File uploaded successfully:", filePath)
        setUploading(false)
    }

    return (
        <div>
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center gap-4 cursor-pointer hover:opacity-80 transition-opacity">
                <input id="file-upload" type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                <Camera className="w-24 h-24 text-secondary" />
                <h1>Take a quick moment...</h1>
                {uploading && <p>Uploading...</p>}
            </label>

        </div>
    )
}