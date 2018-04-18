var mongoose = require ('mongoose');

var userSchema = new mongoose.Schema({
    id: String,
    pseudo: String,
    password: String,
    firstName: String,
    lastName: String,
    birthDate: Date,
    email: String,
    hasPaid: String
});

var User = mongoose.model('User', userSchema);
module.exports= User;