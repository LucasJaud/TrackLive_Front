"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function CadastrarPage() {
    const [form, setForm] = useState({ nome: "", email: "", cpf: "", senha: "", confirmar: "" });

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
    };

    const formatCPF = (v: string) => {
        return v.replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})/, "$1-$2")
            .slice(0, 14);
    };

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (form.senha !== form.confirmar) {
            alert("Senhas não conferem!");
            return;
        }
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/registrar`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome: form.nome,
                    email: form.email,
                    cpf: form.cpf.replace(/\D/g, ""),
                    senha: form.senha,
                }),
            });
            if (response.ok) {
                alert("Cadastro realizado com sucesso!");
            } else {
                const erro = await response.text();
                alert("Erro ao cadastrar: " + erro);
            }
        } catch {
            alert("Erro ao conectar com o servidor.");
        }
    };

    const fields = [
        { label: "Nome Completo", field: "nome", type: "text", placeholder: "Seu nome" },
        { label: "E-mail", field: "email", type: "email", placeholder: "seu@email.com" },
        { label: "CPF", field: "cpf", type: "text", placeholder: "000.000.000-00" },
        { label: "Senha", field: "senha", type: "password", placeholder: "••••••••••" },
        { label: "Confirmar Senha", field: "confirmar", type: "password", placeholder: "••••••••••" },
    ];

    return (
        <>
            <Navbar />
            <main style={{
                minHeight: "calc(100vh - 72px)",
                background: "radial-gradient(ellipse at 70% 30%, rgba(249,115,22,0.12) 0%, rgba(124,58,237,0.1) 50%, #0a0a0a 70%)",
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
                        Crie sua conta
                    </h1>
                    <p style={{ textAlign: "center", color: "#9ca3af", marginBottom: 36 }}>
                        Cadastre-se na Track Live e comece a comprar
                    </p>

                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                        {fields.map(f => (
                            <div key={f.field}>
                                <label style={{ display: "block", marginBottom: 7, fontWeight: 600, fontSize: 15 }}>
                                    {f.label}
                                </label>
                                <input
                                    type={f.type}
                                    placeholder={f.placeholder}
                                    value={f.field === "cpf" ? formatCPF(form.cpf) : form[f.field as keyof typeof form]}
                                    onChange={handleChange(f.field)}
                                    className="input-dark"
                                    style={{
                                        width: "100%",
                                        borderRadius: 8,
                                        padding: "13px 16px",
                                        fontSize: 15,
                                    }}
                                />
                            </div>
                        ))}

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
                            CADASTRAR
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