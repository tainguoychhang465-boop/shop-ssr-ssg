import { getProductById } from "../../data/products";
import { parseCart, serializeCartCookie, cartCount } from "../../lib/cart";

// POST { action: "add" | "set" | "remove" | "clear", id, qty }
export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const cart = parseCart(req.cookies.cart);
  const { action, id, qty } = req.body || {};
  const product = id != null ? getProductById(id) : null;
  const n = Math.max(0, parseInt(qty ?? 1, 10) || 0);

  if (action !== "clear" && !product) return res.status(400).json({ error: "Unknown product" });

  if (action === "add") cart[product.id] = Math.min(product.stock, (cart[product.id] || 0) + Math.max(1, n));
  else if (action === "set") n > 0 ? (cart[product.id] = Math.min(product.stock, n)) : delete cart[product.id];
  else if (action === "remove") delete cart[product.id];
  else if (action === "clear") Object.keys(cart).forEach((k) => delete cart[k]);
  else return res.status(400).json({ error: "Unknown action" });

  res.setHeader("Set-Cookie", serializeCartCookie(cart));
  res.status(200).json({ cart, count: cartCount(cart) });
}
