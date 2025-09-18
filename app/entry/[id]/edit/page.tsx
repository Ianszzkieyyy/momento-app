import EntryForm from "@/components/entry-form"
import getEntry from "@/utils/getEntry"

export default async function EditPage({ params }: { params: { id: string }}) {
    const entry = await getEntry(params.id);
    return (
        <div>
            <EntryForm entry={entry} />
        </div>
    )
}