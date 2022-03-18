const Post = require('../models/Post');

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post,
  });
};

exports.createPost = async (req, res) => {
  await Post.create(req.body);
  res.redirect('/');
};

exports.editPost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  post.title = req.body.title;
  post.detail = req.body.detail;
  post.save();

  await res.redirect(`/post/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  await Post.deleteOne({ _id: req.params.id });
  await res.redirect('/');
};
