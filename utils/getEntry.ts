import { createClient } from "./supabase/server";
import { generateSignedUrl } from "./generateSignedUrl";
import { notFound } from "next/navigation";

export default async function getEntry(id: string) {
    const supabase = await createClient()
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
        throw new Error("Unauthorized")
    }

    const { data: entry, error } = await supabase
        .from("entries")
        .select("*")
        .eq("id", id)
        .eq("user_id", userData.user.id)
        .single();

    if (error || !entry) {
        notFound()
    }

    // Fetch tags
    const { data: tagsData } = await supabase
        .from('entry_tags')
        .select('tags(id, name)')
        .eq('entry_id', id)

    const tags = tagsData?.map(t => t.tags) || []
    let signedUrl = entry.image_url

    if (entry.image_url) {
        signedUrl = await generateSignedUrl(entry.image_url)
    }

    return { ...entry, tags, image_url: signedUrl };
}