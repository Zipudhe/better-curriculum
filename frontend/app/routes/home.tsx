import { useState } from 'react'
import type { Route } from "./+types/home";
import { useUploadFiles } from "@better-upload/client"
import { UploadDropzoneProgress } from "~/components/upload-dropzone"
import { Field, FieldError } from "~/components/ui/field"


type Error = {
  message: string
}

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Better CV" },
    { name: "description", content: "At least be seen" },
  ];
}

export default function Home() {
  const { control, uploadAsync } = useUploadFiles({ route: "curriculum" })
  const [errors, setErrors] = useState<Error[]>([])

  const handleChange = (input: File[] | FileList) => {
    if (input.length > 1) {
      setErrors((errors) => {
        const updatedErros = [...errors, { message: "Only one file is permitted" }]

        return updatedErros
      })

      return
    }

    if (!input[0].name.endsWith(".pdf")) {
      setErrors((errors) => {
        const updatedErros = [...errors, { message: "Only pdf files are allowed" }]

        return updatedErros
      })

      return
    }

    uploadAsync(input, { metadata: { folder: "cirruculum" } })
      .then(() => setErrors([]))
      .catch(err => {
        console.log({ err })
        setErrors((errors) => {
          const updatedErros = [...errors, { message: err.message }]

          return updatedErros
        })
      })
  }

  return (
    <div className=" bg-background text-foreground flex max-w-5xl w-full min-h-screen flex-row items-center justify-center gap-4 p-4 justify-self-center">
      <main className="h-3/4 border-2 rounded-2xl border-gray-300 p-4 w-full shadow">
        <h1 className="text-center" > Your optimized cv will show here </h1>
        <code>
        </code>
      </main>

      <aside>
        <Field>
          <UploadDropzoneProgress
            description={{
              maxFiles: 1,
              fileTypes: "PDF"
            }}
            uploadOverride={handleChange}
            accept="pdf/*"
            control={control} />
          <FieldError
            className="text-center"
            errors={errors} />
        </Field>
      </aside>
    </div>
  )
}
