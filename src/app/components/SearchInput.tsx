"use client"

import React from "react"
import { Input } from "@nextui-org/react"
import { useSearchParams } from "next/navigation"
import * as actions from "@/actions"

function SearchInput() {
  const params = useSearchParams()

  return (
    <form action={actions.search}>
      <Input name="term" defaultValue={params.get("term") || ""} />
    </form>
  )
}

export default SearchInput
