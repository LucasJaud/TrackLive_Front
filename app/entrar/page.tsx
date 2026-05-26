"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { apiPost } from "@/lib/api";
import { CheckCircle, AlertCircle, Loader } from "lucide-react";

interface LoginResponse {
  token: string;
  tipo: string;
  nome: string;
  email: string;
  tipoUsuario: string;
}

export default function EntrarPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ email: "", senha: "" });
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setStatus(null);
  };

  const handleSubmit = async () => {
    if (!form.email || !form.senha) {
      setStatus({ type: "error", msg: "Preencha e-mail e senha." });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const data = await apiPost<LoginResponse>("/auth/login", {
        email: form.email,
        senha: form.senha,
      });

      login({ nome: data.nome, email: data.email, tipoUsuario: data.tipoUsuario, token: data.token });
      setStatus({ type: "success", msg: `Bem-vindo de volta, ${data.nome.split(" ")[0]}!` });

      setTimeout(() => router.push("/"), 1200);
    } catch (err: unknown) {
      setStatus({ type: "error", msg: err instanceof Error ? err.message : "Erro ao fazer login." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{
        minHeight: "calc(100vh - 72px)",
        background: "radial-gradient(ellipse at 30% 70%, rgba(124,58,237,0.15) 0%, rgba(249,115,22,0.08) 50%, #0a0a0a 70%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 16px",
      }}>
        <div style={{
          background: "#111111", border: "1px solid #2a1a4a",
          boxShadow: "0 0 50px rgba(124,58,237,0.15)",
          borderRadius: 16, padding: "48px 40px",
          width: "100%", maxWidth: 480,
        }}>
          <h1 style={{
            fontSize: 32, fontWeight: 900, marginBottom: 8,
            background: "linear-gradient(90deg, #a855f7, #f97316)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            textAlign: "center",
          }}>Bem-vindo de volta!</h1>

          <p style={{ textAlign: "center", color: "#9ca3af", marginBottom: 36 }}>
            Entre na sua conta Track Live
          </p>

          {/* Feedback */}
          {status && (
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "13px 16px", borderRadius: 10, marginBottom: 24,
              background: status.type === "success" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
              border: `1px solid ${status.type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
              color: status.type === "success" ? "#4ade80" : "#f87171",
              fontSize: 14, fontWeight: 600,
            }}>
              {status.type === "success"
                ? <CheckCircle size={18} />
                : <AlertCircle size={18} />}
              {status.msg}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 600, fontSize: 15 }}>E-mail</label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={handleChange("email")}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                className="input-dark"
                style={{ width: "100%", borderRadius: 8, padding: "14px 16px", fontSize: 15 }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 600, fontSize: 15 }}>Senha</label>
              <input
                type="password"
                placeholder="••••••••••"
                value={form.senha}
                onChange={handleChange("senha")}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                className="input-dark"
                style={{ width: "100%", borderRadius: 8, padding: "14px 16px", fontSize: 15 }}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%",
                background: loading ? "#374151" : "linear-gradient(90deg, #7c3aed, #f97316)",
                border: "none", borderRadius: 8, padding: "15px",
                color: "white", fontWeight: 800, fontSize: 16,
                letterSpacing: "0.1em", cursor: loading ? "not-allowed" : "pointer",
                marginTop: 8, boxShadow: loading ? "none" : "0 4px 20px rgba(124,58,237,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                transition: "all 0.2s",
              }}
            >
              {loading ? <><Loader size={18} className="spin" /> ENTRANDO...</> : "ENTRAR"}
            </button>
          </div>

          <p style={{ textAlign: "center", marginTop: 24, color: "#9ca3af", fontSize: 14 }}>
            Não tem uma conta?{" "}
            <Link href="/cadastrar" style={{ color: "#a855f7", fontWeight: 700, textDecoration: "none" }}>
              Cadastre-se
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
