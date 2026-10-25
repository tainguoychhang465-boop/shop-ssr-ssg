import { useState } from "react";
import { updateCart } from "../lib/cartClient";

export default function AddToCartButton({ productId, qty = 1, className = "btn" }) {
  const [status, setStatus] = useState("idle");

  async function handleClick(e) {
    e.preventDefault();
    setStatus("loading");
    await updateCart("add", productId, qty);
    setStatus("added");
    setTimeout(() => setStatus("idle"), 1200);
  }

  return (
    <button className={className} onClick={handleClick} disabled={status === "loading"}>
      {status === "added" ? "✓ Added" : status === "loading" ? "Adding..." : "Add to cart"}
    </button>
  );
}
