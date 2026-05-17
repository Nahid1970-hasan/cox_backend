const PDFDocument = require("pdfkit");
const InvoiceModel = require("../models/invoiceModel");

const ALLOWED_STATUS = ["draft", "sent", "paid", "overdue", "cancelled"];

const isValidDate = (value) => {
  if (value === null || value === undefined || value === "") return true;
  const d = new Date(value);
  return !isNaN(d.getTime());
};

const toMysqlDate = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const d = new Date(value);
  return d.toISOString().slice(0, 10);
};

const toNumber = (value, fallback = 0) => {
  if (value === null || value === undefined || value === "") return fallback;
  const n = Number(value);
  return isNaN(n) ? fallback : n;
};

const round2 = (n) => Math.round(n * 100) / 100;

const computeTotals = (items, taxRate, discount) => {
  const list = Array.isArray(items) ? items : [];
  const subtotal = round2(
    list.reduce((sum, it) => {
      const qty = toNumber(it.quantity, 0);
      const price = toNumber(it.unit_price, 0);
      const amount = it.amount !== undefined ? toNumber(it.amount, qty * price) : qty * price;
      return sum + amount;
    }, 0)
  );
  const taxAmount = round2((subtotal * toNumber(taxRate, 0)) / 100);
  const total = round2(subtotal + taxAmount - toNumber(discount, 0));
  return { subtotal, tax_amount: taxAmount, total };
};

const generateInvoiceNumber = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `INV-${yyyy}${mm}-${rand}`;
};

exports.listInvoices = async (req, res) => {
  try {
    const invoices = await InvoiceModel.findAll();
    res.status(200).json({
      success: true,
      count: invoices.length,
      data: invoices,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await InvoiceModel.findById(req.params.invoiceId);
    if (!invoice) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    }
    res.status(200).json({ success: true, data: invoice });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createInvoice = async (req, res) => {
  try {
    const {
      invoice_number,
      client_id,
      client_name,
      client_email,
      client_phone,
      client_address,
      issue_date,
      due_date,
      items,
      tax_rate,
      discount,
      status,
      notes,
    } = req.body;

    if (!client_name) {
      return res
        .status(400)
        .json({ success: false, message: "client_name is required" });
    }
    if (issue_date && !isValidDate(issue_date)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid issue_date" });
    }
    if (due_date && !isValidDate(due_date)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid due_date" });
    }
    if (status && !ALLOWED_STATUS.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed: ${ALLOWED_STATUS.join(", ")}`,
      });
    }

    let number = invoice_number;
    if (number) {
      const dup = await InvoiceModel.findByNumber(number);
      if (dup) {
        return res
          .status(409)
          .json({ success: false, message: "invoice_number already exists" });
      }
    } else {
      do {
        number = generateInvoiceNumber();
      } while (await InvoiceModel.findByNumber(number));
    }

    const totals = computeTotals(items, tax_rate, discount);

    const invoice = await InvoiceModel.create({
      invoice_number: number,
      client_id,
      client_name,
      client_email,
      client_phone,
      client_address,
      issue_date: toMysqlDate(issue_date),
      due_date: toMysqlDate(due_date),
      items,
      subtotal: totals.subtotal,
      tax_rate: toNumber(tax_rate, 0),
      tax_amount: totals.tax_amount,
      discount: toNumber(discount, 0),
      total: totals.total,
      status,
      notes,
    });

    res.status(201).json({ success: true, data: invoice });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const existing = await InvoiceModel.findById(invoiceId);
    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    }

    const body = req.body || {};

    if (body.issue_date !== undefined && !isValidDate(body.issue_date)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid issue_date" });
    }
    if (body.due_date !== undefined && !isValidDate(body.due_date)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid due_date" });
    }
    if (body.status !== undefined && !ALLOWED_STATUS.includes(body.status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed: ${ALLOWED_STATUS.join(", ")}`,
      });
    }
    if (body.invoice_number && body.invoice_number !== existing.invoice_number) {
      const dup = await InvoiceModel.findByNumber(body.invoice_number);
      if (dup) {
        return res
          .status(409)
          .json({ success: false, message: "invoice_number already exists" });
      }
    }

    const fields = {};
    const passthrough = [
      "invoice_number",
      "client_id",
      "client_name",
      "client_email",
      "client_phone",
      "client_address",
      "status",
      "notes",
    ];
    for (const key of passthrough) {
      if (body[key] !== undefined) fields[key] = body[key];
    }
    if (body.issue_date !== undefined) fields.issue_date = toMysqlDate(body.issue_date);
    if (body.due_date !== undefined) fields.due_date = toMysqlDate(body.due_date);

    const items = body.items !== undefined ? body.items : existing.items;
    const taxRate = body.tax_rate !== undefined ? body.tax_rate : existing.tax_rate;
    const discount = body.discount !== undefined ? body.discount : existing.discount;

    if (
      body.items !== undefined ||
      body.tax_rate !== undefined ||
      body.discount !== undefined
    ) {
      const totals = computeTotals(items, taxRate, discount);
      fields.items = items;
      fields.subtotal = totals.subtotal;
      fields.tax_rate = toNumber(taxRate, 0);
      fields.tax_amount = totals.tax_amount;
      fields.discount = toNumber(discount, 0);
      fields.total = totals.total;
    }

    const updated = await InvoiceModel.update(invoiceId, fields);
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const deleted = await InvoiceModel.remove(req.params.invoiceId);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    }
    res.status(200).json({ success: true, message: "Invoice deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.generateInvoicePDF = async (req, res) => {
  try {
    const invoice = await InvoiceModel.findById(req.params.invoiceId);
    if (!invoice) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    }

    const doc = new PDFDocument({ size: "A4", margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${invoice.invoice_number}.pdf"`
    );
    doc.pipe(res);

    doc.fontSize(20).text("INVOICE", { align: "right" });
    doc.moveDown(0.5);
    doc.fontSize(10).text(`Invoice #: ${invoice.invoice_number}`, { align: "right" });
    if (invoice.issue_date) {
      doc.text(`Issue date: ${String(invoice.issue_date).slice(0, 10)}`, { align: "right" });
    }
    if (invoice.due_date) {
      doc.text(`Due date: ${String(invoice.due_date).slice(0, 10)}`, { align: "right" });
    }
    doc.text(`Status: ${invoice.status}`, { align: "right" });

    doc.moveDown(1.5);
    doc.fontSize(12).text("Bill To:", { underline: true });
    doc.fontSize(10).text(invoice.client_name);
    if (invoice.client_email) doc.text(invoice.client_email);
    if (invoice.client_phone) doc.text(invoice.client_phone);
    if (invoice.client_address) doc.text(invoice.client_address);

    doc.moveDown(1);

    const tableTop = doc.y;
    const colDesc = 50;
    const colQty = 320;
    const colPrice = 380;
    const colAmount = 470;

    doc.fontSize(11).text("Description", colDesc, tableTop);
    doc.text("Qty", colQty, tableTop);
    doc.text("Unit Price", colPrice, tableTop);
    doc.text("Amount", colAmount, tableTop);
    doc
      .moveTo(50, tableTop + 15)
      .lineTo(550, tableTop + 15)
      .stroke();

    let y = tableTop + 25;
    const items = Array.isArray(invoice.items) ? invoice.items : [];
    doc.fontSize(10);
    items.forEach((it) => {
      const qty = toNumber(it.quantity, 0);
      const price = toNumber(it.unit_price, 0);
      const amt = it.amount !== undefined ? toNumber(it.amount, qty * price) : qty * price;

      doc.text(String(it.description ?? ""), colDesc, y, { width: 260 });
      doc.text(String(qty), colQty, y);
      doc.text(price.toFixed(2), colPrice, y);
      doc.text(amt.toFixed(2), colAmount, y);
      y += 20;
    });

    doc
      .moveTo(50, y + 5)
      .lineTo(550, y + 5)
      .stroke();
    y += 15;

    const lineRight = (label, value) => {
      doc.text(label, colPrice, y);
      doc.text(Number(value).toFixed(2), colAmount, y);
      y += 18;
    };

    lineRight("Subtotal:", invoice.subtotal);
    lineRight(`Tax (${Number(invoice.tax_rate).toFixed(2)}%):`, invoice.tax_amount);
    lineRight("Discount:", invoice.discount);
    doc.fontSize(12);
    lineRight("Total:", invoice.total);

    if (invoice.notes) {
      doc.moveDown(2);
      doc.fontSize(10).text("Notes:", { underline: true });
      doc.text(invoice.notes);
    }

    doc.end();
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
