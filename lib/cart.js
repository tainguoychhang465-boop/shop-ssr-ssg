import { getProductById } from "../data/products";

export const CART_COOKIE = "cart";
export const TAX_RATE = 0.1; // 10% VAT
export const SHIPPING_FEE = 5;
export const FREE_SHIPPING_FROM = 100;

// Cart is stored in a cookie as { [productId]: qty } so SSR pages can read it.
export function parseCart(raw) {
  if (!raw) return {};
  try {
    const data = JSON.parse(decodeURIComponent(raw));
    const cart = {};
    for (const [id, qty] of Object.entries(data)) {
      const n = parseInt(qty, 10);
      if (getProductById(id) && n > 0) cart[id] = n;
    }
    return cart;
  } catch {
    return {};
  }
}

export function serializeCartCookie(cart) {
  const value = encodeURIComponent(JSON.stringify(cart));
  return `${CART_COOKIE}=${value}; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax`;
}

export function clearCartCookie() {
  return `${CART_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function cartCount(cart) {
  return Object.values(cart).reduce((sum, q) => sum + q, 0);
}

const round2 = (n) => Math.round(n * 100) / 100;

// Prices always come from server-side product data, never from the client.
export function buildCartSummary(cart) {
  const items = Object.entries(cart).map(([id, qty]) => {
    const p = getProductById(id);
    return {
      id: p.id,
      name: p.name,
      image: p.image,
      price: p.price,
      stock: p.stock,
      qty,
      lineTotal: round2(p.price * qty),
    };
  });
  const subtotal = round2(items.reduce((s, i) => s + i.lineTotal, 0));
  const shipping = items.length === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
  const tax = round2(subtotal * TAX_RATE);
  const total = round2(subtotal + tax + shipping);
  return { items, count: cartCount(cart), subtotal, shipping, tax, total };
}

export const money = (n) => `$${Number(n).toFixed(2)}`;
