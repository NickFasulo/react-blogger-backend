const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// GET all blogs
router.get('/', (req, res) => {
  Blog.find({})
    .then(blogs => {
      return res.status(200).json({ message: 'All blogs:', blogs });
    })
    .catch(err => res.status(500).json({ message: 'Server error', err }));
});

// GET one blog by ID
router.get('/:id', (req, res) => {
  Blog.findById({ _id: req.params.id })
    .then(blog => {
      return res.status(200).json({ message: 'Found blog:', blog });
    })
    .catch(err => res.status(500).json({ message: 'Server error', err }));
});

// POST a blog
router.post('/', (req, res) => {
  const newBlog = new Blog();
  newBlog.title = req.body.title;
  newBlog.author = req.body.author;
  newBlog.subject = req.body.subject;
  newBlog.article = req.body.article;
  newBlog.save();
  return res.json({ message: 'Blog created:', newBlog });
});

// PUT a blog
router.put('/', (req, res) => {
  const blogExists = blogs.filter(blog => blog._id === req.params.id);

  if (blogExists.length !== 0) {
    const { title, author } = req.body;
    const blog = blogExists[0];

    if (blog._id === req.params.id) {
      blog.title = title ? title : blog.title;
      blog.author = author ? author : blog.author;
      blog.subject = subject ? subject : blog.subject;
      blog.article = article ? article : blog.article;
      return res.json({ message: 'Blog updated:', blog });
    }
  } else {
    return res
      .status(400)
      .json({ message: `Blog with id: ${req.params.id} does not exist.` });
  }
});

// DELETE a blog
router.delete('/', (req, res) => {
  return res.send('deleted a blog');
});

module.exports = router;
