"use client"

import { useState, useEffect } from "react"
import CalendarStrip from "./callendar-strip"
import EmptyView from "./empty-page"
import Image from "next/image"

interface Entry {
    id: string,
    text: string,
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
        <div>
            <CalendarStrip onDateSelect={setSelectedDate}/>
            <div className="mt-4">
                {loading && <p>Loading...</p>}
                {error && <p className="text-destructive">{error}</p>}
                {!loading && !error && (entries.length === 0 ? <EmptyView /> : (
                    <div>
                        {entries.map(entry => (
                            <div key={entry.id} className="mb-6 p-4 border rounded-lg">
                                {entry.image_url && <Image src={entry.image_url} width={500} height={300} alt="Entry Image" className="mb-4 object-cover rounded-md" />}
                                <p className="whitespace-pre-wrap">{entry.text}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}