"use client";
import { useState, useEffect } from "react";
import { Star, ShoppingCart } from "lucide-react";

type Category = "Todos" | "Calçados" | "Vestuário" | "Equipamentos" | "Acessórios" | "Tecnologia";

interface Product {
    id: number;
    nome: string;
    preco: number;
    precoAntigo?: number;
    categoria: string;
    imagem: string;
    badge?: string;
    avaliacao: number;
    reviews: number;
}

const categories: Category[] = ["Todos", "Calçados", "Vestuário", "Equipamentos", "Acessórios", "Tecnologia"];

function formatPrice(price: number) {
    return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function Stars({ rating }: { rating: number }) {
    return (
        <div style={{ display: "flex", gap: 2 }}>
            {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={13}
                      fill={i <= rating ? "#f97316" : "none"}
                      color={i <= rating ? "#f97316" : "#4b5563"}
                />
            ))}
        </div>
    );
}

export default function Products() {
    const [active, setActive] = useState<Category>("Todos");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(false);

    useEffect(() => {
        const url = active === "Todos"
            ? `${process.env.NEXT_PUBLIC_API_URL}/produtos`
            : `${process.env.NEXT_PUBLIC_API_URL}/produtos?categoria=${active}`;

        setLoading(true);
        setErro(false);

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => {
                setErro(true);
                setLoading(false);
            });
    }, [active]);

    return (
        <section id="produtos" style={{ padding: "80px 32px", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
                <h2 style={{
                    fontSize: "clamp(36px, 5vw, 60px)",
                    fontWeight: 900,
                    letterSpacing: "0.03em",
                    marginBottom: 12,
                }}>
                    <span style={{ color: "white" }}>NOSSOS </span>
                    <span style={{
                        background: "linear-gradient(90deg, #a855f7, #f97316)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}>PRODUTOS</span>
                </h2>
                <p style={{ color: "#9ca3af", fontSize: 17 }}>
                    Selecione os melhores equipamentos para seu treino
                </p>
            </div>

            {/* Categorias */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 32 }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`category-btn ${active === cat ? "active" : ""}`}
                        onClick={() => setActive(cat)}
                    >
                        <span style={{ fontWeight: 700 }}>{cat}</span>
                    </button>
                ))}
            </div>

            {/* Estado de loading */}
            {loading && (
                <p style={{ textAlign: "center", color: "#9ca3af", marginBottom: 40 }}>
                    Carregando produtos...
                </p>
            )}

            {/* Estado de erro */}
            {erro && (
                <p style={{ textAlign: "center", color: "#ef4444", marginBottom: 40 }}>
                    Erro ao carregar produtos. Verifique se o back-end está rodando.
                </p>
            )}

            {/* Contagem */}
            {!loading && !erro && (
                <p style={{ textAlign: "center", color: "#6b7280", marginBottom: 40, fontSize: 14 }}>
                    Exibindo <strong style={{ color: "white" }}>{products.length}</strong> produtos
                </p>
            )}

            {/* Grid */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 24,
            }}>
                {products.map(product => (
                    <div key={product.id} className="product-card" style={{ borderRadius: 12, overflow: "hidden" }}>
                        <div style={{
                            background: "linear-gradient(135deg, #0d0d1a, #1a0a30)",
                            height: 200,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 72,
                            position: "relative",
                        }}>
                            {product.imagem}
                            {product.badge && (
                                <span style={{
                                    position: "absolute",
                                    top: 12,
                                    right: 12,
                                    background: product.badge === "OFERTA" ? "#ea580c"
                                        : product.badge === "NOVO" ? "#7c3aed"
                                            : product.badge === "HOT" ? "#dc2626"
                                                : "#9333ea",
                                    color: "white",
                                    fontSize: 11,
                                    fontWeight: 800,
                                    padding: "4px 10px",
                                    borderRadius: 6,
                                    letterSpacing: "0.05em",
                                }}>
                  {product.badge}
                </span>
                            )}
                        </div>

                        <div style={{ padding: "20px" }}>
                            <p style={{ fontSize: 12, color: "#7c3aed", fontWeight: 600, marginBottom: 6, letterSpacing: "0.05em" }}>
                                {product.categoria.toUpperCase()}
                            </p>
                            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: "#f3f4f6" }}>
                                {product.nome}
                            </h3>

                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                                <Stars rating={product.avaliacao} />
                                <span style={{ fontSize: 12, color: "#6b7280" }}>({product.reviews})</span>
                            </div>

                            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                                <div>
                                    {product.precoAntigo && (
                                        <p style={{ fontSize: 13, color: "#6b7280", textDecoration: "line-through", marginBottom: 2 }}>
                                            {formatPrice(product.precoAntigo)}
                                        </p>
                                    )}
                                    <p style={{
                                        fontSize: 22,
                                        fontWeight: 800,
                                        background: "linear-gradient(90deg, #a855f7, #f97316)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                    }}>
                                        {formatPrice(product.preco)}
                                    </p>
                                </div>

                                <button style={{
                                    background: "linear-gradient(90deg, #7c3aed, #9333ea)",
                                    border: "none",
                                    borderRadius: 8,
                                    padding: "10px 14px",
                                    cursor: "pointer",
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    fontWeight: 600,
                                    fontSize: 13,
                                }}>
                                    <ShoppingCart size={15} />
                                    Comprar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}