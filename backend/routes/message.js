// Imports
const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');
const auth = require('../middlewares/auth');
const authAdmin = require('../middlewares/authAdmin');
const multer = require('../middlewares/multer-config');

// Routes
router.post('/create', auth, multer, messageCtrl.createMessage);
router.get('/getallmessages', auth, messageCtrl.getallMessages);
router.post('/editmessage', auth, messageCtrl.editMessage);
router.delete("/deletemessage", authAdmin, messageCtrl.deleteMessage);

// Exports
module.exports = router;