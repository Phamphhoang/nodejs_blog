const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const redirectAuthenticated = require('../middlewares/redirectAuthenticated');


router.get('/register',redirectAuthenticated, authController.getRegister);
router.post('/register',redirectAuthenticated, authController.postRegister);

router.get('/login',redirectAuthenticated,  authController.getLogin);
router.post('/login',redirectAuthenticated,  authController.postLogin);

router.post('/logout',redirectAuthenticated,  authController.getLogout);

module.exports = router;
