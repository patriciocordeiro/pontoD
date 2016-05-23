var wpi = require('wiring-pi');
var lcd = require('./lcd.config')
var keypad = require('./keypad.config')
var waterfall = require('async-waterfall');

wpi.wiringPiSetup(); //initialize the wiringPi


//Set all Column pins mode
for (var c = 0; c < keypad.pinCols.length; c++) {
    wpi.keypad.pinMode(keypad.pinCols[c], wpi.OUTPUT);
    console.log('configurando pino: ', c);
}
//Set all Row pins mode
for (var r = 0; r < keypad.pinRows.length; r++) {
    wpi.digitalWrite(keypad.pinRows[r], wpi.LOW);
    wpi.pullUpDnControl(keypad.pinRows[r], wpi.PUD_DOWN);
    wpi.pinMode(keypad.pinRows[r], wpi.INPUT);
}

var LCD = wpi.lcdInit(2, 16, 4, lcd.RS, lcd.E, lcd.D4, lcd.D5, lcd.D6, lcd.D7, 0, 0, 0, 0); //initialize lcd
if (LCD == -1) {
    console.log("lcdInit failed! \n");
    return -1;
} else {
    wpi.lcdHome(LCD); //Position cursor on the first line in the first column
    waterfall([
        getId(function(err, id) {
            console.log('id digitado', id);

        }), getPassword(function(err, password) {
            console.log('Senha digitada', password);
        })

    ], function(err, result) {
        // result now equals 'done'
    });

}

function readKeyPad(callback) {
    var char = 0;
    for (var c = 0; c < keypad.pinCols.length; c++) {
        wpi.digitalWrite(keypad.pinCols[c], wpi.HIGH);
        for (var r = 0; r < keypad.pinRows.length; r++) {
            var valor = wpi.digitalRead(keypad.pinRows[r]);
            if (valor == 1) {
                var anterior = valor
                console.log('button pressed');
                for (var a = 0; a < 2; a++) {
                    valor = wpi.digitalRead(keypad.pinRows[r]);
                    if (valor == 0) {
                        a = 2
                    } else {
                        a = 0;
                    }
                }
                console.log('button released');
                char = character[r][c];
                return callback(char);
            } else {
                char = '';
            }
        }
        //Set all cols pins to low
        for (var cc = 0; cc < keypad.pinCols.length; cc++) {
            wpi.digitalWrite(keypad.pinCols[c], wpi.LOW);
        }
        wpi.delay(50);
    }

}

function getPassword(callback) {
    var password = '';
    maxNumOfchars = 6;
    numOfChars = 0;
    myString = '';
    //clear lcd
    wpi.lcdClear(lcd);
    wpi.lcdPuts(lcd, "SENHA: ");
    while (numOfChars < maxNumOfchars) {
        readKeyPad(function(char) {
            if (char && char != '') {
                //write the typed char in the LCD
                wpi.lcdPuts(lcd, char);
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

function getId(callback) {
    var id = '';
    var maxNumOfIdchars = 4;
    var numOfIdChars = 0;
    var tempString = '';
    //clear lcd
    wpi.lcdClear(LCD);
    wpi.lcdPuts(LCD, "ID: ");
    while (numOfIdChars < maxNumOfIdchars) {
        readKeyPad(function(typedChar) {
            if (typedChar && typedChar != '') {
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

}
