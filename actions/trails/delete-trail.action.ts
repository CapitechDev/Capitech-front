"use server";

import apiServer from "@/services/axios-server";
import { revalidateTag } from "next/cache";

export async function deleteTrailAction(id: string) {
  try {
    console.log("deletando trilha", id);
    await apiServer.delete(`/trails/${id}`);

    revalidateTag("trails");
    revalidateTag(`trails-${id}`);
    
    return { success: true, id };
  } catch (error) {
    console.error("Erro ao deletar trilha:", error);
    throw new Error(error instanceof Error ? error.message : "Erro ao deletar trilha");
  }
}