"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { apiPost } from "@/lib/api";
import { CheckCircle, AlertCircle, Loader } from "lucide-react";

export default function CadastrarPage() {
  const router = useRouter();

  const [form, setForm] = useState({ nome: "", email: "", cpf: "", senha: "", confirmar: "", endereco:"", telefone:"" });
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const formatCPF = (v: string) =>
    v.replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .slice(0, 14);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = field === "cpf" ? formatCPF(e.target.value) : e.target.value;
    setForm(prev => ({ ...prev, [field]: value }));
    setFieldErrors(prev => ({ ...prev, [field]: "" }));
    setStatus(null);
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!form.nome.trim()) errors.nome = "Nome é obrigatório.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errors.email = "E-mail inválido.";
    const cpfRaw = form.cpf.replace(/\D/g, "");
    if (cpfRaw.length !== 11) errors.cpf = "CPF deve ter 11 dígitos.";
    if (!form.senha || form.senha.length < 6) errors.senha = "Senha deve ter ao menos 6 caracteres.";
    if (form.senha !== form.confirmar) errors.confirmar = "As senhas não coincidem.";
    if (!form.endereco.trim()) errors.endereco = "Endereço é obrigatório.";
    if (form.telefone.replace(/\D/g, "").length < 10) errors.telefone = "Telefone deve ter ao menos 10 dígitos.";
    if (form.senha !== form.confirmar) errors.confirmar = "As senhas não coincidem.";
    return errors;
  };

  const handleSubmit = async () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await apiPost("/auth/registrar", {
        nome: form.nome,
        email: form.email,
        cpf: form.cpf.replace(/\D/g, ""),
        senha: form.senha,
        endereco: form.endereco,
        telefone: form.telefone.replace(/\D/g, ""),
      });

      setStatus({ type: "success", msg: "Conta criada! Redirecionando para o login..." });
      setTimeout(() => router.push("/entrar"), 2000);
    } catch (err: unknown) {
      setStatus({ type: "error", msg: err instanceof Error ? err.message : "Erro ao cadastrar." });
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { label: "Nome Completo", field: "nome", type: "text", placeholder: "Seu nome completo" },
    { label: "E-mail", field: "email", type: "email", placeholder: "seu@email.com" },
    { label: "CPF", field: "cpf", type: "text", placeholder: "000.000.000-00" },
    { label: "Endereço", field: "endereco", type: "text", placeholder: "Rua, número, bairro" },
    { label: "Telefone", field: "telefone", type: "text", placeholder: "11999999999" },
    { label: "Senha", field: "senha", type: "password", placeholder: "Mínimo 6 caracteres" },
    { label: "Confirmar Senha", field: "confirmar", type: "password", placeholder: "Repita a senha" },
];

  return (
    <>
      <Navbar />
      <main style={{
        minHeight: "calc(100vh - 72px)",
        background: "radial-gradient(ellipse at 70% 30%, rgba(249,115,22,0.12) 0%, rgba(124,58,237,0.1) 50%, #0a0a0a 70%)",
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
          }}>Crie sua conta</h1>

          <p style={{ textAlign: "center", color: "#9ca3af", marginBottom: 36 }}>
            Cadastre-se na Track Live e comece a comprar
          </p>

          {/* Feedback geral */}
          {status && (
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "13px 16px", borderRadius: 10, marginBottom: 24,
              background: status.type === "success" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
              border: `1px solid ${status.type === "success" ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
              color: status.type === "success" ? "#4ade80" : "#f87171",
              fontSize: 14, fontWeight: 600,
            }}>
              {status.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              {status.msg}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {fields.map(f => (
              <div key={f.field}>
                <label style={{ display: "block", marginBottom: 7, fontWeight: 600, fontSize: 15 }}>
                  {f.label}
                </label>
                <input
                  type={f.type}
                  placeholder={f.placeholder}
                  value={form[f.field as keyof typeof form]}
                  onChange={handleChange(f.field)}
                  className="input-dark"
                  style={{
                    width: "100%", borderRadius: 8, padding: "13px 16px", fontSize: 15,
                    ...(fieldErrors[f.field] ? { borderColor: "#ef4444", boxShadow: "0 0 0 2px rgba(239,68,68,0.15)" } : {}),
                  }}
                />
                {fieldErrors[f.field] && (
                  <p style={{ color: "#f87171", fontSize: 12, marginTop: 5, display: "flex", alignItems: "center", gap: 4 }}>
                    <AlertCircle size={12} /> {fieldErrors[f.field]}
                  </p>
                )}
              </div>
            ))}

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
              {loading ? <><Loader size={18} /> CADASTRANDO...</> : "CADASTRAR"}
            </button>
          </div>

          <p style={{ textAlign: "center", marginTop: 24, color: "#9ca3af", fontSize: 14 }}>
            Já tem uma conta?{" "}
            <Link href="/entrar" style={{ color: "#a855f7", fontWeight: 700, textDecoration: "none" }}>
              Entrar
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
