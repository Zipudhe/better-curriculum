import type { ComponentProps } from "react"
import { Outlet } from "react-router"
import { ProfileMenu } from "~/components/profile-menu"
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"

interface LayoutProps extends ComponentProps<"div"> { }

function HomeLayout({ children }: LayoutProps) {

  return (
    <SidebarProvider>
      <ProfileMenu />
      <SidebarTrigger />
      {children}
      <Outlet />
    </SidebarProvider>
  )
}

export default HomeLayout
