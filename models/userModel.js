const db = require("../config/db");

const PUBLIC_FIELDS =
  "id, name, email, phone, age, role, is_active, created_at, updated_at";

const UserModel = {
  async findAll() {
    const [rows] = await db.query(
      `SELECT ${PUBLIC_FIELDS} FROM users ORDER BY id DESC`
    );
    return rows;
  },

  async findById(id) {
    const [rows] = await db.query(
      `SELECT ${PUBLIC_FIELDS} FROM users WHERE id = ?`,
      [id]
    );
    return rows[0];
  },

  async findByEmail(email) {
    const [rows] = await db.query(
      `SELECT ${PUBLIC_FIELDS} FROM users WHERE email = ?`,
      [email]
    );
    return rows[0];
  },

  async create({ name, email, password, phone, age, role, is_active }) {
    const [result] = await db.query(
      `INSERT INTO users (name, email, password, phone, age, role, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        email,
        password,
        phone ?? null,
        age ?? null,
        role ?? "user",
        is_active ?? 1,
      ]
    );
    return this.findById(result.insertId);
  },

  async update(id, fields) {
    const allowed = ["name", "email", "password", "phone", "age", "role", "is_active"];
    const updates = [];
    const values = [];

    for (const key of allowed) {
      if (fields[key] !== undefined) {
        updates.push(`${key} = ?`);
        values.push(fields[key]);
      }
    }

    if (updates.length === 0) return this.findById(id);

    values.push(id);
    const [result] = await db.query(
      `UPDATE users SET ${updates.join(", ")} WHERE id = ?`,
      values
    );
    if (result.affectedRows === 0) return null;
    return this.findById(id);
  },

  async updateRole(id, role) {
    const [result] = await db.query(
      "UPDATE users SET role = ? WHERE id = ?",
      [role, id]
    );
    if (result.affectedRows === 0) return null;
    return this.findById(id);
  },

  async remove(id) {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },
};

module.exports = UserModel;
