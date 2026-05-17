const express = require("express");
const router = express.Router();

const {
  listProjects,
  publicDashboard,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

router
  .route("/projectdashboard")
  .get(listProjects)
  .post(createProject);

router.get("/project_public_dashboard", publicDashboard);

router
  .route("/add_project")
  .get(listProjects)
  .post(createProject);

router
  .route("/projectall/:projectId")
  .get(getProjectById)
  .put(updateProject)
  .patch(updateProject);

router
  .route("/update_project/:projectId")
  .get(getProjectById)
  .put(updateProject)
  .patch(updateProject);

router.delete("/delete_project/:projectId", deleteProject);

module.exports = router;
