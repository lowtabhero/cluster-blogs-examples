import { requestWP, normalizeBlog, acceptedTypes } from "$lib/wpApi.server";
import type { NormalizedBlog } from "$lib/NormalizedBlogType.js";

export async function load(event) {
  const urlParams = new URLSearchParams();

  // get page param
  const pageParam = event.url.searchParams.get('page');
  const page = pageParam ? Number.parseInt(pageParam) : 0;
  if (Number.isInteger(page) && page > 0) urlParams.set('page', page.toString());

  // get type param
  const typeParam = event.url.searchParams.get('type');
  if (typeParam && acceptedTypes.has(typeParam)) {
    urlParams.set('categories', acceptedTypes.get(typeParam).toString())
  }

  // get posts
  const response = await requestWP(event, 'posts', urlParams);
  if (!response.ok) return;

  const blogs = response.data;
  if (!Array.isArray(blogs) || blogs.length === 0) return;

  const normalizedBlogs: Array<NormalizedBlog> = [];
  blogs.forEach((blog) => {
    normalizedBlogs.push(normalizeBlog(blog))
  })

  return {
    blogs: normalizedBlogs,
    filter: typeParam
  }
}