import { createClient } from "@/utils/supabase/server"
import getEntryDates from "@/utils/getEntryDates"
import { getAllEntries } from "@/utils/getAllEntries"
import Heatmap from "@/components/heatmap"
import DailyEntryWrapper from "@/components/daily-entry-wrapper"

export default async function Dashboard() {
    const supabase = createClient()
    const { data: { user } } = await (await supabase).auth.getUser()
    const { entryDatesArray, entryDatesWeighted } = await getEntryDates()
    const faveEntries = await getAllEntries({ isFavorite: true })

    return (
        <div className="flex flex-col h-full w-full items-center px-8">
            <div className="w-full border-border border-2 rounded-lg px-4 py-2">
                <Heatmap weightedDates={entryDatesWeighted} colors={["#f7f6f3", "#d4c89a4d", "#d4c89a99", "#d4c89a", "#b85c00"]} />
            </div>
            <div className="w-full mt-8">
                <h2 className="text-2xl font-bold mb-4">Favorite Entries</h2>
                {faveEntries.length === 0 && <p className="text-muted-foreground">No favorite entries yet.</p>}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {faveEntries.map((entry) => (
                        <DailyEntryWrapper key={entry.id} entry={entry} />
                    ))}
                </div>
            </div>
        </div>
    )
}