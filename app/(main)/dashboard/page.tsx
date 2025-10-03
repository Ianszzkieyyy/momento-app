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
        <div>
            dashboard
            <Heatmap weightedDates={entryDatesWeighted} colors={["#ebeae6", "#d4c89a4d", "#d4c89a99", "#d4c89a", "#b85c00"]} />
        </div>
    )
}