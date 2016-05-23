'use strict';
var wpi = require('wiring-pi');
var lcd = require('./lcd.config');
var keypad = require('./keypad.methods');
var waterfall = require('async-waterfall');
var ponto = require('./ponto.methods');


//initialize the wiringPi
wpi.wiringPiSetup();
//start keypad
keypad.on();
var LCD;

waterfall([

    function(callback) {
        //initialize lcd
        LCD = wpi.lcdInit(2, 16, 4, lcd.RS, lcd.E, lcd.D4, lcd.D5, lcd.D6, lcd.D7, 0, 0, 0, 0); //initialize lcd
        if (LCD === -1) {
            console.log("lcdInit failed! \n");
            return callback(null, 'lcdInitFail');
        } else {
            wpi.lcdHome(LCD); //Position cursor on the first line in the first column
            callback(null, 'lcdInitOk');
        }
    },
    function(err, callback) {
        ponto.getId(LCD, keypad, wpi, function(err, id) {
            console.log('id digitado', id);
            callback(null, id);
        });

    },
    function(err, callback) {
        ponto.getPassword(LCD, keypad, wpi, function(err, password) {
            console.log('Senha digitada', password);
            callback(null, password);
        });
    }

], function(err, result) {
    // result now equals 'done'
    console.log(result);
});
