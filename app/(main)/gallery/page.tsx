import { getAllEntries } from "@/utils/getAllEntries"
import GalleryEntry from "@/components/gallery-entry"
import Link from "next/link"

export default async function GalleryPage() {

    const entries = await getAllEntries()
    return (
        <div className="h-full grid grid-cols-3 overflow-scroll">
            {entries.map((entry) => (
                <Link href={`/entry/${entry.id}`} prefetch={true} key={entry.id} className="relative w-full h-full aspect-square hover:opacity-80 transition-opacity ease-in-out">
                    <GalleryEntry entry={entry} />
                </Link>
            ))}
        </div>
    )
}
