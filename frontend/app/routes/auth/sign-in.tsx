import { useEffect } from "react"
import { redirect } from "react-router"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "~/components/ui/card"
import type { Route } from "./+types/sign-in"
import { Button } from "~/components/ui/button"

import { getAuthUrl } from "~/lib/auth"

type AccessTokenPayload = {
  status: "success" | "errror",
  access_token: string,
  expires_in: number,
  refresh_token: string,
  refresh_token_expires_in: number,
  scope: string
}

export async function loader(args: Route.LoaderArgs) {
  const authURL = await getAuthUrl()
    .then(({ data: { authURL } }) => {
      return authURL
    })
    .catch(error => {
      console.error({ error })
    })

  if (!authURL) {
    return { authURL: "" }
  }

  return { authURL }
}

export default function SignIn({ loaderData: { authURL } }: Route.ComponentProps) {

  const handleSignIn = () => {
    const width = 500;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    // 2. Abre a janela apontando para seu backend
    const popup = window.open(
      authURL,
      'linkedin_login',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  }

  useEffect(() => {
    const messageListener = (event: MessageEvent<AccessTokenPayload>) => {
      // Segurança: Verifique a origem para evitar mensagens maliciosas
      if (event.origin !== "http://localhost:3000") {
        return
      }

      const authPayload: AccessTokenPayload = event.data

      if (authPayload.status === 'success') {
        // Salve o token no contexto/localStorage
        // redirect para dashboard...
        for (let key in authPayload) {
          if (Object.prototype.hasOwnProperty(key)) {
            const value = authPayload[key as keyof AccessTokenPayload]
            console.log({ key, value })
            window.localStorage.setItem(key, String(value))
          }
        }

        window.location.replace(window.location.origin)
      }
    };

    window.addEventListener('message', messageListener);

    // Clean Code: Sempre remova event listeners ao desmontar
    return () => window.removeEventListener('message', messageListener);
  }, []);

  return (
    <Card className="bg-card w-3/4 max-w-lg p-y-4">
      <CardHeader>
        <CardTitle className="text-foreground"> Login </CardTitle>
        <CardDescription> Faça login com LinkedIn </CardDescription>
      </CardHeader>
      <CardContent>
        <CardAction className="p-4 flex justify-evenly w-full">
          <Button
            onClick={handleSignIn}
          >
            Entrar com LinkedIn
          </Button>
        </CardAction>
      </CardContent>
    </Card>
  )
}
