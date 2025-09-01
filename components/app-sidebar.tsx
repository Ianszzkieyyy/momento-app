"use client"

import { 
  Sidebar, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader, 
} from "@/components/ui/sidebar";


const views = [
  {
    title: "daily",
    href: "?view=daily",
  },
  {
    title: "calendar",
    href: "?view=calendar"
  },
    {
    title: "list",
    href: "?view=list"
  },
    {
    title: "gallery",
    href: "?view=gallery"
  },

]

export default function AppSidebar() {

  return (
    <Sidebar>
        <SidebarContent className="p-4">
          <SidebarHeader>
            <h1 className="text-3xl text-balance">momento</h1>
          </SidebarHeader>
          <SidebarGroup>
            <SidebarGroupLabel className="font-bold tracking-widest text-sidebar-foreground/50">CHANGE VIEW</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {views.map((view) => (
                  <SidebarMenuItem key={view.title}>
                    <SidebarMenuButton className="text-xl py-6 mb-2 hover:bg-secondary transition-all duration-75" asChild>
                      <button onClick={() => history.pushState(null, '', view.href)}>{view.title}</button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
    </Sidebar>
  )
}

