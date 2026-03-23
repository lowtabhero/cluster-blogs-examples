import { requestWP, normalizeBlog, acceptedCategories } from "$lib/wpApi.server";
import type { NormalizedBlog } from "$lib/NormalizedBlogType.js";

export async function load(event) {
  const urlParams = new URLSearchParams();

  // get page param
  const pageParam = event.url.searchParams.get('page');
  let page = pageParam ? Number.parseInt(pageParam) : 1;
  if (Number.isInteger(page) && page > 1) {
    urlParams.set('page', page.toString());
  } else {
    page = 1;
  }

  // get type param
  const typeParam = event.url.searchParams.get('type');
  if (typeParam && acceptedCategories.has(typeParam)) {
    urlParams.set('categories', acceptedCategories.get(typeParam).toString())
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
    filter: typeParam,
    page: page
  }
}