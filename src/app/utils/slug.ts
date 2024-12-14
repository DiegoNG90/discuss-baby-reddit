export function parseSlug(slug: string) {
  return slug.replaceAll('%20', ' ');
}
