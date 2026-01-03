import { Outlet } from "react-router"
import AsideImage from "~/assets/auth_image.png"


export default function AuthLayout() {

  return (
    <div className="h-screen w-screen flex">
      <aside className="w-1/2 max-w-4xl h-full">
        <img
          className="h-full w-full"
          src={AsideImage} />
      </aside>

      <main className="w-1/2 h-full grid place-items-center">
        <Outlet />
      </main>
    </div>
  )
}
