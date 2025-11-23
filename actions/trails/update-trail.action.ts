"use server";

import { apiFetchJson } from "@/services/apiFetch";
import { IUpdateTrail } from "@/types/Trail";
import { revalidateTag } from "next/cache";

export async function updateTrailAction(id: string,data: Omit<IUpdateTrail, "id">) {
  try {
    const result = await apiFetchJson(`/trails/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    // revalidateTag("trails");
    // revalidateTag(`trails-${id}`);

    return result;
  } catch (error) {
    console.error("Erro ao atualizar trilha:", error);
    throw new Error(error instanceof Error ? error.message : "Erro ao atualizar trilha");
  }
}
