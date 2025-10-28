import { apiFetchJson } from "@/services/apiFetch";
import { cache } from "react";

export async function asyncDelay(milliseconds = 0, verbose = false) {
  if (milliseconds <= 0) return;
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}


export const findAllPublicTrailsCached = cache(async () => {
  try {
    const trailsResponse = await apiFetchJson('/trails', {
      next: {
        tags: ["trails"],
      },
    });
    return trailsResponse.data;
  } catch (error) {
    return null
  }
});

export const findOnePublicTrailCached = cache(async (id: string) => {
  try {
    const trailsResponse = await apiFetchJson(`/trails/${id}`, {
      next: {
        tags: [`trails-${id}`],
      },
    });
    return trailsResponse;
  } catch (error) {
    return null
  }
});

