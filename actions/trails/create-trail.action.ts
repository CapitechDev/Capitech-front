"use server";

import apiServer from "@/services/axios-server";
import { ICreateTrail } from "@/types/Trail";
import { revalidateTag } from "next/cache";

export async function createTrailAction(data: ICreateTrail) {
  try {
    const result = await apiServer.post("/trails", data);

    revalidateTag("trails");

    return result.data;
  } catch (error) {
    console.error("Erro ao criar trilha:", error);
    throw new Error(error instanceof Error ? error.message : "Erro ao criar trilha");
  }
}
