'use strict'
/*Crete a mongoose Schema*/
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    'Nomecompleto': String,
    sexo: String,
    imgPath: String,
    email: String,
    password:String,
    id: String,
    'Data de nascimento': String,
    'Estado civil': String,
    Idade: String,
    telefone: String,
    'data de contratação': String,
    'Formação': String,
    Departamento: String,
    'Cargo/Função': String


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
