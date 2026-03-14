import { requestWP, normalizeBlog } from "$lib/wpApi.server";
import type { NormalizedBlog } from "$lib/NormalizedBlogType.js";
import { isWPBlog } from "$lib/wpApi.server";

export async function load(event) {
  const params = event.params;
  const slug = params.slug;
  const urlParams = new URLSearchParams({
    slug: slug
  });

  const response = await requestWP(event, `posts`, urlParams);
  if (!response.ok) return;

  if (!Array.isArray(response.data) || response.data.length === 0) return;

  const blog = response.data[0];
  if (!isWPBlog(blog)) return;

  const normalizedBlog: NormalizedBlog = normalizeBlog(blog);

  return {
    blog: normalizedBlog
    // related blogs
  }
}