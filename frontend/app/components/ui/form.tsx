import type { ComponentProps } from "react"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Button } from "./button"

export type Action = typeof Button & {
  name: string,
  onClick: () => void
}

interface IForm extends ComponentProps<"form"> {
  actions?: Action[]
  title?: string,
  description?: string
}

export function Form({ children, title, description, actions, ...props }: IForm) {

  return (
    <Card className="w-3/4 max-w-lg p-y-4">
      <CardHeader>
        <CardTitle> {title} </CardTitle>
        <CardDescription> {description} </CardDescription>
      </CardHeader>
      <CardContent>
        <form {...props}>
          {children}
        </form>
        <CardAction className="p-4 flex justify-evenly w-full">
          {
            actions?.map(({ name, ...props }) => <Button {...props}> {name} </Button>)
          }
        </CardAction>
      </CardContent>
    </Card>
  )
}
