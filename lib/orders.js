import fs from "fs";
import path from "path";

// Simple JSON-file "database" for orders (server-side only).
const FILE = path.join(process.cwd(), "data", "orders.json");

function readAll() {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    return [];
  }
}

export function saveOrder(order) {
  const orders = readAll();
  orders.push(order);
  fs.writeFileSync(FILE, JSON.stringify(orders, null, 2));
  return order;
}

export function getOrder(id) {
  return readAll().find((o) => o.id === id) || null;
}

export function newOrderId() {
  const d = new Date();
  const ymd = d.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `INV-${ymd}-${rand}`;
}
