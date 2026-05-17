const db = require("../config/db");

const FIELDS =
  "contact_id, name, email, phone, subject, message, is_read, created_at, updated_at";

const ContactModel = {
  async findAll() {
    const [rows] = await db.query(
      `SELECT ${FIELDS} FROM contacts ORDER BY contact_id DESC`
    );
    return rows;
  },

  async findById(contactId) {
    const [rows] = await db.query(
      `SELECT ${FIELDS} FROM contacts WHERE contact_id = ?`,
      [contactId]
    );
    return rows[0];
  },

  async create({ name, email, phone, subject, message, is_read }) {
    const [result] = await db.query(
      `INSERT INTO contacts (name, email, phone, subject, message, is_read)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name,
        email,
        phone ?? null,
        subject ?? null,
        message,
        is_read ?? 0,
      ]
    );
    return this.findById(result.insertId);
  },

  async remove(contactId) {
    const [result] = await db.query(
      "DELETE FROM contacts WHERE contact_id = ?",
      [contactId]
    );
    return result.affectedRows > 0;
  },
};

module.exports = ContactModel;
