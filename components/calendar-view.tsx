"use client"

import { Calendar } from "@/components/ui/calendar"
import { useRouter } from "next/navigation"
import { useState } from "react"
import formatDate from "@/utils/formatDate"

export default function CalendarView({ entryDates }: { entryDates: Date[] }) {
    const router = useRouter()
    const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date())

    const handleDateSelect = (date: Date | undefined) => {
        if (date) {
            const dateString = formatDate(date)
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