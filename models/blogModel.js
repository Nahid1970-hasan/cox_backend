const db = require("../config/db");

const FIELDS =
  "blog_id, title, description, img, author, date, is_active, created_at, updated_at";

const BlogModel = {
  async findAll() {
    const [rows] = await db.query(
      `SELECT ${FIELDS} FROM blogs ORDER BY blog_id DESC`
    );
    return rows;
  },

  async findActive() {
    const [rows] = await db.query(
      `SELECT ${FIELDS} FROM blogs WHERE is_active = 1 ORDER BY date DESC, blog_id DESC`
    );
    return rows;
  },

  async findById(blogId) {
    const [rows] = await db.query(
      `SELECT ${FIELDS} FROM blogs WHERE blog_id = ?`,
      [blogId]
    );
    return rows[0];
  },

  async findImageById(blogId) {
    const [rows] = await db.query(
      "SELECT blog_id, title, img FROM blogs WHERE blog_id = ?",
      [blogId]
    );
    return rows[0];
  },

  async create({ title, description, img, author, date, is_active }) {
    const [result] = await db.query(
      `INSERT INTO blogs (title, description, img, author, date, is_active)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        title,
        description ?? null,
        img ?? null,
        author ?? null,
        date ?? null,
        is_active ?? 1,
      ]
    );
    return this.findById(result.insertId);
  },

  async update(blogId, fields) {
    const allowed = [
      "title",
      "description",
      "img",
      "author",
      "date",
      "is_active",
    ];
    const updates = [];
    const values = [];

    for (const key of allowed) {
      if (fields[key] !== undefined) {
        updates.push(`${key} = ?`);
        values.push(fields[key]);
      }
    }

    if (updates.length === 0) return this.findById(blogId);

    values.push(blogId);
    const [result] = await db.query(
      `UPDATE blogs SET ${updates.join(", ")} WHERE blog_id = ?`,
      values
    );
    if (result.affectedRows === 0) return null;
    return this.findById(blogId);
  },

  async remove(blogId) {
    const [result] = await db.query(
      "DELETE FROM blogs WHERE blog_id = ?",
      [blogId]
    );
    return result.affectedRows > 0;
  },
};

module.exports = BlogModel;
