import { cache } from "react";

export async function asyncDelay(milliseconds = 0, verbose = false) {
  if (milliseconds <= 0) return;
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
const REVALIDATE_CACHE = 3600 * 24 * 7 // 7 days

export const findAllPublicTrailsCached = cache(async () => {
  try {
    const trailsResponse = await fetch(`${API_BASE_URL}/trails`, {
      next: {
        tags: ["trails"],
        revalidate: REVALIDATE_CACHE
      }
    })
    const res = await trailsResponse.json();
    return res.data;
  } catch (error) {
    return null
  }
});

export const findOnePublicTrailCached = cache(async (id: string) => {
  try {
    const trailsResponse = await fetch(`${API_BASE_URL}/trails/${id}`, {
      next: {
        tags: [`trails-${id}`],
        revalidate: REVALIDATE_CACHE
      },
    })
    const res = await trailsResponse.json();
    return res;
  } catch (error) {
    return null
  }
});

