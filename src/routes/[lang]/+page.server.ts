import { requestWP, normalizeBlog } from "$lib/wpApi.server";
import type { NormalizedBlog } from "$lib/NormalizedBlogType.js";

export async function load(event) {
  const response = await requestWP(event, 'posts');
  if (!response.ok) return;

  const blogs = response.data;
  if (!Array.isArray(blogs) || blogs.length === 0) return;

  const normalizedBlogs: Array<NormalizedBlog> = [];
  blogs.forEach((blog) => {
    normalizedBlogs.push(normalizeBlog(blog))
  })

  return {
    blogs: normalizedBlogs
  }
}