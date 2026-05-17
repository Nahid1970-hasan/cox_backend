const express = require("express");
const router = express.Router();

const {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserRole,
  deleteUser,
  login,
  register,
  me,
  logout,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/login", login);
router.post("/auth/login", login);
router.post("/signin", login);

router.post("/register", register);
router.post("/auth/register", register);
router.post("/signup", register);

router.get("/me", protect, me);
router.get("/auth/me", protect, me);
router.get("/profile", protect, me);

router.post("/logout", logout);
router.post("/auth/logout", logout);

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
