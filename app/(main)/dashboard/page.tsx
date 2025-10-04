import { createClient } from "@/utils/supabase/server"
import getEntryDates from "@/utils/getEntryDates"
import getFaveEntries from "@/utils/getFaveEntries"
import Heatmap from "@/components/heatmap"

export default async function Dashboard() {
    const supabase = createClient()
    const { data: { user } } = await (await supabase).auth.getUser()
    const { entryDatesArray, entryDatesWeighted } = await getEntryDates()
    const faveEntries = await getFaveEntries()

    return (
        <div className="flex flex-col h-full w-full items-center px-8">
            <div className="w-full border-border border-2 rounded-lg px-4 py-2">
                <Heatmap weightedDates={entryDatesWeighted} colors={["#f7f6f3", "#d4c89a4d", "#d4c89a99", "#d4c89a", "#b85c00"]} />
            </div>
        </div>
    )
}