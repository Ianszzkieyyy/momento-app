import { createClient } from "./supabase/server";
import { generateSignedUrl } from "./generateSignedUrl";
import { cache } from 'react';

export const getAllEntries = cache(async () => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { data: entries, error: entriesError } = await supabase
        .from('entries')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
    if (entriesError) {
        console.error('Error fetching entries: ', entriesError)
        return []
    }

    const { data: tagsData, error: tagsError } = await supabase
        .from('entry_tags')
        .select('entry_id, tags(id, name)')
        .in('entry_id', entries?.map(e => e.id) || [])
    if (tagsError) {
        console.error('Error fetching tags: ', tagsError)
        return entries || []
    }

    const entriesWithTags = (entries ?? []).map(entry => {
        const entryTags = tagsData?.filter(et => et.entry_id === entry.id).map(et => et.tags) || []
        return { ...entry, tags: entryTags }
    })

    const updatedEntries = await Promise.all(
        (entriesWithTags ?? []).map(async (entry) => {
            if (entry.image_url) {
                const signedUrl = await generateSignedUrl(entry.image_url)
                return { ...entry, image_url: signedUrl }
            }
            return { ...entry };
        })
    )

    return updatedEntries
})