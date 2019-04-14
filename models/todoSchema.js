var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    titre:String,
    description:String,
    date_debut:String,
    date_fin:String,
});

module.exports = mongoose.model('todo',todoSchema);