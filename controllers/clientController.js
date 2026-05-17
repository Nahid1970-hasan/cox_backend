const ClientModel = require("../models/clientModel");

const isValidEmail = (email) =>
  typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

exports.listClients = async (req, res) => {
  try {
    const clients = await ClientModel.findAll();
    res.status(200).json({
      success: true,
      count: clients.length,
      data: clients,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.publicDashboard = async (req, res) => {
  try {
    const clients = await ClientModel.findActive();
    res.status(200).json({
      success: true,
      count: clients.length,
      data: clients,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await ClientModel.findById(req.params.clientId);
    if (!client) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }
    res.status(200).json({ success: true, data: client });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createClient = async (req, res) => {
  try {
    const { client_name, address, phone_no, email, is_active } = req.body;

    if (!client_name) {
      return res
        .status(400)
        .json({ success: false, message: "client_name is required" });
    }
    if (email && !isValidEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    if (email) {
      const existing = await ClientModel.findByEmail(email);
      if (existing) {
        return res
          .status(409)
          .json({ success: false, message: "Email already in use" });
      }
    }

    const client = await ClientModel.create({
      client_name,
      address,
      phone_no,
      email,
      is_active: is_active === undefined ? 1 : is_active ? 1 : 0,
    });

    res.status(201).json({ success: true, data: client });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const { clientId } = req.params;
    const existing = await ClientModel.findById(clientId);
    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }

    const { client_name, address, phone_no, email, is_active } = req.body;

    if (email !== undefined && email !== null && email !== "" && !isValidEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    const fields = {};
    if (client_name !== undefined) fields.client_name = client_name;
    if (address !== undefined) fields.address = address;
    if (phone_no !== undefined) fields.phone_no = phone_no;
    if (email !== undefined) fields.email = email || null;
    if (is_active !== undefined) fields.is_active = is_active ? 1 : 0;

    const updated = await ClientModel.update(clientId, fields);
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const deleted = await ClientModel.remove(req.params.clientId);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Client not found" });
    }
    res.status(200).json({ success: true, message: "Client deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
