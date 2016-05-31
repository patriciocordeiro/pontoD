'use strict'
/*Crete a mongoose Schema*/
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    'Nomecompleto': String,
    sexo: String,
    imgPath: String,
    email: String,
    id: String,
    'Data de nascimento': String,
    'Estado civil': String,
    Idade: String,
    Ramal: String,
    'data de contratação': String,
    'Formação': String,
    Departamento: String,
    'Cargo/Função': String


});
module.exports = mongoose.model('User', userSchema, 'user');
