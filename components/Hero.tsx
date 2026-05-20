import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="hero-bg"
      style={{
        minHeight: "480px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 32px",
        gap: "32px",
      }}
    >
      <h1 style={{
        fontSize: "clamp(56px, 8vw, 96px)",
        fontWeight: 900,
        lineHeight: 1,
        letterSpacing: "0.02em",
        background: "linear-gradient(90deg, #a855f7 0%, #7c3aed 40%, #f97316 70%, #ea580c 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        VIVA O ESPORTE
      </h1>

      <p style={{ fontSize: 20, color: "#d1d5db", maxWidth: 600 }}>
        Equipamentos de{" "}
        <span style={{ color: "#a855f7", fontWeight: 700 }}>alta performance</span>
        {" "}para elevar seus{" "}
        <span style={{ color: "#f97316", fontWeight: 700 }}>resultados</span>
      </p>

      {/* Badges */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px",
        justifyContent: "center",
        marginTop: "8px",
      }}>
        <div style={{
          background: "linear-gradient(90deg, #7c3aed, #6d28d9)",
          borderRadius: 10,
          padding: "14px 28px",
          fontWeight: 700,
          fontSize: 16,
          display: "flex",
          alignItems: "center",
          gap: 8,
          boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
        }}>
          🚚 Frete Grátis acima de R$ 299
        </div>
        <div style={{
          background: "linear-gradient(90deg, #f97316, #ea580c)",
          borderRadius: 10,
          padding: "14px 28px",
          fontWeight: 700,
          fontSize: 16,
          display: "flex",
          alignItems: "center",
          gap: 8,
          boxShadow: "0 4px 20px rgba(249,115,22,0.4)",
        }}>
          💳 12x sem juros
        </div>
        <div style={{
          background: "linear-gradient(90deg, #9333ea, #7c3aed)",
          borderRadius: 10,
          padding: "14px 28px",
          fontWeight: 700,
          fontSize: 16,
          display: "flex",
          alignItems: "center",
          gap: 8,
          boxShadow: "0 4px 20px rgba(147,51,234,0.4)",
        }}>
          ⚡ Envio em 24h
        </div>
      </div>

      <Link href="#produtos" style={{
        background: "linear-gradient(90deg, #7c3aed, #f97316)",
        borderRadius: 10,
        padding: "16px 48px",
        fontWeight: 800,
        fontSize: 17,
        textDecoration: "none",
        color: "white",
        letterSpacing: "0.08em",
        marginTop: 8,
        boxShadow: "0 6px 30px rgba(124,58,237,0.35)",
        transition: "transform 0.2s",
      }}>
        VER PRODUTOS
      </Link>
    </section>
  );
}
