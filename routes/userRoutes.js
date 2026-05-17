const express = require("express");
const router = express.Router();

const {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");

router
  .route("/dashboarduser")
  .get(listUsers)
  .post(createUser);

router
  .route("/alluser")
  .get(listUsers)
  .post(createUser);

router
  .route("/alluser/:id")
  .get(getUserById)
  .put(updateUser)
  .patch(updateUser);

router
  .route("/addusers")
  .get(listUsers)
  .post(createUser);

router
  .route("/updateusers/:id/role")
  .put(updateUserRole)
  .patch(updateUserRole);

router
  .route("/updateusers/:id")
  .get(getUserById)
  .put(updateUser)
  .patch(updateUser);

router.delete("/deleteusers/:id", deleteUser);

module.exports = router;
