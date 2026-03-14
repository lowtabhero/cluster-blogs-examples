import { requestWP } from "$lib/wpApi.server";

export async function load(event) {
  const searchParams = new URLSearchParams();
  // searchParams.append('id', '350');

  const response = await requestWP(event, 'posts', searchParams);

  if (!response.ok) return;
  if (!Array.isArray(response.data) || response.data.length === 0) return;

  // normalize blogs
  // id
  // slug
  // featured image
  // tag
  // title
  // short desc or first 2 lines of content
  return {
    blogs: response.data
  }
}