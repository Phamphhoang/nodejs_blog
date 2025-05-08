const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const expressSession = require('express-session');

const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'keyboard cat' }));

// Template engine
const { engine } = require('express-handlebars');
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Truyền biến loggedIn vào mọi view
app.use((req, res, next) => {
  res.locals.loggedIn = req.session.userId || null;
  next();
});

// Routes
app.use('/', blogRoutes);
app.use('/auth', authRoutes);

// 404 fallback
app.use((req, res) => {
  // res.status(404).send("Page not found");
  res.render("notFound");
});

module.exports = app;
