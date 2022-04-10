const mongoose = require('mongoose');

//password is Mongodb@2001 and we have to write Mongodb%402001

/*new Schema = mongoose.Schema;*/

// const UserSchema = new Schema({
const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

var User = mongoose.model('User', UserSchema)
module.exports = User;