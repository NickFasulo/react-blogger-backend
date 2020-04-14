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

// GET one blog
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
  return res.json('PUT a blog');
});

// DELETE a blog
router.delete('/', (req, res) => {
  return res.send('deleted a blog');
});

module.exports = router;
