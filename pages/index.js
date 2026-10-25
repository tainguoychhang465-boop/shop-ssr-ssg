import Link from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";
import AddToCartButton from "../components/AddToCartButton";
import { getAllProducts } from "../data/products";
import { money } from "../lib/cart";

// SSG: catalog HTML is generated once at build time.
export async function getStaticProps() {
  const products = getAllProducts();
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  return { props: { products, categories } };
}

export default function Home({ products, categories }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const shown = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Layout title="Catalog">
      <h1>Product Catalog</h1>

      <div className="toolbar">
        <input
          className="input"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="chips">
          {categories.map((c) => (
            <button key={c} className={`chip ${c === category ? "active" : ""}`} onClick={() => setCategory(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid">
        {shown.map((p) => (
          <div className="card" key={p.id}>
            <Link href={`/products/${p.id}`}>
              <div className="thumb"><img src={p.image} alt={p.name} loading="lazy" /></div>
            </Link>
            <div className="card-body">
              <span className="tag">{p.category}</span>
              <Link href={`/products/${p.id}`} className="card-title">{p.name}</Link>
              <div className="price">{money(p.price)}</div>
              <div className="card-actions">
                <Link href={`/products/${p.id}`} className="btn btn-outline">Details</Link>
                <AddToCartButton productId={p.id} />
              </div>
            </div>
          </div>
        ))}
        {shown.length === 0 && <p>No products found.</p>}
      </div>
    </Layout>
  );
}
