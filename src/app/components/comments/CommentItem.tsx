import Image from "next/image"
import CreateComment from "@/app/components/comments/CreateComment"
import { fetchCommntsByPostId } from "@/db/queries/comments"

interface CommentItemProps {
  commentId: string
  postId: string
}

// TODO: Get a list of comments
export default async function CommentItem({
  commentId,
  postId,
}: CommentItemProps) {
  const comments = await fetchCommntsByPostId(postId)
  const comment = comments.find((c) => c.id === commentId)

  if (!comment) {
    return null
  }

  const children = comments.filter((c) => c.parentId === commentId)
  const renderedChildren = children.map((child) => {
    return <CommentItem key={child.id} commentId={child.id} postId={postId} />
  })

  return (
    <div className="p-4 border mt-2 mb-1">
      <div className="flex gap-3">
        <Image
          src={comment.user.image || ""}
          alt="user image"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <p className="text-sm font-medium text-gray-500">
            {comment.user.name}
          </p>
          <p className="text-gray-900">{comment.content}</p>
          <CreateComment postId={comment.postId} parentId={comment.id} />
        </div>
      </div>
      <div className="pl-4">{renderedChildren}</div>
    </div>
  )
}
