import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { format, subDays, isToday } from "date-fns"

export default function CalendarStrip() {
    const today = new Date()
    const days = Array.from({ length: 30 }, (_, i) => subDays(today, i)).reverse();

    return (
        <div className="relative w-full max-w-dvw sm:max-w-md md:max-w-lg lg:max-w-xl">
            <ScrollArea className="w-full">
                <div className="flex gap-4 p-4">
                    {days.map((day, idx) => {
                        const todayFlag = isToday(day)
                        return (
                            <Button className="text-accent rounded-2xl" key={idx} size={"lgicon"} variant={todayFlag ? "default" : "outline"}>
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