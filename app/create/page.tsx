import CreateForm from "@/components/create-form";
import { createClient } from "@/utils/supabase/server";

type CreatePageProps = {
    searchParams: { [key: string]: string | string[] | undefined };
}

export default async function CreatePage({ searchParams }: CreatePageProps) {
    const signedUrl = searchParams.signedUrl as string | undefined;
    const filePath = searchParams.filePath as string | undefined;

    const supabase = createClient()

    const { data: { user } } = await (await supabase).auth.getUser()
    if (!user) {
        throw new Error("User not authenticated");
    }

    const { data: tags, error: tagsError } = await (await supabase)
        .from('tags')
        .select('*')
        .eq('user_id', user?.id)
        .order('name', { ascending: true })
    if (tagsError) {
        console.error("Error fetching tags:", tagsError)
    }

    return <CreateForm signedUrl={signedUrl} filePath={filePath} userTags={tags || []} />
}