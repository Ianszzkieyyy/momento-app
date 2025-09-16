import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { generateSignedUrl } from "@/utils/generateSignedUrl";



export async function GET(req: NextRequest) {
    const supabase = await createClient();
    const date = req.nextUrl.searchParams.get("date");

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const startDate = `${date} 00:00:00`;
    const endDate = `${date} 23:59:59`;

    const { data: entries, error: entriesError } = await supabase
        .from("entries")
        .select('*')
        .eq('user_id', userData.user.id)
        .gte('created_at', startDate)
        .lt('created_at', endDate)
    if (entriesError) {
        return NextResponse.json({ error: entriesError.message }, { status: 500 });
    }

    const entryIds = entries?.map(entry => entry.id) || [];

    const { data: entryTagsData, error: entryTagsError } = await supabase
        .from('entry_tags')
        .select(`
            entry_id,
            tags (id, name)   
        `)
        .in('entry_id', entryIds)
        .eq('user_id', userData.user.id)
    if (entryTagsError) {
        return NextResponse.json({ error: entryTagsError.message }, { status: 500 });
    }

    const entryTagsMap = new Map();
    (entryTagsData ?? []).forEach(({ entry_id, tags }) => {
        if (!entryTagsMap.has(entry_id)) {
            entryTagsMap.set(entry_id, []);
        }
        if (tags) {
            entryTagsMap.get(entry_id)?.push(tags);
        }
    })


    const updatedEntries = await Promise.all(
        (entries ?? []).map(async (entry) => {
            const tags = entryTagsMap.get(entry.id) || [];

            if (entry.image_url) {
                const signedUrl = await generateSignedUrl(entry.image_url)
                return { ...entry, image_url: signedUrl, tags };
            }
            return { ...entry, tags };
        })
    )


    return NextResponse.json({ entries: updatedEntries });
}