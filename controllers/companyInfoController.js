const CompanyInfoModel = require("../models/companyInfoModel");

const isValidEmail = (email) =>
  typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const normalizeBool = (v) => (v ? 1 : 0);

exports.listCompanyInfo = async (req, res) => {
  try {
    const rows = await CompanyInfoModel.findAll();
    res.status(200).json({ success: true, count: rows.length, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCompanyInfoById = async (req, res) => {
  try {
    const row = await CompanyInfoModel.findById(req.params.comId);
    if (!row) {
      return res
        .status(404)
        .json({ success: false, message: "Company info not found" });
    }
    res.status(200).json({ success: true, data: row });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createCompanyInfo = async (req, res) => {
  try {
    const {
      company_name,
      logo,
      email,
      phone,
      address,
      website,
      about,
      is_active,
    } = req.body;

    if (!company_name) {
      return res
        .status(400)
        .json({ success: false, message: "company_name is required" });
    }
    if (email && !isValidEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    const row = await CompanyInfoModel.create({
      company_name,
      logo,
      email,
      phone,
      address,
      website,
      about,
      is_active: is_active === undefined ? 1 : normalizeBool(is_active),
    });

    res.status(201).json({ success: true, data: row });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateCompanyInfo = async (req, res) => {
  try {
    const { comId } = req.params;
    const existing = await CompanyInfoModel.findById(comId);
    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "Company info not found" });
    }

    const body = req.body || {};

    if (body.email !== undefined && body.email !== null && body.email !== "" && !isValidEmail(body.email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    const fields = {};
    const passthrough = [
      "company_name",
      "logo",
      "phone",
      "address",
      "website",
      "about",
    ];
    for (const key of passthrough) {
      if (body[key] !== undefined) fields[key] = body[key];
    }
    if (body.email !== undefined) fields.email = body.email || null;
    if (body.is_active !== undefined) fields.is_active = normalizeBool(body.is_active);

    const updated = await CompanyInfoModel.update(comId, fields);
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteCompanyInfo = async (req, res) => {
  try {
    const deleted = await CompanyInfoModel.remove(req.params.comId);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Company info not found" });
    }
    res.status(200).json({ success: true, message: "Company info deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
