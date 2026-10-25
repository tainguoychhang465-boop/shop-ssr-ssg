import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../components/Layout";
import { parseCart, buildCartSummary, money, FREE_SHIPPING_FROM } from "../lib/cart";
import { updateCart } from "../lib/cartClient";

// SSR: the cart is read from the request cookie on every request.
export async function getServerSideProps({ req }) {
  const summary = buildCartSummary(parseCart(req.cookies.cart));
  return { props: { summary } };
}

export default function CartPage({ summary }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function change(action, id, qty) {
    setBusy(true);
    await updateCart(action, id, qty);
    await router.replace(router.asPath, undefined, { scroll: false }); // re-run SSR
    setBusy(false);
  }

  const { items, subtotal, tax, shipping, total } = summary;

  return (
    <Layout title="Cart">
      <h1>Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="empty">
          <p>Your cart is empty.</p>
          <Link href="/" className="btn">Continue shopping</Link>
        </div>
      ) : (
        <div className="cart-layout">
          <table className={`table ${busy ? "busy" : ""}`}>
            <thead>
              <tr><th>Product</th><th>Price</th><th>Qty</th><th>Total</th><th></th></tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id}>
                  <td>
                    <Link href={`/products/${i.id}`} className="cart-product">
                      <img className="mini-thumb" src={i.image} alt={i.name} />
                      {i.name}
                    </Link>
                  </td>
                  <td>{money(i.price)}</td>
                  <td>
                    <div className="qty">
                      <button disabled={busy} onClick={() => change("set", i.id, i.qty - 1)}>−</button>
                      <span>{i.qty}</span>
                      <button disabled={busy || i.qty >= i.stock} onClick={() => change("set", i.id, i.qty + 1)}>+</button>
                    </div>
                  </td>
                  <td><b>{money(i.lineTotal)}</b></td>
                  <td>
                    <button className="link-danger" disabled={busy} onClick={() => change("remove", i.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <aside className="summary">
            <h3>Order summary</h3>
            <div className="row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
            <div className="row"><span>Tax (10%)</span><span>{money(tax)}</span></div>
            <div className="row"><span>Shipping</span><span>{shipping ? money(shipping) : "Free"}</span></div>
            {shipping > 0 && <p className="muted small">Free shipping on orders from {money(FREE_SHIPPING_FROM)}</p>}
            <div className="row total"><span>Total</span><span>{money(total)}</span></div>
            <Link href="/checkout" className="btn btn-block">Proceed to checkout</Link>
            <button className="btn btn-outline btn-block" disabled={busy} onClick={() => change("clear")}>Clear cart</button>
          </aside>
        </div>
      )}
    </Layout>
  );
}
