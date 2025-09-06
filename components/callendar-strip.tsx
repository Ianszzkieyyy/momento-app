"use client"

import { useState, useRef } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { format, subDays, isToday, isSameDay } from "date-fns"

export default function CalendarStrip({ onDateSelect }: { onDateSelect?: (date: Date) => void}) {
    const today = new Date()
    const days = Array.from({ length: 30 }, (_, i) => subDays(today, i)).reverse()
    const [selectedDate, setSelectedDate] = useState<Date>(today);
    const dayRefs = useRef<(HTMLButtonElement | null)[]>([])

    const handleDayClick = (day: Date, idx: number) => {
        setSelectedDate(day);
        onDateSelect?.(day);
        dayRefs.current[idx]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }

    return (
        <div className="relative w-full max-w-dvw sm:max-w-md md:max-w-lg lg:max-w-xl">
            <ScrollArea className="w-full">
                <div className="flex gap-4 p-4">
                    {days.map((day, idx) => {
                        const todayFlag = isToday(day)
                        const selectedFlag = isSameDay(day, selectedDate);
                        return (
                            <Button 
                                ref={el => {dayRefs.current[idx] = el}}
                                className={`text-accent rounded-2xl ${todayFlag ? "border-2 border-primary" : ""} ${selectedFlag ? "bg-primary text-primary-foreground" : ""}`} 
                                key={idx} 
                                size={"lgicon"} 
                                variant={selectedFlag ? "default" : "outline"} 
                                onClick={() => {
                                    handleDayClick(day, idx);
                                }}>
                                <div>
                                    <p className="font-bold text-xs tracking-wider">{format(day, "EEE").toUpperCase()}</p>
                                    <p className="text-xl">{format(day, "d")}</p>
                                </div>
                            </Button>
                        )
                    })}
                </div>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-background/80 from-0% via-background/80 via-10% to-transparent to-20%" />
            <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}