import axios from "axios";
import { getSession } from "next-auth/react";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
});

api.interceptors.request.use(async (request) => {
  const session = await getSession();

  if (session) {
    request.headers.Authorization = `Bearer ${session.token}`;
  }

  return request;
});

export default api;
