"use server";

import { apiFetchJson } from "@/services/apiFetch";
import { revalidateTag } from "next/cache";

export async function deleteTrailAction(id: string) {
  try {
    console.log("deletando trilha", id);
    await apiFetchJson(`/trails/${id}`, {
      method: "DELETE",
    });

    revalidateTag("trails");
    revalidateTag(`trails-${id}`);
    
    return { success: true, id };
  } catch (error) {
    console.error("Erro ao deletar trilha:", error);
    throw new Error(error instanceof Error ? error.message : "Erro ao deletar trilha");
  }
}