import { createClient } from "./supabase/client";

export default async function handleUploadImage(
    event: React.ChangeEvent<HTMLInputElement>,
    setUploading: (uploading: boolean) => void,
    onUploadComplete: (url: string | null, filePath: string | null) => void,
) {
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

    const response = await fetch('/api/generate-signed', {
        method: 'POST',
        body: JSON.stringify({ filePath: filePath }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (!response.ok) {
        console.error("Error creating image record: ", response.statusText)
    }

    const data = await response.json()
    onUploadComplete(data.url, filePath)
    console.log("Signed URL: ", data.url)
}