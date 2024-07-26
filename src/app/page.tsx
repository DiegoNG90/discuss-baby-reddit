import { fetchTopPosts } from "@/db/queries/posts"
import { PostList } from "./components/Post/post-list"
import TopicCreateForm from "./components/Topics/TopicCreateForm"
import TopicList from "./components/Topics/TopicList"
import { Divider } from "@nextui-org/react"
import { db } from "@/db"

export default async function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top post</h1>
        <PostList fetchData={() => fetchTopPosts()} />
      </div>
      <div className="border shadow py-2 px-2">
        <TopicCreateForm />
        <Divider className="my-2" />
        <TopicList />
      </div>
    </div>
  )
}
