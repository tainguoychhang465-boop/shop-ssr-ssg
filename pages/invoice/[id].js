import Link from "next/link";
import { useEffect } from "react";
import Layout from "../../components/Layout";
import { getOrder } from "../../lib/orders";
import { money } from "../../lib/cart";

// SSR: invoice is loaded from the order store on every request.
export async function getServerSideProps({ params }) {
  const order = getOrder(params.id);
  if (!order) return { notFound: true };
  return { props: { order } };
}

export default function Invoice({ order }) {
  // Cart cookie was cleared by the checkout API — reset the header badge.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("cart-updated", { detail: 0 }));
  }, []);

  return (
    <Layout title={`Invoice ${order.id}`}>
      <div className="success no-print">✅ Thank you! Your order has been placed.</div>

      <div className="invoice">
        <div className="inv-top">
          <div>
            <h2 className="brand">TechShop</h2>
            <div className="muted">Phnom Penh, Cambodia · support@techshop.test</div>
          </div>
          <div className="right">
            <h2>INVOICE</h2>
            <b>{order.id}</b>
            <div className="muted">{new Date(order.createdAt).toLocaleString("en-GB")}</div>
          </div>
        </div>

        <div className="inv-cols">
          <div>
            <div className="muted">Bill to</div>
            <b>{order.customer.name}</b>
            <div>{order.customer.email}</div>
            <div>{order.customer.phone}</div>
            <div>{order.customer.address}</div>
          </div>
          <div className="right">
            <div className="muted">Payment method</div>
            <b>{order.paymentMethod}</b>
            <div className="muted">Status</div>
            <b>{order.status}</b>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr><th>#</th><th>Product</th><th>Price</th><th>Qty</th><th>Amount</th></tr>
          </thead>
          <tbody>
            {order.items.map((i, idx) => (
              <tr key={i.id}>
                <td>{idx + 1}</td>
                <td><span className="cart-product"><img className="mini-thumb" src={i.image} alt="" />{i.name}</span></td>
                <td>{money(i.price)}</td>
                <td>{i.qty}</td>
                <td>{money(i.lineTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="inv-totals">
          <div className="row"><span>Subtotal</span><span>{money(order.subtotal)}</span></div>
          <div className="row"><span>Tax (10%)</span><span>{money(order.tax)}</span></div>
          <div className="row"><span>Shipping</span><span>{order.shipping ? money(order.shipping) : "Free"}</span></div>
          <div className="row total"><span>Total</span><span>{money(order.total)}</span></div>
        </div>
        {order.note && <p className="muted">Note: {order.note}</p>}
      </div>

      <div className="card-actions no-print">
        <button className="btn" onClick={() => window.print()}>🖨️ Print</button>
        <a className="btn btn-outline" href={`/api/invoice/${order.id}?download=1`}>⬇️ Download invoice (.html)</a>
        <a className="btn btn-outline" href={`/api/invoice/${order.id}`} target="_blank" rel="noreferrer">Open .html</a>
        <Link className="btn btn-outline" href="/">Continue shopping</Link>
      </div>
    </Layout>
  );
}
