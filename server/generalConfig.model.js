(function() {
    'use strict';
    /*Crete a mongoose Schema*/
    var mongoose = require('mongoose');
    var configSchema = new mongoose.Schema({
        name: String,
        values: Array
    });

    module.exports = mongoose.model('Config', configSchema, 'config');
})();
