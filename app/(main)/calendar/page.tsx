import CalendarView from "@/components/calendar-view"
import ListView from "@/components/list-view"
import { createClient } from "@/utils/supabase/server"

export default async function CalendarPage() {
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
    return (
        <div className="md:w-full md:flex-row flex flex-col gap-4 h-full overflow-hidden md:justify-center md:items-center">
            <CalendarView entryDates={entryDatesArray} />
            <ListView />
        </div>
    )
}