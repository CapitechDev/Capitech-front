import { apiFetchJson } from "@/services/apiFetch";
import { IUpdateTrail } from "@/types/Trail";

const getTrail = async (trailId: string) => {
  try {
    const trailsResponse = await apiFetchJson<IUpdateTrail>(`/trails/${trailId}`);
    return trailsResponse;
  } catch (error) {
    console.log("Erro ao buscar trilha");
    return null;
  }
};

export { getTrail };
