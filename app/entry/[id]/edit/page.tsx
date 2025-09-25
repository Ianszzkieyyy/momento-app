import EntryForm from "@/components/entry-form"
import getEntry from "@/utils/getEntry"
import { createClient } from "@/utils/supabase/server"

export default async function EditPage({ params }: { params: { id: string }}) {
    const supabase = createClient()
    const { data: { user } } = await (await supabase).auth.getUser()
    console.log("User in edit page:", user)

    const { data: tags, error: tagsError } = await (await supabase)
        .from('tags')
        .select('*')
        .eq('user_id', user?.id)
        .order('name', { ascending: true })
    if (tagsError) {
        console.error("Error fetching tags:", tagsError)
    }
    

    const { id } = await params
    const entry = await getEntry(id);
    return (
        <div>
            <EntryForm entry={entry} userTags={tags || []} />
        </div>
    )
}