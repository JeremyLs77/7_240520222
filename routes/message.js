// Imports
const express = require('express');
const router = express.Router();
const messageCtrl = require('../controllers/message');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

// Routes
router.post('/create', multer, messageCtrl.createMessage);
router.get('/getallmessages', messageCtrl.getallMessages);
router.post('/editmessage', messageCtrl.editMessage);
router.delete('/deleteMessage/:id', messageCtrl.deleteMessage);

// Exports
module.exports = router;