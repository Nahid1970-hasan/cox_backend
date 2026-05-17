const BlogModel = require("../models/blogModel");

const isValidDate = (value) => {
  if (value === null || value === undefined || value === "") return true;
  const d = new Date(value);
  return !isNaN(d.getTime());
};

const toMysqlDate = (value) => {
  if (value === null || value === undefined || value === "") return null;
  const d = new Date(value);
  return d.toISOString().slice(0, 10);
};

exports.listBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.findAll();
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.publicDashboard = async (req, res) => {
  try {
    const blogs = await BlogModel.findActive();
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBlogImage = async (req, res) => {
  try {
    const blog = await BlogModel.findImageById(req.params.blogId);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({
      success: true,
      data: {
        blog_id: blog.blog_id,
        title: blog.title,
        img: blog.img,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, description, img, author, date, is_active } = req.body;

    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "title is required" });
    }
    if (!isValidDate(date)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date. Use YYYY-MM-DD",
      });
    }

    const blog = await BlogModel.create({
      title,
      description,
      img,
      author,
      date: toMysqlDate(date),
      is_active: is_active === undefined ? 1 : is_active ? 1 : 0,
    });

    res.status(201).json({ success: true, data: blog });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const existing = await BlogModel.findById(blogId);
    if (!existing) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    const { title, description, img, author, date, is_active } = req.body;

    if (date !== undefined && !isValidDate(date)) {
      return res.status(400).json({
        success: false,
        message: "Invalid date. Use YYYY-MM-DD",
      });
    }

    const fields = {};
    if (title !== undefined) fields.title = title;
    if (description !== undefined) fields.description = description;
    if (img !== undefined) fields.img = img;
    if (author !== undefined) fields.author = author;
    if (date !== undefined) fields.date = toMysqlDate(date);
    if (is_active !== undefined) fields.is_active = is_active ? 1 : 0;

    const updated = await BlogModel.update(blogId, fields);
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const deleted = await BlogModel.remove(req.params.blogId);
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
