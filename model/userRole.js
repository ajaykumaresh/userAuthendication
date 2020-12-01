const mongoose = require('mongoose');
const Schema = mongoose.Schema;
console.log(mongoose.connection.readyState);
var Comment = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    phoneNumber: Number,
    password: String,
    role: String,
    isActivate: Boolean,
    date: Date
});
module.exports = mongoose.model("Comment", Comment);