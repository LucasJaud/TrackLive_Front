"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, LogOut, User, X, Trash2, Plus, Minus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

function formatPrice(p: number) {
  return p.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const { items, count, total, removeItem, updateQty } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <>
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
            width: 52, height: 52, borderRadius: "50%",
            background: "linear-gradient(135deg, #7c3aed, #f97316)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, boxShadow: "0 0 20px rgba(124,58,237,0.5)",
          }}>🏃</div>
          <span style={{
            fontWeight: 800, fontSize: 20,
            background: "linear-gradient(90deg, #a855f7, #f97316)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            letterSpacing: 1,
          }}>TRACK LIVE</span>
        </Link>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Carrinho */}
          <button
            onClick={() => setCartOpen(true)}
            style={{
              background: "transparent", border: "1px solid #2a1a4a",
              borderRadius: 8, padding: "8px 10px", cursor: "pointer",
              color: "white", display: "flex", alignItems: "center",
              position: "relative",
            }}
          >
            <ShoppingCart size={20} />
            {count > 0 && (
              <span style={{
                position: "absolute", top: -6, right: -6,
                background: "linear-gradient(90deg, #7c3aed, #f97316)",
                borderRadius: "50%", width: 20, height: 20,
                fontSize: 11, fontWeight: 800,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{count}</span>
            )}
          </button>

          {/* Auth */}
          {isLoading ? null : user ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "linear-gradient(135deg, #7c3aed, #f97316)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <User size={18} color="white" />
                </div>
                <span style={{ color: "#d1d5db", fontWeight: 600, fontSize: 14 }}>
                  {user.nome.split(" ")[0]}
                </span>
              </div>
              <button
                onClick={handleLogout}
                title="Sair"
                style={{
                  background: "transparent", border: "1px solid #4b5563",
                  borderRadius: 8, padding: "8px 12px", cursor: "pointer",
                  color: "#9ca3af", display: "flex", alignItems: "center", gap: 6,
                  fontSize: 14, fontWeight: 600, transition: "all 0.2s",
                }}
              >
                <LogOut size={16} />
                Sair
              </button>
            </div>
          ) : (
            <>
              <Link href="/entrar" style={{
                background: "transparent", border: "1px solid #4b5563",
                borderRadius: 8, padding: "8px 24px", cursor: "pointer",
                color: "white", fontWeight: 600, fontSize: 15,
                textDecoration: "none", transition: "border-color 0.2s",
              }}>Entrar</Link>
              <Link href="/cadastrar" style={{
                background: "linear-gradient(90deg, #7c3aed, #f97316)",
                border: "none", borderRadius: 8, padding: "9px 24px",
                cursor: "pointer", color: "white", fontWeight: 700,
                fontSize: 15, textDecoration: "none",
              }}>Cadastrar</Link>
            </>
          )}
        </div>
      </nav>

      {/* Drawer do Carrinho */}
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
            zIndex: 100, display: "flex", justifyContent: "flex-end",
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#111111", border: "1px solid #2a1a4a",
              width: "100%", maxWidth: 420,
              height: "100%", display: "flex", flexDirection: "column",
              boxShadow: "-8px 0 40px rgba(124,58,237,0.2)",
            }}
          >
            {/* Header */}
            <div style={{
              padding: "24px", borderBottom: "1px solid #2a1a4a",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <h2 style={{ fontWeight: 800, fontSize: 20 }}>
                🛒 Carrinho{count > 0 && <span style={{ color: "#a855f7", marginLeft: 8 }}>({count})</span>}
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer" }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Itens */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
              {items.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0", color: "#6b7280" }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
                  <p style={{ fontSize: 16 }}>Seu carrinho está vazio</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {items.map(item => (
                    <div key={item.product.id} style={{
                      background: "#0d0d1a", border: "1px solid #1e1040",
                      borderRadius: 12, padding: 16,
                      display: "flex", gap: 14, alignItems: "center",
                    }}>
                      <div style={{
                        fontSize: 36, width: 60, height: 60,
                        background: "#1a0a30", borderRadius: 10,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>{item.product.imagem}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: "#f3f4f6" }}>
                          {item.product.nome}
                        </p>
                        <p style={{
                          fontWeight: 800, fontSize: 16,
                          background: "linear-gradient(90deg, #a855f7, #f97316)",
                          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        }}>
                          {formatPrice(item.product.preco)}
                        </p>
                        {/* Qty */}
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                          <button
                            onClick={() => updateQty(item.product.id, item.quantity - 1)}
                            style={{
                              width: 28, height: 28, borderRadius: 6,
                              border: "1px solid #2a1a4a", background: "transparent",
                              color: "white", cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                          ><Minus size={14} /></button>
                          <span style={{ fontWeight: 700, minWidth: 20, textAlign: "center" }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.product.id, item.quantity + 1)}
                            style={{
                              width: 28, height: 28, borderRadius: 6,
                              border: "1px solid #2a1a4a", background: "transparent",
                              color: "white", cursor: "pointer",
                              display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                          ><Plus size={14} /></button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        style={{
                          background: "none", border: "none",
                          color: "#6b7280", cursor: "pointer",
                          padding: 4, flexShrink: 0,
                        }}
                      ><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{ padding: "20px 24px", borderTop: "1px solid #2a1a4a" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <span style={{ color: "#9ca3af", fontWeight: 600 }}>Total</span>
                  <span style={{
                    fontWeight: 900, fontSize: 22,
                    background: "linear-gradient(90deg, #a855f7, #f97316)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>{formatPrice(total)}</span>
                </div>
                <button style={{
                  width: "100%",
                  background: "linear-gradient(90deg, #7c3aed, #f97316)",
                  border: "none", borderRadius: 10, padding: "15px",
                  color: "white", fontWeight: 800, fontSize: 16,
                  letterSpacing: "0.08em", cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
                }}>
                  FINALIZAR COMPRA
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
