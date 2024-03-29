// Imports
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userCtrl = require('../controllers/user');

// Routes
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/updateUser', auth, userCtrl.updateUser);
router.post('/deleteUser/:id', auth, userCtrl.deleteUser);

// Exports
module.exports = router;