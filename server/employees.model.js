'use strict'
/*Crete a mongoose Schema*/
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    'fullName': String,
    sex: String,
    email: String,
    password: String,
    empId: String,
    'birthDate': String,
    'maritalStatus': String,
    age: String,
    phone: String,
    'admissionDate': Date, //data de contratação
    'education': String,
    department: String,
    'function': String,
    'imgPath': String,


});
// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, this.password);
};

userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema, 'user');