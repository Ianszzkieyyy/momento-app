"use client"

import { useState, useEffect } from "react"
import CalendarStrip from "./callendar-strip"
import EmptyView from "./empty-view"
import DailyEntryWrapper from "./daily-entry-wrapper"
import { Entry } from "@/lib/types"


export default function DailyView() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [entries, setEntries] = useState<Entry[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const formatDate = (date: Date) => {
        return date.toISOString().slice(0, 10) // "YYYY-MM-DD"
    }

    useEffect(() => {
        setLoading(true)
        setError(null)
        const fetchEntries = async () => {
            await fetch (`/api/entries?date=${formatDate(selectedDate)}`)
            .then(res => res.json())
            .then(data => {
                setEntries(data.entries || [])
                setLoading(false)
            })
            .catch(() => {
                setError("Failed to fetch entries.")
                setLoading(false)
            })
        }
        fetchEntries()
    }, [selectedDate])


    return (
        <div className="flex flex-col h-full">
            <div className="flex-shrink-0">
                <CalendarStrip onDateSelect={setSelectedDate}/>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="flex flex-1 h-full flex-col items-center justify-center mt-4">
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-destructive">{error}</p>}
                    {!loading && !error && (entries.length === 0 ? 
                        <div>
                            <EmptyView />
                        </div> 
                    : (
                        <div className="w-full h-full md:px-8 lg:px-16 px-8 items-start">
                            {entries.map((entry) => (
                                <DailyEntryWrapper key={entry.id} entry={entry} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}