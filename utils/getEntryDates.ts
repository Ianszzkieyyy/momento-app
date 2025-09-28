import { createClient } from "@/utils/supabase/server";

export default async function getEntryDates() {
    const supabase = createClient()
    const { data: { user} } = await (await supabase).auth.getUser()
    const { data: entryDates, error: entryDatesError } = await (await supabase)
        .from('entries')
        .select('created_at')
        .eq('user_id', user?.id)
    if (entryDatesError) {
        console.error(entryDatesError)
    }

    return entryDates?.map(entry => new Date(entry.created_at)) || []

}