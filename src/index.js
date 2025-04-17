const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

// ===== Middleware ===== //
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend:true}));



// ===== Template Engine ===== //
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

async function run(res) {
 
}

// ===== Routes ===== //
app.get('/home', (req, res) => res.render('home'));

app.get('/news', (req, res) => res.render('news'));

app.get('/post/create', (req, res) => res.render('create'));

app.post('/post/create', async (req, res) => {
  try {
    await BlogPost.create(req.body); 
    res.redirect('/home');
  } catch (error) {
    console.error('Lỗi tạo blog post:', error);
    res.status(500).send('Có lỗi xảy ra khi tạo bài viết');
  }
});

app.get('/about', (req, res) => {
  res.json({ name: 'Hoang Pham', age: 26 });
});

// 404 handler (should always be last)
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// ===== Start Server ===== //
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
