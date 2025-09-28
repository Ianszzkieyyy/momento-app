import getAllEntries from "@/utils/getAllEntries"
import GalleryEntry from "@/components/gallery-entry"

export default async function GalleryPage() {

    const entries = await getAllEntries()
    return (
        <div className="px-8 grid grid-cols-3 items-start">
            {entries.map((entry) => (
                <GalleryEntry key={entry.id} entry={entry} />
            ))}
        </div>
    )
}
