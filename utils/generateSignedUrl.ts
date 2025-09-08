import { createClient } from "./supabase/server";

export async function generateSignedUrl(filePath: string): Promise<string | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .storage
        .from('entry-photo')
        .createSignedUrl(filePath, 60 * 60)

    if (error) {
        console.error("Error creating signed URL:", error.message);
        return null;
    }

    return data.signedUrl;
}