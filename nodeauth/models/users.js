var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.connect('mongodb://localhost/nodeauth');

// User Schema;
var UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    name: {
        type: String
    }
});


var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function (newUser, callback) {
    newUser.save(callback);
};