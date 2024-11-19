const express = require('express');
const path = require('path');
const router = express.Router();
const controller = require('../controller/controller')
const multer = require('multer');
const crypto = require('crypto'); // For generating random filenames


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images/');
    },
    filename: (req, file, cb) => {
        // Generate a random string
        const randomName = crypto.randomBytes(16).toString('hex'); // 16 bytes = 32-character string
        const ext = path.extname(file.originalname); // Extract the original file extension
        const newName = `${randomName}${ext}`; // Combine the random string with the file extension
        console.log('a')
        cb(null, newName); // Save the file with the new name
        console.log('b')
    },
});

const upload = multer({ storage });

// Serve static files from the "public" directory
router.use(express.static(path.join(__dirname, '..', 'public')));

router.get('/', controller.index);

// Publish post route
router.post('/publish', upload.single('image'), controller.publish);

// Album route
router.get('/album', controller.album);


module.exports = router;