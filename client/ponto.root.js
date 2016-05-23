(function() {
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
    //save employee credentials (id and password)
    var employeeCredentials = {};
    LCD = wpi.lcdInit(2, 16, 4, lcd.RS, lcd.E, lcd.D4, lcd.D5, lcd.D6, lcd.D7, 0, 0, 0, 0); //initialize lcd


    //initialize lcd
    console.log('initilizing lcd');
    LCD = wpi.lcdInit(2, 16, 4, lcd.RS, lcd.E, lcd.D4, lcd.D5, lcd.D6, lcd.D7, 0, 0, 0, 0); //initialize lcd
    if (LCD === -1) {
        console.log("lcdInit failed! \n");
        return callback(null, 'lcdInitFail');
    } else {
        wpi.lcdHome(LCD); //Position cursor on the first line in the first column
        wpi.lcdClear(LCD); //clear LCD
        wpi.lcdPuts(LCD, "Waiting..."); //write SENHA into LCD
    };

    module.exports = {
        openClose: function(callback) {
            //    console.log('processing login');
            waterfall([

                function(callback) {
                    keypad.read(function(char) {
                        console.log(char);
                        if (char === '*' || char === '#') {
                            callback(null, char)
                        } else {
                            return callback('error')
                        }
                    })
                },
                //function(callback) {
                function(char, callback) {
                    //clear the lcd
                    wpi.lcdClear(LCD);
                    if (char === '*') {
                        employeeCredentials.action = 'open'
                        wpi.lcdPuts(LCD, "Abrir ponto"); //write SENHA into LCD
                    } else if(char==="#") {
                        //close ponto
                        employeeCredentials.action = 'open'
                        wpi.lcdPuts(LCD, "Fechar ponto"); //write SENHA into LCD
                    }
                    ponto.getId(LCD, keypad, wpi, function(err, id) {
                        console.log('id digitado', id);
                        employeeCredentials.empId = id;
                        callback(null, id);
                    });

                },
                function(id, callback) {
                    ponto.getPassword(LCD, keypad, wpi, function(err, password) {
                        employeeCredentials.password = password;
                        callback(null, password);
                    });
                }

            ], function(err, password) {
                //finally
                //clear lcd
                wpi.lcdClear(LCD); //clear LCD
                wpi.lcdPuts(LCD, "Waiting..."); //write SENHA into LCD
                callback(employeeCredentials)
            });
        }
    }
})();
