import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server"

export async function GET() {
    const supabase = createClient();
    const { data: { user } } = await (await supabase).auth.getUser();
    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: tags, error: tagsError } = await (await supabase)
        .from("tags")
        .select("*")
        .eq("user_id", user.id)
        .order("name", { ascending: true });
    if (tagsError) {
        return NextResponse.json({ error: tagsError.message }, { status: 500 });
    }

    return NextResponse.json({ tags: tags || [] })
} 