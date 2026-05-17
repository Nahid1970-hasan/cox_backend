const db = require("../config/db");

const FIELDS = `invoice_id, invoice_number, client_id, client_name, client_email,
  client_phone, client_address, issue_date, due_date, items,
  subtotal, tax_rate, tax_amount, discount, total, status, notes,
  created_at, updated_at`;

const parseItems = (row) => {
  if (!row) return row;
  if (row.items && typeof row.items === "string") {
    try {
      row.items = JSON.parse(row.items);
    } catch {
      row.items = [];
    }
  }
  return row;
};

const InvoiceModel = {
  async findAll() {
    const [rows] = await db.query(
      `SELECT ${FIELDS} FROM billing_invoices ORDER BY invoice_id DESC`
    );
    return rows.map(parseItems);
  },

  async findById(invoiceId) {
    const [rows] = await db.query(
      `SELECT ${FIELDS} FROM billing_invoices WHERE invoice_id = ?`,
      [invoiceId]
    );
    return parseItems(rows[0]);
  },

  async findByNumber(invoiceNumber) {
    const [rows] = await db.query(
      `SELECT ${FIELDS} FROM billing_invoices WHERE invoice_number = ?`,
      [invoiceNumber]
    );
    return parseItems(rows[0]);
  },

  async create(payload) {
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
      subtotal,
      tax_rate,
      tax_amount,
      discount,
      total,
      status,
      notes,
    } = payload;

    const [result] = await db.query(
      `INSERT INTO billing_invoices
        (invoice_number, client_id, client_name, client_email, client_phone,
         client_address, issue_date, due_date, items, subtotal, tax_rate,
         tax_amount, discount, total, status, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        invoice_number,
        client_id ?? null,
        client_name,
        client_email ?? null,
        client_phone ?? null,
        client_address ?? null,
        issue_date ?? null,
        due_date ?? null,
        items ? JSON.stringify(items) : null,
        subtotal ?? 0,
        tax_rate ?? 0,
        tax_amount ?? 0,
        discount ?? 0,
        total ?? 0,
        status ?? "draft",
        notes ?? null,
      ]
    );
    return this.findById(result.insertId);
  },

  async update(invoiceId, fields) {
    const allowed = [
      "invoice_number",
      "client_id",
      "client_name",
      "client_email",
      "client_phone",
      "client_address",
      "issue_date",
      "due_date",
      "items",
      "subtotal",
      "tax_rate",
      "tax_amount",
      "discount",
      "total",
      "status",
      "notes",
    ];

    const updates = [];
    const values = [];

    for (const key of allowed) {
      if (fields[key] !== undefined) {
        updates.push(`${key} = ?`);
        values.push(
          key === "items" && fields[key] !== null
            ? JSON.stringify(fields[key])
            : fields[key]
        );
      }
    }

    if (updates.length === 0) return this.findById(invoiceId);

    values.push(invoiceId);
    const [result] = await db.query(
      `UPDATE billing_invoices SET ${updates.join(", ")} WHERE invoice_id = ?`,
      values
    );
    if (result.affectedRows === 0) return null;
    return this.findById(invoiceId);
  },

  async remove(invoiceId) {
    const [result] = await db.query(
      "DELETE FROM billing_invoices WHERE invoice_id = ?",
      [invoiceId]
    );
    return result.affectedRows > 0;
  },
};

module.exports = InvoiceModel;
