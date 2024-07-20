"use server"

import { z } from "zod"
import { auth } from "@/auth"

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/, {
      message: "Must be lowercase letters or dashes without spaces",
    }),
  description: z
    .string()
    .min(10, { message: "Must be at least 10 characters long" }),
})

interface CreateTopicFormState {
  errors: {
    name?: string[]
    description?: string[]
    _form?: string[]
  }
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  // Revalidate the HOMEPage after creating a topic
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  })

  const session = await auth()

  if (!session || !session.user) {
    return {
      errors: {
        _form: ["User is not signed in"],
      },
    }
  }

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  return {
    errors: {},
  }
}
