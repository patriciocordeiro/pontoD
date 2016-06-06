'use strict'
/*Crete a mongoose Schema*/
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    fullName: String,
    gender: String,
    email: String,
    password: String,
    empId: {
        type: String,
        index: {
            unique: true
        }
    },
    birthDate: String,
    maritalStatus: String,
    age: String,
    phone: String,
    admissionDate: Date, //data de contratação
    education: String,
    educationLevel: String,
    department: String,
    jobTitle: String, //cargo na empresa
    imgPath: String,


});
// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, this.password);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema, 'user');
