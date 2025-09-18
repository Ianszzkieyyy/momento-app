import Image from "next/image"
import { createClient } from "@/utils/supabase/server"
import { generateSignedUrl } from "@/utils/generateSignedUrl"
import { notFound } from "next/navigation"

async function getEntry(id: string) {
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

export default async function EntryPage({ params }: { params: { id: string }}) {
    const entry = await getEntry(params.id);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{entry.title}</h1>
            {entry.image_url && (
                <div className="mb-4">
                    <Image 
                        src={entry.image_url} 
                        alt={entry.title} 
                        width={600}
                        height={400}
                        className="object-cover rounded-lg"
                    />
                </div>
            )}
            <p className="text-gray-700">{entry.text}</p>
        </div>
    )
}