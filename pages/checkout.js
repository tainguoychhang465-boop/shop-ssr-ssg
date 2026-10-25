import Link from "next/link";
import Layout from "../components/Layout";
import { parseCart, buildCartSummary, money } from "../lib/cart";

// SSR: cart is read from the cookie; empty cart redirects back to /cart.
export async function getServerSideProps({ req, query }) {
  const summary = buildCartSummary(parseCart(req.cookies.cart));
  if (summary.items.length === 0) {
    return { redirect: { destination: "/cart", permanent: false } };
  }
  return { props: { summary, error: query.error || null } };
}

export default function Checkout({ summary, error }) {
  const { items, subtotal, tax, shipping, total } = summary;

  return (
    <Layout title="Checkout">
      <h1>Checkout</h1>
      {error && <div className="alert">{error}</div>}

      <div className="cart-layout">
        {/* Native form POST: works even without JavaScript */}
        <form className="form" method="POST" action="/api/checkout">
          <h3>Customer information</h3>
          <label>Full name *<input className="input" name="name" required /></label>
          <label>Email *<input className="input" type="email" name="email" required /></label>
          <label>Phone *<input className="input" name="phone" required /></label>
          <label>Shipping address *<textarea className="input" name="address" rows={3} required /></label>

          <h3>Payment method</h3>
          <label className="radio"><input type="radio" name="payment" value="Cash on Delivery" defaultChecked /> Cash on Delivery</label>
          <label className="radio"><input type="radio" name="payment" value="ABA / KHQR" /> ABA / KHQR</label>
          <label className="radio"><input type="radio" name="payment" value="Credit Card" /> Credit Card</label>

          <label>Note<textarea className="input" name="note" rows={2} /></label>

          <button className="btn btn-lg btn-block" type="submit">Place order · {money(total)}</button>
          <Link href="/cart">← Back to cart</Link>
        </form>

        <aside className="summary">
          <h3>Your order</h3>
          {items.map((i) => (
            <div className="row" key={i.id}>
              <span className="cart-product"><img className="mini-thumb" src={i.image} alt="" />{i.name} × {i.qty}</span>
              <span>{money(i.lineTotal)}</span>
            </div>
          ))}
          <hr />
          <div className="row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
          <div className="row"><span>Tax (10%)</span><span>{money(tax)}</span></div>
          <div className="row"><span>Shipping</span><span>{shipping ? money(shipping) : "Free"}</span></div>
          <div className="row total"><span>Total</span><span>{money(total)}</span></div>
        </aside>
      </div>
    </Layout>
  );
}
