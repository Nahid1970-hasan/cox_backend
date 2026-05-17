const db = require("../config/db");

const FIELDS =
  "project_id, name, url, img, date, is_active, created_at, updated_at";

const ProjectModel = {
  async findAll() {
    const [rows] = await db.query(
      `SELECT ${FIELDS} FROM projects ORDER BY project_id DESC`
    );
    return rows;
  },

  async findActive() {
    const [rows] = await db.query(
      `SELECT ${FIELDS} FROM projects WHERE is_active = 1 ORDER BY date DESC, project_id DESC`
    );
    return rows;
  },

  async findById(projectId) {
    const [rows] = await db.query(
      `SELECT ${FIELDS} FROM projects WHERE project_id = ?`,
      [projectId]
    );
    return rows[0];
  },

  async create({ name, url, img, date, is_active }) {
    const [result] = await db.query(
      `INSERT INTO projects (name, url, img, date, is_active)
       VALUES (?, ?, ?, ?, ?)`,
      [name, url ?? null, img ?? null, date ?? null, is_active ?? 1]
    );
    return this.findById(result.insertId);
  },

  async update(projectId, fields) {
    const allowed = ["name", "url", "img", "date", "is_active"];
    const updates = [];
    const values = [];

    for (const key of allowed) {
      if (fields[key] !== undefined) {
        updates.push(`${key} = ?`);
        values.push(fields[key]);
      }
    }

    if (updates.length === 0) return this.findById(projectId);

    values.push(projectId);
    const [result] = await db.query(
      `UPDATE projects SET ${updates.join(", ")} WHERE project_id = ?`,
      values
    );
    if (result.affectedRows === 0) return null;
    return this.findById(projectId);
  },

  async remove(projectId) {
    const [result] = await db.query(
      "DELETE FROM projects WHERE project_id = ?",
      [projectId]
    );
    return result.affectedRows > 0;
  },
};

module.exports = ProjectModel;
