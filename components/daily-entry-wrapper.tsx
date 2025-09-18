"use client"

import Link from "next/link"
import DailyEntry from "./daily-entry"
import { Entry } from "@/lib/types"

export default function DailyEntryWrapper({ entry }: {entry : Entry}) {
    return (
        <Link href={`/entry/${entry.id}`}>
            <DailyEntry entry={entry} />
        </Link>
    )
}
