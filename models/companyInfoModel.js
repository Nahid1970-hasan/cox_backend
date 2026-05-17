const db = require("../config/db");

const FIELDS = `com_id, company_name, logo, email, phone, address, website,
  about, is_active, created_at, updated_at`;

const ALLOWED = [
  "company_name",
  "logo",
  "email",
  "phone",
  "address",
  "website",
  "about",
  "is_active",
];

const CompanyInfoModel = {
  async findAll() {
    const [rows] = await db.query(
      `SELECT ${FIELDS} FROM company_info ORDER BY com_id DESC`
    );
    return rows;
  },

  async findById(comId) {
    const [rows] = await db.query(
      `SELECT ${FIELDS} FROM company_info WHERE com_id = ?`,
      [comId]
    );
    return rows[0];
  },

  async create(payload) {
    const cols = [];
    const placeholders = [];
    const values = [];
    for (const key of ALLOWED) {
      if (payload[key] !== undefined) {
        cols.push(key);
        placeholders.push("?");
        values.push(payload[key]);
      }
    }

    if (cols.length === 0) {
      cols.push("company_name");
      placeholders.push("?");
      values.push(payload.company_name);
    }

    const [result] = await db.query(
      `INSERT INTO company_info (${cols.join(", ")}) VALUES (${placeholders.join(", ")})`,
      values
    );
    return this.findById(result.insertId);
  },

  async update(comId, fields) {
    const updates = [];
    const values = [];
    for (const key of ALLOWED) {
      if (fields[key] !== undefined) {
        updates.push(`${key} = ?`);
        values.push(fields[key]);
      }
    }

    if (updates.length === 0) return this.findById(comId);

    values.push(comId);
    const [result] = await db.query(
      `UPDATE company_info SET ${updates.join(", ")} WHERE com_id = ?`,
      values
    );
    if (result.affectedRows === 0) return null;
    return this.findById(comId);
  },

  async remove(comId) {
    const [result] = await db.query(
      "DELETE FROM company_info WHERE com_id = ?",
      [comId]
    );
    return result.affectedRows > 0;
  },
};

module.exports = CompanyInfoModel;
