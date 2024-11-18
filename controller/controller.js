const fs = require('fs')
const path = require('path');
const Post = require('../models/Post');
const controller = {};

controller.index = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'sites', 'login', 'index.html'));
}

controller.album = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'sites', 'album', 'index.html'));
}

controller.publish = async (req, res) => {
    const image = req.image;
    try {
        let post = await Post.findOne({ username, title });
        if (post) return res.status(400).json({ msg: 'Post already exists' });

        let imgFilename ='../public/images/'+req.body.title + '-' + req.body.user
        fs.writeFile(imgFilename, image.buffer, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save image file.' });
            }
        });


        post = new Post({
            title: req.body.title,
            image: imgFilename,
            description: req.body.description,
            user: req.body.user,
        });
        await post.save();
        res.json({ message: 'Image and data uploaded successfully!'});
    } catch (error) {
        res.status(500).send('Server error');
    }
}




module.exports = controller;