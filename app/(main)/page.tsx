import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { SidebarTrigger } from '@/components/ui/sidebar'
import DailyView from '@/components/daily-view'
import getEntryDates from '@/utils/getEntryDates'

export default async function Home() {

    const supabase = await createClient()
  
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      redirect('/login')
    }

    const { data: { user }, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single()
    if (userError) {
      console.error('Error fetching user profile: ', userError)
    }

    const entryDates = await getEntryDates()
    
  return (
    <div className='relative w-full h-100dvh'>
      <div className="hidden md:block">
          <SidebarTrigger className='absolute top-4 left-4 z-50'/>
      </div>
      <div className='flex flex-col items-center h-full'>
        <DailyView entryDates={entryDates}/>
      </div>
    </div>
  );
}
