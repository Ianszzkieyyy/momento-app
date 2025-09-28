import { Calendar } from "@/components/ui/calendar"
import { createClient } from "@/utils/supabase/server"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

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
        <ScrollArea className="overflow-y-clip h-full">
            <Calendar 
                mode="single"
                numberOfMonths={12}
                className="w-screen lg:w-sm px-8"
                showOutsideDays={false}
                buttonVariant="ghost"
                entryDates={entryDatesArray}
            />
            <ScrollBar orientation={"vertical"} />
        </ScrollArea>
    )
}