const Post = require('../models/Post');

exports.getAboutPage = (req, res) => {
  res.render('about');
};

exports.getAddPage = (req, res) => {
  res.render('add_post');
};

exports.getIndexPage = async (req, res) => {
  const posts = await Post.find({}).sort('-dateCreated');
  res.render('index', {
    posts,
  });
};

exports.getEditPage = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.render('edit', {
    post,
  });
};
