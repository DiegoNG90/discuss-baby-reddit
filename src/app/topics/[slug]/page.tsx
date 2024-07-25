import PostCreateForm from "@/app/components/Post/PostCreateForm"
import { PostList } from "@/app/components/Post/post-list"
import { fetchPostsBySlug } from "@/db/queries/posts"
import { parseSlug } from "@/app/utils/slug"

interface TopicShowPageProps {
  params: {
    slug: string
  }
}

function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = params
  const parsedSlug = parseSlug(slug)

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{parsedSlug}</h1>{" "}
        <PostList fetchData={() => fetchPostsBySlug(parsedSlug)} />
      </div>

      <div className="">
        <PostCreateForm slug={parsedSlug} />
      </div>
    </div>
  )
}

export default TopicShowPage
