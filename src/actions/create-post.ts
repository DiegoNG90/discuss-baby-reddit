"use server"

import type { Post } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { auth } from "@/auth"
import { db } from "@/db"
import { paths } from "@/paths"

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z
    .string()
    .min(10, { message: "Must be at least 10 characters long" }),
})

interface CreateFormPostState {
  errors: {
    title?: string[]
    content?: string[]
    _form?: string[]
  }
}

export async function createPost(
  slug: string,
  formState: CreateFormPostState,
  formData: FormData
): Promise<CreateFormPostState> {
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  })

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const session = await auth()

  if (!session || !session.user) {
    return {
      errors: {
        _form: ["User is not signed in"],
      },
    }
  }

  const topic = await db.topic.findFirst({
    where: {
      slug,
    },
  })

  if (!topic) {
    return {
      errors: {
        _form: ["Topic not found"],
      },
    }
  }

  let post: Post
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      }
    } else {
      return {
        errors: {
          _form: ["Unknown error: failed to create Form"],
        },
      }
    }
  }

  revalidatePath(paths.topicShow(slug))
  redirect(paths.postShow(slug, post.id))
}
