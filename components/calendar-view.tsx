"use client"

import { Calendar } from "@/components/ui/calendar"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CalendarView({ entryDates }: { entryDates: Date[] }) {
    const router = useRouter()
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date())

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            const year = date.getFullYear()
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const day = String(date.getDate()).padStart(2, '0')
            const dateString = `${year}-${month}-${day}`
            router.push(`/calendar?date=${dateString}`)
            setSelectedDay(date)
        }
        else {
            router.push(`/calendar`)
        }
    }

    return (
        <div className="flex justify-center">
            <Calendar 
                entryDates={entryDates}
                mode="single"
                selected={selectedDay}
                onSelect={handleDateSelect}
                className="w-screen lg:w-sm px-8"
                showOutsideDays={false}
                buttonVariant="ghost"
            />       
        </div>

    )
}