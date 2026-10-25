import Link from "next/link";
import { useState } from "react";
import Layout from "../../components/Layout";
import AddToCartButton from "../../components/AddToCartButton";
import { getAllProducts, getProductById } from "../../data/products";
import { money } from "../../lib/cart";

// SSG: one static page per product is pre-rendered at build time.
export async function getStaticPaths() {
  const paths = getAllProducts().map((p) => ({ params: { id: String(p.id) } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const product = getProductById(params.id);
  const related = getAllProducts()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);
  return { props: { product, related } };
}

export default function ProductDetail({ product, related }) {
  const [qty, setQty] = useState(1);

  return (
    <Layout title={product.name} mode="SSG">
      <p><Link href="/">← Back to catalog</Link></p>

      <div className="detail">
        <div className="detail-thumb"><img src={product.image} alt={product.name} /></div>
        <div>
          <span className="tag">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="price big">{money(product.price)}</div>
          <p>{product.description}</p>
          <p className="muted">In stock: {product.stock} · SKU: P-{String(product.id).padStart(3, "0")}</p>

          <div className="qty-row">
            <label>Quantity</label>
            <div className="qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))}>+</button>
            </div>
          </div>

          <div className="card-actions">
            <AddToCartButton productId={product.id} qty={qty} className="btn btn-lg" />
            <Link href="/cart" className="btn btn-outline btn-lg">View cart</Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <>
          <h2>Related products</h2>
          <div className="grid">
            {related.map((p) => (
              <Link href={`/products/${p.id}`} className="card" key={p.id}>
                <div className="thumb"><img src={p.image} alt={p.name} loading="lazy" /></div>
                <div className="card-body">
                  <span className="card-title">{p.name}</span>
                  <div className="price">{money(p.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}
