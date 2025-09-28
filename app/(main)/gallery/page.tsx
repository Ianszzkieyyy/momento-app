import getAllEntries from "@/utils/getAllEntries"
import Image from "next/image"

export default async function GalleryPage() {

    const entries = await getAllEntries()
    return (
        <div>
            {entries.map((entry) => (
                <div key={entry.id}>
                    <Image src={entry.image_url} alt={entry.title} width={500} height={300} />
                    <h2>{entry.title}</h2>
                    <p>{entry.text}</p>
                    <p>{new Date(entry.created_at).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    )
}