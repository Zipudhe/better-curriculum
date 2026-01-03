import type { ComponentProps } from "react";
import type { Control, FieldValues, Path } from "react-hook-form"
import { Controller } from "react-hook-form"

import { Input } from "~/components/ui/input"
import { Field, FieldError, FieldLabel } from "~/components/ui/field"

interface IControlledInput<T extends FieldValues> extends ComponentProps<"input"> {
  name: Path<T>,
  control: Control<T, any, T>
}

export function ControlledInput<T extends FieldValues>({ control, name }: IControlledInput<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) =>
        <Field>
          <FieldLabel htmlFor={field.name} > {field.name} </FieldLabel>
          <Input
            id={field.name}
          />
          {fieldState.invalid && <FieldError> {fieldState.error?.message} </FieldError>}
        </Field>
      }
    />
  )
}
