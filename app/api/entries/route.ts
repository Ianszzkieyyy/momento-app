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

    if (date) {
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

        const { data: tagsData, error: tagsError } = await supabase
            .from('entry_tags')
            .select('entry_id, tags(id, name)')
            .in('entry_id', entries?.map(e => e.id) || [])
        if (tagsError) {
            return NextResponse.json({ error: tagsError.message }, { status: 500 });
        }
        console.log("Tags Data:", tagsData);

        const entriesWithTags = (entries ?? []).map(entry => {
            const entryTags = tagsData?.filter(et => et.entry_id === entry.id).map(et => et.tags) || [];
            return { ...entry, tags: entryTags };
        })
        console.log("Entries with Tags:", entriesWithTags);

        const updatedEntries = await Promise.all(
            (entriesWithTags ?? []).map(async (entry) => {

                if (entry.image_url) {
                    const signedUrl = await generateSignedUrl(entry.image_url)
                    return { ...entry, image_url: signedUrl };
                }
                return { ...entry };
            })
        )

        console.log("Updated Entries:", updatedEntries);
        return NextResponse.json({ entries: updatedEntries });
    }

    return NextResponse.json({ error: "Missing date or id parameter" }, { status: 400 });
}