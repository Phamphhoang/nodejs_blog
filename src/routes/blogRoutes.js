const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const validateCreatePost = require('../middlewares/validateCreatePost');
const authMiddlewares = require('../middlewares/authMiddlewares');
const postMiddlewares = [authMiddlewares, validateCreatePost];

router.get('/home', blogController.getHome);
router.get('/detail/:id', blogController.getDetail);
router.get('/create/blog',authMiddlewares, blogController.getCreate);
router.post('/post/create', postMiddlewares, blogController.postCreate);

module.exports = router;
