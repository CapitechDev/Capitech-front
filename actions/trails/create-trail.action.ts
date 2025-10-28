"use server";

import { apiFetchJson } from "@/services/apiFetch";
import { ICreateTrail } from "@/types/Trail";
import { revalidateTag } from "next/cache";

export async function createTrailAction(data: ICreateTrail) {
  try {
    const result = await apiFetchJson("/trails", {
      method: "POST",
      body: JSON.stringify(data),
    });

    revalidateTag("trails");

    return result;
  } catch (error) {
    console.error("Erro ao criar trilha:", error);
    throw new Error(error instanceof Error ? error.message : "Erro ao criar trilha");
  }
}
