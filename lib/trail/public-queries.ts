import { cache } from "react";

export async function asyncDelay(milliseconds = 0, verbose = false) {
  if (milliseconds <= 0) return;
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}


export const findAllPublicTrailsCached = cache(async () => {
  try {
    const res = await fetch("http://localhost:4000/trails", {
      next: {
        tags: ["trails"],
      },
    });

    const trailsResponse = await res.json();
    return trailsResponse.data;
  } catch (error) {
    return null
  }
});

export const findOnePublicTrailCached = cache(async (id: string) => {
  try {
    const res = await fetch(`http://localhost:4000/trails/${id}`, {
      next: {
        tags: [`trails-${id}`],
      },
    });

    const trailsResponse = await res.json();
    return trailsResponse;
  } catch (error) {
    return null
  }
});

