import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export default async function CreatePage() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return (
        <div>
            <h1>Create a new post</h1>
        </div>
    )
}