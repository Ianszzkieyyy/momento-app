import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
    const supabase = await createClient()
    const { data: { user }} = await supabase.auth.getUser();

    const formData = await req.formData();
    const data = {
      title: formData.get('title') as string,
      text: formData.get('content') as string,
      image_url: formData.get('image') as string,
      tags: JSON.parse(formData.get('tags') as string) as string[],
    }
    const { data: entry, error } = await supabase
      .from('entries')
      .insert({title: data.title, text: data.text, image_url: data.image_url, user_id: user?.id})
      .select()
      .single()
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data: upserted, error: upsertError } = await supabase
      .from('tags')
      .upsert(
        data.tags.map(tag => ({ name: tag, user_id: user?.id })),
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