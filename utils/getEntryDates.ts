import { createClient } from "@/utils/supabase/server";
import formatDate from "./formatDate";

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

    const entryDatesArray = entryDates?.map(entry => new Date(entry.created_at)) || []
    const dateCountMap = entryDatesArray.reduce((acc, date) => {
        const dateString = formatDate(date)
        acc[dateString] = (acc[dateString] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    const entryDatesWeighted = Object.entries(dateCountMap).map(([date, count]) => ({
        date: new Date(date),
        weight: count
    }))

    return { entryDatesArray, entryDatesWeighted }

}