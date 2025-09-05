import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { SidebarTrigger } from '@/components/ui/sidebar'
import CalendarStrip from '@/components/callendar-strip'
import EmptyView from '@/components/empty-page'


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
    

  return (
    <div className='relative w-full h-100dvh'>
      <div className="hidden md:block">
          <SidebarTrigger className='absolute top-4 left-4 z-50'/>
      </div>
      <div className='flex flex-col items-center h-full'>
        <CalendarStrip />
        <div className='flex-1 flex items-center justify-center h-full w-full'>
          <EmptyView />
        </div>
      </div>
    </div>
  );
}
