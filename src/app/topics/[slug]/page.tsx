import PostCreateForm from "../../components/Post/PostCreateForm"
interface TopicShowPageProps {
  params: {
    slug: string
  }
}

function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = params
  const parsedSlug = slug.replace("%20", " ")

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{parsedSlug}</h1>{" "}
      </div>

      <div className="">
        <PostCreateForm slug={parsedSlug} />
      </div>
    </div>
  )
}

export default TopicShowPage
