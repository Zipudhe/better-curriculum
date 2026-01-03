import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Avatar } from './ui/avatar'
import { Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from "./ui/sidebar"
import { Field, FieldError } from "~/components/ui/field"
import { useUploadFiles } from '@better-upload/client'
import { useState } from 'react'
import { UploadDropzoneProgress, } from './upload-dropzone'

const avatarClassName = "max-h-[80px] max-w-[80px] w-full h-auto"
type Error = {
  message: string
}

export function ProfileMenu() {

  const imgUrl = "https://media.licdn.com/dms/image/v2/D4D03AQHhd3nbyYVLpw/profile-displayphoto-scale_200_200/B4DZosGxVQH4AY-/0/1761676564811?e=1769040000&v=beta&t=yUXVpDUL1dZWkioB_pgbs70w6TdxKvw1TZehkNGTCII"

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
    <Sidebar>
      <SidebarHeader className="p-4 items-center" >
        <Avatar className={avatarClassName}>
          <AvatarImage className={avatarClassName} src={imgUrl} />
          <AvatarFallback />
        </Avatar>
        <h1> Lucas Gonçalves Ramalho </h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="items-center">
          <SidebarGroupLabel> Lasted resume </SidebarGroupLabel>
          <SidebarGroupContent>
            <Field className="w-fit" >
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
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
