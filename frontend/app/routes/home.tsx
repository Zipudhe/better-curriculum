import type { Route } from "./+types/home";
import { Button } from "~/components/ui/button"

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Better CV" },
    { name: "description", content: "At least be seen" },
  ];
}

export default function Home() {

  return (
    <main className="h-screen p-8 w-full flex flex-col gap-2 items-center">
      <div className="p-4 w-full flex gap-4 items-center">
        <div className="p-4 border-2 shadow w-full max-w-[512px] h-[70vh]">
          <p className="text-center" > Pasted wanted vacancy </p>
        </div>
        <div className="p-4 border-2 shadow flex flex-col w-full max-w-[1024px] h-[70vh]">
          <p className="text-center" > Your optimized cv will show here </p>
        </div>
      </div>
      <div className="p-4 w-full h-52 flex justify-center items-center">
        <Button className="h-16 w-2xs">
          Optimize
        </Button>
      </div>
    </main>
  )
}
