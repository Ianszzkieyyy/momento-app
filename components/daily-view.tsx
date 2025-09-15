"use client"

import { useState, useEffect } from "react"
import CalendarStrip from "./callendar-strip"
import EmptyView from "./empty-view"
import DailyEntry from "./daily-entry"

interface Entry {
    id: string,
    text: string,
    title: string,
    image_url: string,
}

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
            <CalendarStrip onDateSelect={setSelectedDate}/>
            <div className="flex flex-1 flex-col items-center justify-center mt-4">
                {loading && <p>Loading...</p>}
                {error && <p className="text-destructive">{error}</p>}
                {!loading && !error && (entries.length === 0 ? 
                    <div>
                        <EmptyView />
                    </div> 
                : (
                    <div>
                        {entries.map((entry, idx) => (
                            <DailyEntry key={idx} entry={entry}/>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}