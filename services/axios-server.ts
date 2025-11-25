import axios from "axios";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/nextAuthOptions";

const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
});

apiServer.interceptors.request.use(async (request) => {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    request.headers.Authorization = `Bearer ${session.token}`;
  }

  return request;
});

export default apiServer;
