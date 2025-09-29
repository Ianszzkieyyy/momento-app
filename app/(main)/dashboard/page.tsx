import { createClient } from "@/utils/supabase/server"
import getEntryDates from "@/utils/getEntryDates"
import getFaveEntries from "@/utils/getFaveEntries"
import { CalendarHeatmap } from "@/components/ui/calendar-heatmap"

export default async function Dashboard() {
    const supabase = createClient()
    const { data: { user } } = await (await supabase).auth.getUser()
    const { entryDatesArray, entryDatesWeighted } = await getEntryDates()
    const faveEntries = await getFaveEntries()

    return (
        <div>
            Dashboard
            <CalendarHeatmap 
                weightedDates={entryDatesWeighted} 
                variantClassnames={[
                    "text-primary-foreground bg-primary/100", 
                    "text-primary-foreground bg-primary/80", 
                    "text-primary-foreground bg-primary/60", 
                    "text-primary-foreground bg-primary/40", 
                    "text-primary-foreground bg-primary/20"
                ]} 
                />
        </div>
    )
}