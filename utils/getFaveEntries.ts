import { createClient } from "./supabase/server";

export default async function getFaveEntries() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    const { data: entries, error: entriesError } = await supabase
        .from('entries')
        .select('*')
        .eq('user_id', user?.id)
        .eq('is_favorite', true)
        .order('created_at', { ascending: false })
    if (entriesError) {
        console.error('Error fetching favorite entries:', entriesError)
        return []
    }
    return entries || []
}