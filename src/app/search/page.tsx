import { redirect } from "next/navigation"
import React from "react"
import { PostList } from "../components/Post/post-list"
import { searchPostsByTerm } from "@/db/queries/posts"

interface SearchPageProps {
  searchParams: {
    term: string
  }
}

function page({ searchParams }: SearchPageProps) {
  const { term } = searchParams

  if (!term) {
    redirect("/")
  }
  return (
    <div>
      <PostList fetchData={() => searchPostsByTerm(term)} />
    </div>
  )
}

export default page
