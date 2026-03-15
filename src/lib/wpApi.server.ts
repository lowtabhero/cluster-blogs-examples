import type { RequestEvent } from "@sveltejs/kit";
import type { NormalizedBlog } from "$lib/NormalizedBlogType.js";

type RequestWPSuccess = {
  data: unknown;
  ok: true
};

type RequestWPError = {
  error: string;
  ok: false;
  status: 500
};

type RequestWPResponse = RequestWPSuccess | RequestWPError;

export async function requestWP(event: RequestEvent, endpoint: string, urlParams: URLSearchParams = new URLSearchParams): Promise<RequestWPResponse> {
  try {
    urlParams.set('_embed', 'true');

    const response = await event.fetch(`http://wordpress.stockscout.eu/wp-json/wp/v2/${endpoint}?${urlParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return { data, ok: true };
  } catch (e) {
    const errMessage = e instanceof Error ? e.message : 'Unknown error';
    return { error: errMessage, ok: false, status: 500 };
  }
}


type WPBlog = {
  id: number;
  slug: string;
  title?: { rendered: string };
  meta?: { rank_math_description: string };
  excerpt?: { rendered: string };
  content?: { rendered: string };
  tags?: Array<number>;
  _embedded: {
    ["wp:featuredmedia"]?: Array<{ source_url: string }>;
    ['wp:term']?: Array<
      Array<{
        id: number;
        name: string;
      }>
    >
  }
}

export function isWPBlog(blog: any): blog is WPBlog {
  const id = blog.id;
  if (!Number.isInteger(id)) return false;

  const slug = blog.slug;
  if (typeof slug !== 'string') return false;

  const embedded = blog._embedded;
  if (!embedded) return false;

  return true;
}

export function normalizeBlog(blog: WPBlog): NormalizedBlog {
  let tag = '';
  const wpTagId = blog.tags?.[0] ?? 0;

  if (wpTagId) {
    const terms = blog._embedded?.['wp:term'] ?? [];
    const flatTerms = terms.flat();
    const termsTag = flatTerms.find((term) => term.id === wpTagId);
    tag = termsTag?.name ?? '';
  }

  return {
    id: blog.id,
    slug: blog.slug,
    tag: tag,
    title: blog.title?.rendered ?? '',
    meta: blog.meta?.rank_math_description ?? '',
    content: blog.content?.rendered ?? '',
    shortDesc: blog.excerpt?.rendered ?? '',
    featuredMedia: blog._embedded["wp:featuredmedia"]?.[0]?.source_url ?? ''
  }
}


export const acceptedTypes = new Map();
acceptedTypes.set('pillars', 80);
acceptedTypes.set('clusters', 82);