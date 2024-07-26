import { Suspense } from "react"
import Link from "next/link"
import PostShow from "@/app/components/Post/post-show"
import CommentList from "@/app/components/comments/comment-list"
import CommentCreateForm from "@/app/components/comments/comment-create-form"
import paths from "@/paths"
import { parseSlug } from "@/app/utils/slug"
import PostShowLoading from "@/app/components/Post/post-show-loading"

interface PostShowPageProps {
  params: {
    slug: string
    postId: string
  }
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params
  const parsedSlug = parseSlug(slug)

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {"< "}Back to {parsedSlug}
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </div>
  )
}
