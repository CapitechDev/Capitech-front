"use server";

import apiServer from "@/services/axios-server";
import { IUpdateTrail } from "@/types/Trail";
import { revalidateTag } from "next/cache";

export async function updateTrailAction(id: string,data: Omit<IUpdateTrail, "id">) {
  try {
    const result = await apiServer.put(`/trails/${id}`, data);

    revalidateTag("trails");
    revalidateTag(`trails-${id}`);

    return result.data;
  } catch (error) {
    console.error("Erro ao atualizar trilha:", error);
    throw new Error(error instanceof Error ? error.message : "Erro ao atualizar trilha");
  }
}
