const mongoose = require('mongoose');

let noteSchema = new mongoose.Schema({
    title: String,
    body: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    
    /*Nota: Cada nota vai pertencer a um usuário, onde o tipo dele vai ser o ObjectId referenciado pelo mongoose na hora da criação e sempre será requirido. */
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Note', noteSchema);