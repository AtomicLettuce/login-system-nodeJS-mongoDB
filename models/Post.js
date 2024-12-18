const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true},
    image: { type: String, required: false},
    description: { type: String, required: true},
    user: { type: String, required: true},
});

module.exports = mongoose.model('Post', PostSchema);