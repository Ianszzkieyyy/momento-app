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
        .lt('created_at', endDate);
    if (entriesError) {
        return NextResponse.json({ error: entriesError.message }, { status: 500 });
    }

    // replace response image_url with signed urls
    const updatedEntries = await Promise.all(
        entries.map(async (entry) => {
            if (entry.image_url) {
                const signedUrl = await generateSignedUrl(entry.image_url)
                return { ...entry, image_url: signedUrl }
            }
            return entry
        })
    )

    return NextResponse.json({ entries: updatedEntries });
}