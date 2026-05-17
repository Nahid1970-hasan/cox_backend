const db = require("../config/db");

const FIELDS =
  "client_id, client_name, address, phone_no, email, img, is_active, created_at, updated_at";

const ClientModel = {
  async findAll() {
    const [rows] = await db.query(
      `SELECT ${FIELDS} FROM clients ORDER BY client_id DESC`
    );
    return rows;
  },

  async findActive() {
    const [rows] = await db.query(
      `SELECT ${FIELDS} FROM clients WHERE is_active = 1 ORDER BY client_id DESC`
    );
    return rows;
  },

  async findById(clientId) {
    const [rows] = await db.query(
      `SELECT ${FIELDS} FROM clients WHERE client_id = ?`,
      [clientId]
    );
    return rows[0];
  },

  async findByEmail(email) {
    const [rows] = await db.query(
      `SELECT ${FIELDS} FROM clients WHERE email = ?`,
      [email]
    );
    return rows[0];
  },

  async create({ client_name, address, phone_no, email, img, is_active }) {
    const [result] = await db.query(
      `INSERT INTO clients (client_name, address, phone_no, email, img, is_active)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        client_name,
        address ?? null,
        phone_no ?? null,
        email ?? null,
        img ?? null,
        is_active ?? 1,
      ]
    );
    return this.findById(result.insertId);
  },

  async update(clientId, fields) {
    const allowed = ["client_name", "address", "phone_no", "email", "img", "is_active"];
    const updates = [];
    const values = [];

    for (const key of allowed) {
      if (fields[key] !== undefined) {
        updates.push(`${key} = ?`);
        values.push(fields[key]);
      }
    }

    if (updates.length === 0) return this.findById(clientId);

    values.push(clientId);
    const [result] = await db.query(
      `UPDATE clients SET ${updates.join(", ")} WHERE client_id = ?`,
      values
    );
    if (result.affectedRows === 0) return null;
    return this.findById(clientId);
  },

  async remove(clientId) {
    const [result] = await db.query(
      "DELETE FROM clients WHERE client_id = ?",
      [clientId]
    );
    return result.affectedRows > 0;
  },
};

module.exports = ClientModel;
