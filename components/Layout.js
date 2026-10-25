import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { readCartCountFromCookie } from "../lib/cartClient";

export default function Layout({ title, mode, children }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(readCartCountFromCookie());
    const onUpdate = (e) => setCount(e.detail);
    window.addEventListener("cart-updated", onUpdate);
    return () => window.removeEventListener("cart-updated", onUpdate);
  }, []);

  return (
    <>
      <Head>
        <title>{title ? `${title} | TechShop` : "TechShop"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header className="header">
        <div className="container header-inner">
          <Link href="/" className="logo">🛍️ TechShop</Link>
          <nav>
            <Link href="/">Catalog</Link>
            <Link href="/cart" className="cart-link">
              🛒 Cart <span className="badge">{count}</span>
            </Link>
          </nav>
        </div>
      </header>
      <main className="container">
        {mode && <div className={`mode mode-${mode.toLowerCase()}`}>Rendered with {mode}</div>}
        {children}
      </main>
      <footer className="footer">© 2026 TechShop · Next.js SSR &amp; SSG demo</footer>
    </>
  );
}
