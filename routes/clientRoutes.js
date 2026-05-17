const express = require("express");
const router = express.Router();

const {
  listClients,
  publicDashboard,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

router
  .route("/clientdashboard")
  .get(listClients)
  .post(createClient);

router.get("/client_public_dashboard", publicDashboard);

router
  .route("/add_client")
  .get(listClients)
  .post(createClient);

router
  .route("/clientall/:clientId")
  .get(getClientById)
  .put(updateClient)
  .patch(updateClient);

router
  .route("/update_client/:clientId")
  .get(getClientById)
  .put(updateClient)
  .patch(updateClient);

router.delete("/delete_client/:clientId", deleteClient);

module.exports = router;
