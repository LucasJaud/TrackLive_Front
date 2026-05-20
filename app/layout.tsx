import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Track Live - Produtos Esportivos",
  description: "Equipamentos de alta performance para elevar seus resultados",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Exo+2:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Exo 2', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
