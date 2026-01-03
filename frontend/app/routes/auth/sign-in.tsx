import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Form, type Action } from "~/components/ui/form"
import { ControlledInput } from "~/components/ui/controlled-input"

import { auth } from "~/lib/auth"

const loginFormSchema = z.object({
  email: z.email(),
  password: z.string()
    .min(8, "password must have at least 8 characters")
    .max(64, "passowrd must havet at most 64 characters"),
})

type loginFormDataType = z.infer<typeof loginFormSchema>

export default function SignIn() {
  const form = useForm<loginFormDataType>({ resolver: zodResolver(loginFormSchema), defaultValues: { email: "", password: "" } })

  const onSubmit = (data: loginFormDataType) => {
    return auth.signIn.email({ email: data.email, password: data.password })
  }

  const actions = [
    {
      name: "login",
      onClick: (payload: loginFormDataType) => onSubmit(payload)
    },
    {
      name: "linkedin",
      onClick: () => console.log("Linked action")
    },
  ] as Action[]

  return (
    <Form
      title="Login"
      description="Faça login com email e senha ou com a rede social preferida"
      className="flex flex-col gap-4"
      id="login-form"
      actions={actions}
    >
      <ControlledInput
        name="email"
        required
        control={form.control} />
      <ControlledInput
        name="password"
        required
        control={form.control} />
    </Form>
  )
}
