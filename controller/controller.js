const fs = require('fs')
const path = require('path');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const controller = {};

controller.index = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'sites', 'login', 'index.html'));
}

controller.album = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'sites', 'album', 'index.html'));
}



controller.publish = async (req, res) => {
    // Access form fields and file
    const title = req.body.title;
    const description = req.body.description;
    const uploadedFile = req.file;



    // Log received data
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Uploaded File:', uploadedFile);
    console.log('user:', req.cookies.token)

    try {
        let username = jwt.verify(req.cookies.token, process.env.JWT_SECRET).id
        console.log(username)

        let post = new Post({
            title: title,
            image: uploadedFile.destination+uploadedFile.filename,
            description: description,
            user: username,
        });
        await post.save();
    } catch (err) {
        console.error('Error verifying JWT:', err.message);
        return null;
    }
    // console.log(req)


    /*try {
        let post = await Post.findOne({ username, title });
        if (post) return res.status(400).json({ msg: 'Post already exists' });

        // let file extension = filename.split('.').pop();??????????????????????????????????????????????????????????
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
    }*/
}




module.exports = controller;