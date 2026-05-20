import { ShoppingCart, Star, Shield } from "lucide-react";

const features = [
  {
    icon: <ShoppingCart size={28} color="white" />,
    bg: "linear-gradient(135deg, #7c3aed, #9333ea)",
    glow: "rgba(124,58,237,0.4)",
    title: "Entrega Rápida",
    desc: "Receba seus produtos em até 48h em todo o Brasil",
  },
  {
    icon: <Star size={28} color="white" />,
    bg: "linear-gradient(135deg, #f97316, #ea580c)",
    glow: "rgba(249,115,22,0.4)",
    title: "Qualidade Garantida",
    desc: "Produtos originais com garantia do fabricante",
  },
  {
    icon: <Shield size={28} color="white" />,
    bg: "linear-gradient(135deg, #9333ea, #7c3aed)",
    glow: "rgba(147,51,234,0.4)",
    title: "Pagamento Seguro",
    desc: "Suas informações protegidas em todas as transações",
  },
];

export default function Features() {
  return (
    <section className="features-bg" style={{ padding: "72px 32px" }}>
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 48,
      }}>
        {features.map((f, i) => (
          <div key={i} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 16,
          }}>
            <div style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: f.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 30px ${f.glow}`,
            }}>
              {f.icon}
            </div>
            <h3 style={{ fontWeight: 800, fontSize: 20 }}>{f.title}</h3>
            <p style={{ color: "#9ca3af", fontSize: 15, lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
