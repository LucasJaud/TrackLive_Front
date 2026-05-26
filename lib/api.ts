const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    // Tenta extrair mensagem do back-end ou usa fallbacks por status
    const msg =
      data?.message ||
      data?.erro ||
      data?.error ||
      (res.status === 409 ? "E-mail ou CPF já cadastrado." :
       res.status === 401 ? "E-mail ou senha inválidos." :
       res.status === 400 ? "Dados inválidos. Verifique os campos." :
       "Erro inesperado. Tente novamente.");
    throw new Error(msg);
  }

  return data as T;
}

export async function apiGet<T>(path: string, token?: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar dados.");
  }

  return res.json();
}
