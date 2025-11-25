import { IUpdateTrail } from "@/types/Trail";
import api from "../axios";

export const getTrails = async () => {
  const response = await api.get<{ data: IUpdateTrail[] }>("/trails");
  return response.data.data;
};
