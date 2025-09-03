import { createClient } from "@/utils/supabase/server";

export async function POST (req: Request) {
    const supabase = createClient();
    const { data: { user }} = await (await supabase).auth.getUser();

    const { filePath } = await req.json()
    if (!user) {
        return new Response('Unauthorized', { status: 401 });
    }

    if (!filePath.startsWith(`${user.id}/${user.id}-`)) {
        return new Response('Forbidden', { status: 403 });
    }

    const { data, error } = await (await supabase)
        .storage
        .from('entry-photo')
        .createSignedUrl(filePath, 60 * 60)
    if (error) return Response.json({ error: error.message}, { status: 400 })


    return Response.json({ url: data.signedUrl })
}