import Link from "next/link"
import { Chip } from "@nextui-org/react"
import { db } from "@/db"
import paths from "@/paths"

async function TopicList() {
  const topics = await db.topic.findMany()

  return (
    <>
      <h3 className="text-lg">Topics</h3>
      <div className="flex flex-row gap-2 flex-wrap">
        {topics?.map((topic) => (
          <div key={topic.id}>
            <Link href={paths.topicShow(topic.slug)}>
              <Chip className="cursor-pointer" color="warning" variant="shadow">
                {topic.slug}
              </Chip>
            </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default TopicList
