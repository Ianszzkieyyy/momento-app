"use client"

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Camera, User } from "lucide-react";
import { set } from "date-fns";

export default function EmptyView() {
    const [uploading, setUploading] = useState<boolean>(false);
    const [image, setImage] = useState<File | null>(null);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const supabase = createClient()
        const file = event.target.files?.[0]
        if (!file) return

        setUploading(true)

        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}-${Date.now()}.${fileExt}`
        const filePath = `entry-photo/${fileName}`

        const { error: uploadError } = await supabase.storage
            .from("entry-photo")
            .upload(filePath, file)
        if (uploadError) {
            console.error("Error uploading image: ", uploadError)
            setUploading(false)
        }

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