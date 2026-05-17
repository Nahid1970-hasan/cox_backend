const express = require("express");
const router = express.Router();

const {
  listContacts,
  createContact,
  deleteContact,
} = require("../controllers/contactController");

router
  .route("/contacts")
  .get(listContacts)
  .post(createContact);

router
  .route("/save_contacts")
  .get(listContacts)
  .post(createContact);

router.delete("/delete_contacts/:contactId", deleteContact);

module.exports = router;
