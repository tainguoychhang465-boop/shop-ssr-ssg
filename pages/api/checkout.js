import { parseCart, buildCartSummary, clearCartCookie } from "../../lib/cart";
import { saveOrder, newOrderId } from "../../lib/orders";

export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const summary = buildCartSummary(parseCart(req.cookies.cart));
  if (summary.items.length === 0) return res.redirect(303, "/cart");

  const body = req.body || {};
  const customer = {
    name: String(body.name || "").trim(),
    email: String(body.email || "").trim(),
    phone: String(body.phone || "").trim(),
    address: String(body.address || "").trim(),
  };
  if (!customer.name || !customer.email || !customer.phone || !customer.address) {
    return res.redirect(303, "/checkout?error=" + encodeURIComponent("Please fill in all required fields."));
  }

  const order = saveOrder({
    id: newOrderId(),
    createdAt: new Date().toISOString(),
    status: "Paid / Confirmed",
    paymentMethod: String(body.payment || "Cash on Delivery"),
    note: String(body.note || ""),
    customer,
    ...summary,
  });

  res.setHeader("Set-Cookie", clearCartCookie());
  res.redirect(303, `/invoice/${order.id}`);
}
