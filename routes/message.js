// Imports
const express = require('express');
const router = express.Router();
const messageCtrl = require('../Controllers/message');
const auth = require('../middelware/auth');
const multer = require('../middelware/multer-config');

// Routes
router.get('/', auth, messageCtrl.getAllMessages);
router.post('/', auth, multer, messageCtrl.createMessage);
router.get('/:id', auth, messageCtrl.getOneMessage);
router.delete('/:id', auth, messageCtrl.deleteMessage);

// Exports
module.exports = router;