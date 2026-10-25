import { money } from "./cart";

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// Builds a standalone invoice .html document (downloadable / printable).
// `origin` (e.g. http://localhost:3000) makes product image URLs absolute.
export function renderInvoiceHtml(order, origin = "") {
  const rows = order.items
    .map(
      (i, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td><div class="prod">${i.image ? `<img src="${esc(origin + i.image)}" alt="" />` : ""}${esc(i.name)}</div></td>
        <td class="r">${money(i.price)}</td>
        <td class="r">${i.qty}</td>
        <td class="r">${money(i.lineTotal)}</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>Invoice ${esc(order.id)}</title>
<style>
  body { font-family: Arial, Helvetica, sans-serif; color: #1f2937; margin: 0; background: #f3f4f6; }
  .page { max-width: 800px; margin: 30px auto; background: #fff; padding: 40px; border-radius: 8px; }
  .top { display: flex; justify-content: space-between; border-bottom: 3px solid #2563eb; padding-bottom: 16px; }
  h1 { margin: 0; color: #2563eb; }
  .muted { color: #6b7280; font-size: 14px; }
  .cols { display: flex; justify-content: space-between; margin: 24px 0; gap: 24px; }
  table { width: 100%; border-collapse: collapse; }
  th, td { padding: 10px; border-bottom: 1px solid #e5e7eb; text-align: left; }
  th { background: #eff6ff; }
  .r { text-align: right; }
  .prod { display: flex; align-items: center; gap: 10px; }
  .prod img { width: 48px; height: 48px; object-fit: contain; border: 1px solid #e5e7eb; border-radius: 6px; }
  .totals { width: 300px; margin-left: auto; margin-top: 16px; }
  .totals td { border: none; padding: 6px 10px; }
  .grand td { font-size: 18px; font-weight: bold; border-top: 2px solid #1f2937; }
  .foot { margin-top: 40px; text-align: center; }
  @media print { body { background: #fff; } .page { margin: 0; } }
</style>
</head>
<body>
<div class="page">
  <div class="top">
    <div>
      <h1>TechShop</h1>
      <div class="muted">Phnom Penh, Cambodia · support@techshop.test</div>
    </div>
    <div style="text-align:right">
      <h2 style="margin:0">INVOICE</h2>
      <div><b>${esc(order.id)}</b></div>
      <div class="muted">${esc(new Date(order.createdAt).toLocaleString("en-GB"))}</div>
    </div>
  </div>

  <div class="cols">
    <div>
      <div class="muted">Bill to</div>
      <b>${esc(order.customer.name)}</b><br/>
      ${esc(order.customer.email)}<br/>
      ${esc(order.customer.phone)}<br/>
      ${esc(order.customer.address)}
    </div>
    <div style="text-align:right">
      <div class="muted">Payment method</div>
      <b>${esc(order.paymentMethod)}</b><br/>
      <div class="muted" style="margin-top:8px">Status</div>
      <b>${esc(order.status)}</b>
    </div>
  </div>

  <table>
    <thead>
      <tr><th>#</th><th>Product</th><th class="r">Price</th><th class="r">Qty</th><th class="r">Amount</th></tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>

  <table class="totals">
    <tr><td>Subtotal</td><td class="r">${money(order.subtotal)}</td></tr>
    <tr><td>Tax (10%)</td><td class="r">${money(order.tax)}</td></tr>
    <tr><td>Shipping</td><td class="r">${order.shipping ? money(order.shipping) : "Free"}</td></tr>
    <tr class="grand"><td>Total</td><td class="r">${money(order.total)}</td></tr>
  </table>

  <p class="foot muted">Thank you for shopping with TechShop!</p>
</div>
</body>
</html>`;
}
