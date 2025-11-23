import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/nextAuthOptions";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type FetchOptions = RequestInit & {
  headers?: Record<string, string>;
};

export async function apiFetch(
  endpoint: string,
  options: FetchOptions = {}
): Promise<Response> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  // Interceptor: sempre adiciona o token se existir (como no axios)
  try {
    const session = await getServerSession(nextAuthOptions);
    if (session?.token) {
      (headers as Record<string, string>).Authorization = `Bearer ${session.token}`;
    }
  } catch (error) {
    // Ignora erro se não conseguir pegar a sessão (ex: em contextos públicos)
    console.debug("Não foi possível obter sessão, continuando sem autenticação");
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  const response = await fetch(url, config);
  
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }
  
  return response;
}

export async function apiFetchJson<T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T | null> {
  const response = await apiFetch(endpoint, options);
  
  // Verifica se há conteúdo na resposta
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}