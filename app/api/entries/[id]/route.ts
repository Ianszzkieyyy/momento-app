import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { generateSignedUrl } from "@/utils/generateSignedUrl";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    if (id) {
        const { data: entry, error: entryError } = await supabase
            .from("entries")
            .select("*")
            .eq("id", id)
            .single();
        if (entryError) {
            return NextResponse.json({ error: entryError.message }, { status: 500 });
        }
        if (!entry) {
            return NextResponse.json({ error: "Entry not found" }, { status: 404 });
        }

        const { data: tagsData, error: tagsError } = await supabase
            .from('entry_tags')
            .select('tags(id, name)')
            .eq('entry_id', id);
        if (tagsError) {
            return NextResponse.json({ error: tagsError.message }, { status: 500 });
        }

        const tags = tagsData?.map(t => t.tags) || []
        let signedUrl = null;
        if (entry.image_url) {
            signedUrl = await generateSignedUrl(entry.image_url)
        }

        const updatedEntry = { ...entry, tags, image_url: signedUrl };
        return NextResponse.json({ entry: updatedEntry });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const data = {
      title: formData.get('title') as string,
      text: formData.get('content') as string,
      tags: JSON.parse(formData.get('tags') as string) as string[],
    }
    const { id } = params;

    const { data: entry, error } = await supabase
      .from('entries')
      .update({title: data.title, text: data.text})
      .eq('id', id)
      .select()
      .single()
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data: upserted, error: upsertError } = await supabase
      .from('tags')
      .upsert(
        data.tags.map(tag => ({ name: tag, user_id: userData?.user.id })),
        { onConflict: "name" } 
      )
      .select()
    if (upsertError) {
        return NextResponse.json({ error: upsertError.message }, { status: 500 });
    }

    if (upserted) {
      const rows = upserted.map((t) => ({
        entry_id: entry.id,
        tag_id: t.id,
      }));
      await supabase.from("entry_tags").insert(rows);
    }

    return NextResponse.json({ success: true });



    
}