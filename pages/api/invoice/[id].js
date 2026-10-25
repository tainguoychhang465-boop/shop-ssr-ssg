import { getOrder } from "../../../lib/orders";
import { renderInvoiceHtml } from "../../../lib/invoiceHtml";

// GET /api/invoice/INV-xxx            -> view invoice as raw .html
// GET /api/invoice/INV-xxx?download=1 -> download INV-xxx.html
export default function handler(req, res) {
  const order = getOrder(req.query.id);
  if (!order) return res.status(404).send("Invoice not found");

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  if (req.query.download) {
    res.setHeader("Content-Disposition", `attachment; filename="${order.id}.html"`);
  }
  const proto = req.headers["x-forwarded-proto"] || "http";
  const origin = `${proto}://${req.headers.host}`;
  res.status(200).send(renderInvoiceHtml(order, origin));
}
