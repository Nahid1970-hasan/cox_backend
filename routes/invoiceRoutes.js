const express = require("express");
const router = express.Router();

const {
  listInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  generateInvoicePDF,
} = require("../controllers/invoiceController");

router
  .route("/invoices")
  .get(listInvoices)
  .post(createInvoice);

router
  .route("/invoice_generate")
  .get(listInvoices)
  .post(createInvoice);

router.get("/invoice_generate/:invoiceId", generateInvoicePDF);

router
  .route("/invoices/:invoiceId")
  .get(getInvoiceById)
  .put(updateInvoice)
  .patch(updateInvoice);

router
  .route("/add_invoice")
  .get(listInvoices)
  .post(createInvoice);

router
  .route("/update_invoice/:invoiceId")
  .get(getInvoiceById)
  .put(updateInvoice)
  .patch(updateInvoice);

router.delete("/delete_invoice/:invoiceId", deleteInvoice);

module.exports = router;
