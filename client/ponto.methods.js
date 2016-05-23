/*ponto.methods.js*/
//var wpi = require('wiring-pi');
//var lcd = require('./lcd.config');
//var keypad = require('./keypad.methods');
(function () {
    'use strict';
    var pontoConfig = require('./ponto.config');

    module.exports = {


        getId: function(LCD, keypad, wpi, callback) {
            var id = '';
            var numOfIdChars = 0;
            var tempString = '';
            //clear lcd
            wpi.lcdClear(LCD);
            wpi.lcdPuts(LCD, "ID: ");
            while (numOfIdChars < pontoConfig.idLength) {
                keypad.read(function(typedChar) {
                    if (typedChar && typedChar !== '') {
                        //write the typed char in the LCD
                        wpi.lcdPuts(LCD, typedChar);
                        //concatenate typed chars to build a password string
                        tempString = id.concat(typedChar);
                        id = tempString;
                        //increment the typed number of chars
                        numOfIdChars++;
                        console.log('id: ', tempString);
                    }
                });
            }
            return callback(null, id);

        },
        getPassword: function(LCD, keypad, wpi, callback) {
            var password = '';
            var numOfChars = 0;
            var myString = '';
            var tempString= '';
            //clear lcd
            wpi.lcdClear(LCD); //clear LCD
            wpi.lcdPuts(LCD, "SENHA: "); //write SENHA into LCD
            while (numOfChars < pontoConfig.passwordLength) {
                keypad.read(function(char) {
                    if (char && char != '') {
                        //write the typed char in the LCD
                        wpi.lcdPuts(LCD, char);
                        //concatenate typed chars to build a password string
                        tempString = password.concat(char);
                        password = tempString;
                        //increment the typed number of chars
                        numOfChars++;
                        console.log('Senha: ', tempString);
                    }
                });
            }
            console.log('senha digitado:', password);
            console.log('saindo');
            return callback(null, password);
        }

    };
})();
