const bcrypt = require("bcryptjs");
const UserModel = require("../models/userModel");

const ALLOWED_ROLES = ["admin", "manager", "staff", "user"];

const isValidEmail = (email) =>
  typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

exports.listUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, phone, age, role, is_active } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "name, email and password are required",
      });
    }
    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    if (role && !ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role. Allowed: ${ALLOWED_ROLES.join(", ")}`,
      });
    }

    const existing = await UserModel.findByEmail(email);
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Email already in use" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: hashed,
      phone,
      age,
      role,
      is_active: is_active === undefined ? 1 : is_active ? 1 : 0,
    });

    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await UserModel.findById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const { name, email, password, phone, age, role, is_active } = req.body;

    if (email !== undefined && !isValidEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    if (role !== undefined && !ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role. Allowed: ${ALLOWED_ROLES.join(", ")}`,
      });
    }

    const fields = {};
    if (name !== undefined) fields.name = name;
    if (email !== undefined) fields.email = email;
    if (phone !== undefined) fields.phone = phone;
    if (age !== undefined) fields.age = age;
    if (role !== undefined) fields.role = role;
    if (is_active !== undefined) fields.is_active = is_active ? 1 : 0;
    if (password) fields.password = await bcrypt.hash(password, 10);

    const updated = await UserModel.update(id, fields);
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role) {
      return res
        .status(400)
        .json({ success: false, message: "role is required" });
    }
    if (!ALLOWED_ROLES.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role. Allowed: ${ALLOWED_ROLES.join(", ")}`,
      });
    }

    const updated = await UserModel.updateRole(id, role);
    if (!updated) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await UserModel.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
