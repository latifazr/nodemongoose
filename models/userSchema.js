var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
    email:String,
    password:String,
    Todo:[{type:mongoose.Schema.Types.ObjectId,ref:'todo'}]
});


module.exports = mongoose.model('user',UserSchema);