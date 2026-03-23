import { requestWP, normalizeBlog } from "$lib/wpApi.server";
import type { NormalizedBlog } from "$lib/NormalizedBlogType.js";
import { isWPBlog, acceptedCategories } from "$lib/wpApi.server";

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

  // get related
  const tagId = normalizedBlog.tagId;
  const relatedUrlParams = new URLSearchParams({
    tags: tagId.toString(),
    per_page: '50'
  })

  const relatedResponse = await requestWP(event, `posts`, relatedUrlParams);
  if (!relatedResponse.ok) return;

  if (!Array.isArray(relatedResponse.data) || relatedResponse.data.length === 0) return;

  const relatedBlogs = relatedResponse.data;
  const normalizedRelated = [];
  for (let relatedBlog of relatedBlogs) {
    const normalized: NormalizedBlog = normalizeBlog(relatedBlog);
    normalizedRelated.push(normalized);
  }

  return {
    blog: normalizedBlog,
    relatedBlogs: normalizedRelated
  }
}