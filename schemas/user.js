const mongoose = require('mongoose');
const crypto = require('crypto');
const uuid = require('node-uuid');

const UserSchema = mongoose.Schema({
	email : { type: String, required: true },
    hashed: { type: String, required: true },
    salt: { type: String, required: true, default: uuid.v1 }
});


var hash = function(pass, salt) {
    return crypto.createHmac('sha256', salt).update(pass).digest('hex');
};

UserSchema.methods.setPassword = function(passwordString) {
    this.hashed = hash(passwordString, this.salt);
};

UserSchema.methods.createUser = function(req,res,next) {
	//the first thing to do: hash the password
    this.setPassword(req.body.password);

	this.save(function(err, user) {
        //if there is an error, raise it
        if(err || !user) res.send({  success: false })
        return res.send({ success: true })
    });
};

module.exports = mongoose.model('User', UserSchema)
