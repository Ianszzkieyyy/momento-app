import { createClient } from "@/utils/supabase/client";

export async function POST (req: Request) {
    const supabase = await createClient();
    const { data: { user }} = await supabase.auth.getUser();

    if (!user) {
        return new Response('Unauthorized', { status: 401 });
    }

    const { filePath } = await req.json()
    if (!filePath.startsWith(`${user.id}/${user.id}-`)) {
        return new Response('Forbidden', { status: 403 });
    }

    const { data, error } = await supabase
        .storage
        .from('entry-photo')
        .createSignedUrl(filePath, 60 * 60)
    if (error) return Response.json({ error: error.message}, { status: 400 })
    
    return Response.json({ url: data.signedUrl })
}