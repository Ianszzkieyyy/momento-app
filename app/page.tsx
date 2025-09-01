import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import CalendarStrip from '@/components/callendar-strip'

export default async function Home() {

    const supabase = await createClient()
  
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      redirect('/login')
    }

  return (
    <div>
      <CalendarStrip />
    </div>


  );
}
