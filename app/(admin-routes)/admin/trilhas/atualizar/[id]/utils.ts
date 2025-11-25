import api from "@/services/axios";
import { IUpdateTrail } from "@/types/Trail";

const getTrail = async (trailId: string) => {
  try {
    const trailsResponse = await api.get<IUpdateTrail>(`/trails/${trailId}`);
    return trailsResponse.data;
  } catch (error) {
    console.log("Erro ao buscar trilha");
    return null;
  }
};

export { getTrail };
