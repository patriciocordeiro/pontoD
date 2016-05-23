/*keypad.methods.js*/
(function () {
    'use strict';
    var keypadConfig = require('./keypad.config');
    var wpi = require('wiring-pi');

    module.exports = {
        on: function() {
            //Set all Column pins mode
            for (var c = 0; c < keypadConfig.pinCols.length; c++) {
                wpi.pinMode(keypadConfig.pinCols[c], wpi.OUTPUT);
                console.log('configurando pino: ', c);
            }
            //Set all Row pins mode
            for (var r = 0; r < keypadConfig.pinRows.length; r++) {
                // write low to pin
                wpi.digitalWrite(keypadConfig.pinRows[r], wpi.LOW);
                //pull down pin
                wpi.pullUpDnControl(keypadConfig.pinRows[r], wpi.PUD_DOWN);
                //set  pin to input
                wpi.pinMode(keypadConfig.pinRows[r], wpi.INPUT);
            }
        },
        read: function(callback) {
            var char = 0;
            for (var c = 0; c < keypadConfig.pinCols.length; c++) {
                wpi.digitalWrite(keypadConfig.pinCols[c], wpi.HIGH);
                for (var r = 0; r < keypadConfig.pinRows.length; r++) {
                    var valor = wpi.digitalRead(keypadConfig.pinRows[r]);
                    if (valor == 1) {
                        var anterior = valor
                        console.log('button pressed');
                        for (var a = 0; a < 2; a++) {
                            valor = wpi.digitalRead(keypadConfig.pinRows[r]);
                            if (valor == 0) {
                                a = 2
                            } else {
                                a = 0;
                            }
                        }
                        console.log('button released');
                        char = keypadConfig.character[r][c];
                        return callback(char);
                    } else {
                        char = '';
                    }
                }
                //Set all cols pins to low
                for (var cc = 0; cc < keypadConfig.pinCols.length; cc++) {
                    wpi.digitalWrite(keypadConfig.pinCols[c], wpi.LOW);
                }
                wpi.delay(50);
            }

        }
    }
})();
