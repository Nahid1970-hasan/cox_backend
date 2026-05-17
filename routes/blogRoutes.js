const express = require("express");
const router = express.Router();

const {
  listBlogs,
  publicDashboard,
  getBlogById,
  getBlogImage,
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

router.get("/blogs_public_dashboard", publicDashboard);

router
  .route("/blogdashboard")
  .get(listBlogs)
  .post(createBlog);

router
  .route("/add_blog")
  .get(listBlogs)
  .post(createBlog);

router.get("/blog_image/:blogId", getBlogImage);

router
  .route("/blogall/:blogId")
  .get(getBlogById)
  .put(updateBlog)
  .patch(updateBlog);

router
  .route("/update_blog/:blogId")
  .get(getBlogById)
  .put(updateBlog)
  .patch(updateBlog);

router.delete("/delete_blog/:blogId", deleteBlog);

module.exports = router;
