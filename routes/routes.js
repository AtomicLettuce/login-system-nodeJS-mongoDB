const express = require('express');
const path = require('path');
const router = express.Router();
const controller = require('../controller/controller')

// Serve static files from the "public" directory
router.use(express.static(path.join(__dirname, '..', 'public')));

router.get('/', controller.index);

// Publish post route
router.post('/publish', controller.publish);

// Album route
router.get('/album', controller.album);


module.exports = router;