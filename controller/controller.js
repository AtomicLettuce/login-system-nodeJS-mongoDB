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

controller.registerPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'sites', 'register', 'index.html'));
}


controller.delete  = async (req, res) => {
    // Delete image
    let post = await Post.findOne({"_id":req.body.id});
    let filePath = path.join(__dirname,'..','public',post.image)
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Error deleting file:", err);
        } else {
            console.log(`File at ${filePath} deleted successfully`);
        }
    });
    // Delete database entry aswell
    await Post.deleteOne({"_id":req.body.id });
}


controller.publish = async (req, res) => {
    // Access form fields and file
    const title = req.body.title;
    const description = req.body.description;
    const uploadedFile = req.file;

    // Create new database entry
    try {
        // Get username
        let username = jwt.verify(req.cookies.token, process.env.JWT_SECRET).id
        // create entry
        let post = new Post({
            title: title,
            image: 'images/'+ uploadedFile.filename,
            description: description,
            user: username,
        });
        await post.save();
    } catch (err) {
        console.error('Error verifying JWT:', err.message);
        return null;
    }
}

controller.posts = async (req, res) => {
    // Get all posts from a user
    let username = jwt.verify(req.cookies.token, process.env.JWT_SECRET).id

    let posts = await Post.find({user:username});
    res.json(posts)
}




module.exports = controller;