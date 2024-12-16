import CommentItem from "@/app/components/comments/CommentItem"
import { fetchCommntsByPostId } from "@/db/queries/comments"

interface CommentListProps {
  postId: string
}

export default async function CommentList({ postId }: CommentListProps) {
  const comments = await fetchCommntsByPostId(postId)

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  )
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentItem key={comment.id} commentId={comment.id} postId={postId} />
    )
  })

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  )
}
