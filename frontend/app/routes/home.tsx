import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Better CV" },
    { name: "description", content: "At least be seen" },
  ];
}

export default function Home() {

  return (
    <div className=" bg-background text-foreground flex max-w-5xl w-full min-h-screen flex-row items-center justify-center gap-4 p-4 justify-self-center">
      <main className="h-3/4 border-2 rounded-2xl border-gray-300 p-4 w-full shadow">
        <h1 className="text-center" > Your optimized cv will show here </h1>
        <code>
        </code>
      </main>
      <aside>
      </aside>
    </div>
  )
}
