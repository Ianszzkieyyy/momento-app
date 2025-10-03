import { createClient } from "@/utils/supabase/server"
import getEntryDates from "@/utils/getEntryDates"
import getFaveEntries from "@/utils/getFaveEntries"

export default async function Dashboard() {
    const supabase = createClient()
    const { data: { user } } = await (await supabase).auth.getUser()
    const { entryDatesArray, entryDatesWeighted } = await getEntryDates()
    const faveEntries = await getFaveEntries()

    return (
        <div>
            Dashboard
        </div>
    )
}