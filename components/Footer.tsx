export default function Footer() {
  return (
    <footer className="footer-bg" style={{ padding: "40px 32px", textAlign: "center" }}>
      <p style={{ color: "#9ca3af", fontSize: 15, marginBottom: 8 }}>
        © 2026 Track Live - Produtos Esportivos. Todos os direitos reservados.
      </p>
      <p style={{
        fontSize: 14,
        background: "linear-gradient(90deg, #a855f7, #f97316)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontStyle: "italic",
      }}>
        Performance que transforma resultados
      </p>
    </footer>
  );
}
