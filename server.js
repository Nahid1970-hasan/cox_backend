const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/db");

const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const clientRoutes = require("./routes/clientRoutes");
const blogRoutes = require("./routes/blogRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const companyInfoRoutes = require("./routes/companyInfoRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Node.js + MySQL backend is running",
  });
});

app.use("/api", userRoutes);
app.use("/api", projectRoutes);
app.use("/api", clientRoutes);
app.use("/api", blogRoutes);
app.use("/api", invoiceRoutes);
app.use("/api", companyInfoRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
