"use server"

export async function createTopic(formData: FormData) {
  // Revalidate the HOMEPage after creating a topic
  const name = formData.get("name")
  const description = formData.get("description")

  console.log("createTopic called!", { name, description })
}
