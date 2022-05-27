const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const ejs = require('ejs');

const pageController = require('./controllers/page_controllers');
const postController = require('./controllers/post_controllers');

require('dotenv').config();
const app = express();
mongoose.connect(
  `mongodb+srv://czechaj:${process.env.DB_KEY}@cluster0.hiuog.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.get('/', pageController.getIndexPage);
app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPage);
app.get('/posts/edit/:id', pageController.getEditPage);

app.post('/createPost', postController.createPost);
app.get('/post/:id', postController.getPost);
app.put('/post/:id', postController.editPost);
app.delete('/posts/:id', postController.deletePost);

app.listen(process.env.PORT || 3000);
