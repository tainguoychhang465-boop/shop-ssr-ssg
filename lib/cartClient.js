// Browser helpers: call the cart API and notify the header badge.
export async function updateCart(action, id, qty) {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, id, qty }),
  });
  const data = await res.json();
  window.dispatchEvent(new CustomEvent("cart-updated", { detail: data.count }));
  return data;
}

export function readCartCountFromCookie() {
  const match = document.cookie.match(/(?:^|;\s*)cart=([^;]*)/);
  if (!match) return 0;
  try {
    const cart = JSON.parse(decodeURIComponent(match[1]));
    return Object.values(cart).reduce((s, q) => s + Number(q || 0), 0);
  } catch {
    return 0;
  }
}
