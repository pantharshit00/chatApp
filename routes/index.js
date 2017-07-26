const express = require('express')
const router = express.Router();
const err = require('../config/errors')
const chatController = require('../controllers/chatControllers');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get('/',chatController.handleIndex);
router.post('/register',err.catchErrors(userController.validateRegister),
                        err.catchErrors(userController.register),
                        authController.login
)
router.post('/login',authController.login);

router.get('/chat',authController.isLoggedIn, chatController.handleChat);


module.exports = router;