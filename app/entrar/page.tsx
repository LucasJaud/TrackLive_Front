"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function EntrarPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha }),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.token);
                alert("Login realizado com sucesso!");
            } else {
                alert("Email ou senha incorretos.");
            }
        } catch {
            alert("Erro ao conectar com o servidor.");
        }
    };

  return (
    <>
      <Navbar />
      <main style={{
        minHeight: "calc(100vh - 72px)",
        background: "radial-gradient(ellipse at 30% 70%, rgba(124,58,237,0.15) 0%, rgba(249,115,22,0.08) 50%, #0a0a0a 70%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
      }}>
        <div style={{
          background: "#111111",
          border: "1px solid #2a1a4a",
          boxShadow: "0 0 50px rgba(124,58,237,0.15)",
          borderRadius: 16,
          padding: "48px 40px",
          width: "100%",
          maxWidth: 480,
        }}>
          <h1 style={{
            fontSize: 32,
            fontWeight: 900,
            marginBottom: 8,
            background: "linear-gradient(90deg, #a855f7, #f97316)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
          }}>
            Bem-vindo de volta!
          </h1>
          <p style={{ textAlign: "center", color: "#9ca3af", marginBottom: 36 }}>
            Entre na sua conta Track Live
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 600, fontSize: 15 }}>
                E-mail
              </label>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input-dark"
                style={{
                  width: "100%",
                  borderRadius: 8,
                  padding: "14px 16px",
                  fontSize: 15,
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: 600, fontSize: 15 }}>
                Senha
              </label>
              <input
                type="password"
                placeholder="••••••••••"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                className="input-dark"
                style={{
                  width: "100%",
                  borderRadius: 8,
                  padding: "14px 16px",
                  fontSize: 15,
                }}
              />
            </div>

            <button
              onClick={handleSubmit}
              style={{
                width: "100%",
                background: "linear-gradient(90deg, #7c3aed, #f97316)",
                border: "none",
                borderRadius: 8,
                padding: "15px",
                color: "white",
                fontWeight: 800,
                fontSize: 16,
                letterSpacing: "0.1em",
                cursor: "pointer",
                marginTop: 8,
                boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
              }}
            >
              ENTRAR
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
