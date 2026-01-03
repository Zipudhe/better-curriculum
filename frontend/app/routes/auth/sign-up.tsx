import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Form } from "~/components/ui/form"
import { ControlledInput } from "~/components/ui/controlled-input"
import type { Action } from "~/components/ui/form"

import { auth } from "~/lib/auth"

const registerFormSchema = z.object({
  name: z.string()
    .min(5, "Name must have at least 5 characters")
    .max(32, "Name must have at most 32 characters"),
  email: z.email(),
  password: z.string()
    .min(8, "password must have at least 8 characters")
    .max(64, "passowrd must havet at most 64 characters"),
  passwordCheck: z.string()
    .min(8, "password must have at least 8 characters")
    .max(64, "passowrd must havet at most 64 characters"),
})

export default function SignUp() {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: ""
    }
  })

  const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    const { email, name, password } = data
    await auth.signUp.email({ email, name, password })
      .then(res => console.log({ res }))
      .catch(err => console.error({ err }))
  }

  const onSubmitLinkedIn = () => {
  }

  const actions = [
    {
      name: "Sign Up",
      onClick: (data: z.infer<typeof registerFormSchema>) => onSubmit(data)
    },
    {
      name: "LinkedIn",
      onClick: () => onSubmitLinkedIn()
    },
  ] as Action[]

  return (
    <Form
      className="flex flex-col gap-4"
      id="login-form"
      title="Registre-se"
      actions={actions}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <ControlledInput
        name="name"
        required
        control={form.control} />
      <ControlledInput
        name="email"
        required
        control={form.control} />

      <ControlledInput
        name="password"
        type="password"
        required
        control={form.control} />

      <ControlledInput
        name="passwordCheck"
        type="password"
        required
        control={form.control} />
    </Form>
  )
}
