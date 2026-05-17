const ProjectModel = require("../models/projectModel");

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

exports.listProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.findAll();
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.publicDashboard = async (req, res) => {
  try {
    const projects = await ProjectModel.findActive();
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await ProjectModel.findById(req.params.projectId);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { name, url, img, date, is_active } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "name is required" });
    }
    if (!isValidDate(date)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date. Use YYYY-MM-DD",
      });
    }

    const project = await ProjectModel.create({
      name,
      url,
      img,
      date: toMysqlDate(date),
      is_active: is_active === undefined ? 1 : is_active ? 1 : 0,
    });

    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const existing = await ProjectModel.findById(projectId);
    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    const { name, url, img, date, is_active } = req.body;

    if (date !== undefined && !isValidDate(date)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date. Use YYYY-MM-DD",
      });
    }

    const fields = {};
    if (name !== undefined) fields.name = name;
    if (url !== undefined) fields.url = url;
    if (img !== undefined) fields.img = img;
    if (date !== undefined) fields.date = toMysqlDate(date);
    if (is_active !== undefined) fields.is_active = is_active ? 1 : 0;

    const updated = await ProjectModel.update(projectId, fields);
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const deleted = await ProjectModel.remove(req.params.projectId);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    res.status(200).json({ success: true, message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
