import type { ComponentProps } from "react"
import type { Route } from "./+types/layout"
import { Outlet } from "react-router"
import { ProfileMenu } from "~/components/profile-menu"
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"

interface LayoutProps extends ComponentProps<"div"> { }

export const clientLoader = (args: Route.ClientLoaderArgs) => {
  // TODO: auth guard
  console.log({ window })
}

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
