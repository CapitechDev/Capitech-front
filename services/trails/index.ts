import { IUpdateTrail } from "@/types/Trail";
import { apiFetchJson } from "../apiFetch";

export const getTrails = async () => {
  const response = await apiFetchJson<{ data: IUpdateTrail[] }>("/trails");
  return response?.data;
};
