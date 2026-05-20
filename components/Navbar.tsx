"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav
      className="navbar-border"
      style={{
        background: "#0a0a0a",
        position: "sticky",
        top: 0,
        zIndex: 50,
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "72px",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
        <div style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #7c3aed, #f97316)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          boxShadow: "0 0 20px rgba(124,58,237,0.5)",
        }}>
          🏃
        </div>
        <span style={{
          fontWeight: 800,
          fontSize: 20,
          background: "linear-gradient(90deg, #a855f7, #f97316)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          letterSpacing: 1,
        }}>
          TRACK LIVE
        </span>
      </Link>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button style={{
          background: "transparent",
          border: "1px solid #2a1a4a",
          borderRadius: 8,
          padding: "8px 10px",
          cursor: "pointer",
          color: "white",
          display: "flex",
          alignItems: "center",
        }}>
          <ShoppingCart size={20} />
        </button>

        <Link href="/entrar" style={{
          background: "transparent",
          border: "1px solid #4b5563",
          borderRadius: 8,
          padding: "8px 24px",
          cursor: "pointer",
          color: "white",
          fontWeight: 600,
          fontSize: 15,
          textDecoration: "none",
          transition: "border-color 0.2s",
        }}>
          Entrar
        </Link>

        <Link href="/cadastrar" style={{
          background: "linear-gradient(90deg, #7c3aed, #f97316)",
          border: "none",
          borderRadius: 8,
          padding: "9px 24px",
          cursor: "pointer",
          color: "white",
          fontWeight: 700,
          fontSize: 15,
          textDecoration: "none",
        }}>
          Cadastrar
        </Link>
      </div>
    </nav>
  );
}
