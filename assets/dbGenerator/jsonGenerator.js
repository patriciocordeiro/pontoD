var nomes = [
    "Miguel",
    "Davi",
    "Arthur",
    "Pedro",
    "Gabriel",
    "Bernardo",
    "Lucas",
    "Matheus",
    "Rafael",
    "Heitor",
    "Enzo",
    "Guilherme",
    "Nicolas",
    "Lorenzo",
    "Gustavo",
    "Felipe",
    "Samuel",
    "João Pedro",
    "Daniel",
    "Vitor",
    "Leonardo",
    "Henrique",
    "Theo",
    "Murilo",
    "Eduardo",
    "Pedro Henrique",
    "Pietro",
    "Cauã",
    "Isaac",
    "Caio",
    "Vinicius",
    "Benjamin",
    "João",
    "Lucca",
    "João Miguel",
    "Bryan",
    "Joaquim",
    "João Vitor",
    "Thiago",
    "Antônio",
    "Davi Lucas",
    "Francisco",
    "Enzo Gabriel",
    "Bruno",
    "Emanuel",
    "João Gabriel",
    "Ian",
    "Davi Luiz",
    "Rodrigo",
    "Otávio",
    "Sophia",
    "Alice",
    "Julia",
    "Isabella",
    "Manuela",
    "Laura",
    "Luiza",
    "Valentina",
    "Giovanna",
    "Maria Eduarda",
    "Helena",
    "Beatriz",
    "Maria Luiza",
    "Lara",
    "Mariana",
    "Nicole",
    "Rafaela",
    "Heloísa",
    "Isadora",
    "Lívia",
    "Maria Clara ",
    "Ana Clara",
    "Lorena",
    "Gabriela",
    "Yasmin",
    "Isabelly",
    "Sarah",
    "Ana Julia",
    "Letícia",
    "Ana Luiza",
    "Melissa ",
    "Marina ",
    "Clara ",
    "Cecí lia ",
    "Esther ",
    "Emanuelly ",
    "Rebeca ",
    "Ana Beatriz ",
    "Laví nia ",
    "Vitó ria ",
    "Bianca ",
    "Catarina ",
    "Larissa ",
    "Maria Fernanda ",
    "Fernanda ",
    "Amanda ",
    "Alí cia ",
    "Carolina ",
    "Agatha ",
    "Gabrielly "
]


var sobrenomes = ["Alves", "Monteiro",
    "Novaes",
    "Mendes",
    "Barros",
    "Freitas",
    "Barbosa",
    "Pinto",
    "Moura",
    "Cavalcanti",
    "Dias",
    "Castro",
    "Campos",
    "Cardoso",
    "Silva",
    "Souza",
    "Costa",
    "Santos",
    "Oliveira",
    "Pereira",
    "Rodrigues",
    "Almeida",
    "Nascimento",
    "Lima",
    "Araú jo",
    "Fernandes",
    "Carvalho",
    "Gomes",
    "Martins",
    "Rocha",
    "Ribeiro",
    "Rezende",
    "Sales",
    "Peixoto",
    "Fogaça",
    "Porto",
    "Ribeiro",
    "Duarte",
    "Moraes",
    "Ramos",
    "Pereira",
    "Ferreira",
    "Silveira",
    "Moreira",
    "Teixeira",
    "Caldeira",
    "Vieira",
    "Nogueira",
    "da Costa",
    "da Rocha",
    "da Cruz",
    "da Cunha",
    "da Mata",
    "da Rosa",
    "da Mota",
    "da Paz",
    "da Luz",
    "da Conceiçã o",
    "das Neves",
    "Fernandes",
    "Gonçalves",
    "Rodrigues",
    "Martins",
    "Lopes",
    "Gomes",
    "Mendes",
    "Nunes",
    "Carvalho",
    "Melo",
    "Cardoso",
    "Pires",
    "Jesus",
    "Aragã o",
    "Viana",
    "Farias"
]


var employee = {
        name: '',
        id: 0,
        password: 0,
        working: false,
        ponto: [],
        //    ponto: [{
        //        date: {
        //            type: Date,
        //            default: Date.now()
        //        },
        //        totalExtraTime: String,
        //        totalFaultTime: String,
        //        turno1: {
        //            inTime: String, //hora de entrada
        //            outTime: String, // Hora de saida
        //            worked: Boolean, //Sinaliza se trabalhou
        //            isDelayedIn: Boolean, //sinaliza se entrou atrasado
        //            isDelayedOut: Boolean, //sinaliza se saiu atrasado
        //            extraWorkedHours: String, //Tempo extra trabalhado
        //            faultHours: String, //Tempo não trabalhado
        //            workedHours: String //horas trabalhadas
        //        },
        //        turno2: {
        //            inTime: String, //hora de entrada
        //            outTime: String, // Hora de saida
        //            worked: Boolean, //Sinaliza se trabalhou
        //            isDelayedIn: Boolean, //sinaliza se entrou atrasado
        //            isDelayedOut: Boolean, //sinaliza se saiu atrasado
        //            extraTime: String, //Tempo extra trabalhado
        //            faultHours: String, //Tempo não trabalhado
        //            workedHours: String //horas trabalhadas
        //        },
        //
        //    }]
    }
    //var data = []
    //for (var i = 0; i < 50; i++) {
    //
    //    nomesIndex = Math.floor(Math.random() * ((maxNomes-minNomes)+1) + minNomes);
    //    sobrenomesIndex = Math.floor(Math.random() * ((maxSobrenomes-minSobrenomes)+1) + minSobrenomes);
    //    employee.name = nomes[nomesIndex] + ' ' + sobrenomes[sobrenomesIndex];
    //    employee.id = i + 100;
    //    employee.id = employee.id.toString();
    //    employee.working= false;
    //    employee.ponto =[];
    //    employee.password =i + 100000;
    //    employee.password = employee.password.toString();
    //    data.push(employee)
    //    employee = {};
    //
    //
    //
    //}
    //
    //console.log('data: ', data);
    /////save file with data
    //var fs = require('fs');
    //fs.writeFile("db_employees.js", JSON.stringify(data), function(err) {
    //    if (err) {
    //        return console.log(err);
    //    }
    //
    //    console.log("File saved in output!");
    //});

var async = require('async');

var minWorkHours = new Date(2016, 0, 1, 2, 0, 0);
var maxWorkHours = 4;
var turno1MaxInTime = new Date(2016, 0, 1, 8, 15, 0);
var turno1MaxOutTime = new Date(2016, 0, 1, 12, 15, 0);
var turno2MaxInTime = new Date(2016, 0, 1, 14, 15, 0);
var turno2MaxOutTime = new Date(2016, 0, 1, 18, 15, 0);


var minYear = 2016;
var maxYear = 2016;

var minMonth = 0;
var maxMonth = 11;
var day = 0;
var InhourFirstPeriod = 8;
var InMinMinute = 0;
var InMaxMinute = 20;
var seg = 0;

var turno1MinInHour = 8;
var turno1MaxInHour = 8;
var turno1MinInMin = 0;
var turno1MaxInMin = 15;

var turno1MinOutHour = 11;
var turno1MaxOutHour = 12;
var turno1MinOutMin = 0;
var turno1MaxOutMin = 59;

var turno2MinInHour = 14;
var turno2MaxInHour = 14;

var turno2MinOutHour = 17;
var turno2MaxOutHour = 18;

var turno2MinInMin = 0;
var turno2MaxInMin = 15;

var turno2MinOutMin = 0;
var turno2MaxOutMin = 59;

var temp = {
    turno1: {},
    //    turno2: {}

}

function getHours(minYear, maxYear, minMonth, maxMonth, minDay, minHour, maxHour, minMin, maxMin, callback) {
    var hour = 0;
    var min = 0;
    var seg = 0;
    var timeArray = [];
    for (var yearIndex = minYear; yearIndex <= maxYear; yearIndex++) {
        for (var monthIndex = minMonth; monthIndex <= maxMonth; monthIndex++) {
            var maxDay = new Date(yearIndex, monthIndex + 1, 0).getDate();
            for (var day = minDay; day <= maxDay; day++) {
                hour = Math.floor(Math.random() * ((maxHour - minHour) + 1) + minHour);
                min = Math.floor(Math.random() * ((maxMin - minMin) + 1) + minMin);
                seg = Math.floor(Math.random() * ((59 - 0) + 1) + 0);
                var d = new Date(yearIndex, monthIndex, day, hour, min, seg);
                timeArray.push(d)
            }
        }
    }
    return callback(timeArray)
}

function getWorkedhours(date1, date2, inDate, outDate) {
    var Mydate = new Date(1970, 0, 1); // get ms of january 1 of 1970
    var diff = date2 - date1 + Mydate;
    console.log(diff);
}

/*global functions*/
function getworkedHours(inTime, outTime) {

    var workedHours = outTime - inTime;
    return workedHours
}
//----------------------------------------------------------------------

function getExtraHours(workedHours, maxWorkHours) {
    var extraTimeString = '00:00:00';
    var adjustDate = new Date(2016, 0, 1).getTime();
    var d = new Date(2016, 0, 1, maxWorkHours, 0, 0);
    var maxWorkHoursInMs = d.getTime();
    if (workedHours > maxWorkHoursInMs) {
        //            console.log('HORA EXTRA');
        var extraTime = workedHours - maxWorkHoursInMs + adjustDate;
        var extraTimeString = new Date(extraTime).toTimeString().split(' ')[0]
            //            console.log('extraTime', extraTimeString);
    }
    return extraTimeString;
}


//----------------------------------------------------------------------

function getFaultHours(workedHours, maxWorkHours) {
    var faultHoursString = '00:00:00';
    var adjustDate = new Date(2016, 0, 1).getTime();
    var d = new Date(2016, 0, 1, maxWorkHours, 0, 0);
    var maxWorkHoursInMs = d.getTime();
    if (workedHours < maxWorkHoursInMs) {
        var faultHours = maxWorkHoursInMs - workedHours + adjustDate;
        var faultHoursString = new Date(faultHours).toTimeString().split(' ')[0]
    }
    return faultHoursString;
}

function getIsAntiOut(faultHours) {
    //Sinaliza saída antecipada
    var temp = faultHours.split(':');
    var hour = temp[0]
    var min = temp[1]
    var seg = temp[2]
        //        console.log('faultHours', faultHours);
    if ((hour > 0) || (min > 0) || (seg > 0)) {
        //            console.log('Saiu antes da hora');
        return true;
    } else {
        return false;
    }
}
//----------------------------------------------------------------------

function getIsDelayed(inTime, maxInTime) {
    var d = new Date(inTime)
    var dd = new Date(d.getFullYear(), d.getMonth(), d.getDate(), maxInTime.getHours(), maxInTime.getMinutes(), maxInTime.getSeconds()).getTime()
    if (inTime > dd) {
        //            console.log('ATRASADO MAIS DE 15 MIN');
        return true
    } else {
        return false
    }
}
//----------------------------------------------------------------------
function getTotalExtraHours(employeePonto) {
    var temp1 = employeePonto.turno1.extraWorkedHours.split(' ')[0].split(':');
    var temp2 = employeePonto.turno2.extraWorkedHours.split(' ')[0].split(':');
    var turno1ExtraWorkedHours = new Date(2016, 0, 1, temp1[0], temp1[1], temp1[2]).getTime(); //hours in ms
    var turno2ExtraWorkedHours = new Date(2016, 0, 1, temp2[0], temp2[1], temp2[2]).getTime(); //hours in ms
    var totalExtradHours = turno1ExtraWorkedHours + turno2ExtraWorkedHours - (new Date(2016, 0, 1).getTime()); //sum the two and sub the 1970, 1,1 data
    var totalExtraHoursString = new Date(totalExtradHours).toTimeString().split(' ')[0] // convert to string format (00:00:00)
    return totalExtraHoursString;
}
//----------------------------------------------------------------------

function getIsGeneral(fullHour) {
    //Sinaliza saída antecipada
    var temp = fullHour.split(':');
    var hour = temp[0]
    var min = temp[1]
    var seg = temp[2]
        //        console.log('faultHours', faultHours);
    if ((hour > 0) || (min > 0) || (seg > 0)) {
        //            console.log('Saiu antes da hora');
        return true;
    } else {
        return false;
    }
}


function getTotalWorkedHours(workedHoursTurno1, workedHoursTurno2) {
    var totalWorkedHours = workedHoursTurno1 + workedHoursTurno2 - (new Date(2016, 0, 1).getTime());; //sum the two and sub the 1970, 1,1 data
    var totalWorkedHoursString = new Date(totalWorkedHours).toTimeString().split(' ')[0] // convert to string format (00:00:00)
    return totalWorkedHoursString
}
/*Verifica se o funcionário trabalhou ou não*/
function getisWorked(totalWorkedHours, minWorkHours) {
    var temp = totalWorkedHours.split(' ')[0].split(':');
    var totalWorkedHoursMs = new Date(2016, 0, 1, temp[0], temp[1], temp[2]).getTime(); //hours in ms
    if (totalWorkedHours < minWorkHours.getTime()) {
        return false //is worked is false
    } else {
        return true //is worked is true
    }
}
//
function getTotalFaultHours(employeePonto) {
    var temp1 = employeePonto.turno1.faultHours.split(' ')[0].split(':');
    var temp2 = employeePonto.turno2.faultHours.split(' ')[0].split(':');
    var turno1FaultHours = new Date(2016, 0, 1, temp1[0], temp1[1], temp1[2]).getTime(); //hours in ms
    var turno2FaultHours = new Date(2016, 0, 1, temp2[0], temp2[1], temp2[2]).getTime(); //hours in ms
    var totalFaultHours = turno1FaultHours + turno2FaultHours - (new Date(2016, 0, 1).getTime()); //sum the two and sub the 1970, 1,1 data
    var totalFaultHoursString = new Date(totalFaultHours).toTimeString().split(' ')[0] // convert to string format (00:00:00)
    return totalFaultHoursString;
}
//----------------------------------------------------------------------

//var d;
var date1 = [];
var date2 = [];
var Mydate = new Date(2016, 0, 1).getTime(); // get ms of january 1 of 1970
var dataLength = 0; //Length of ponto inser


/*Use async to execute in series*/
var name = [];
var id;
var minNomes = 0;
var maxNomes = nomes.length;
var minSobrenomes = 0;
var maxSobrenomes = sobrenomes.length;
maxEmployees = 50;
async.series([

    function (callback) {
        var data = []
        for (var i = 0; i < maxEmployees; i++) {

            nomesIndex = Math.floor(Math.random() * ((maxNomes - minNomes) + 1) + minNomes);
            sobrenomesIndex = Math.floor(Math.random() * ((maxSobrenomes - minSobrenomes) + 1) + minSobrenomes);
            employee.name = nomes[nomesIndex] + ' ' + sobrenomes[sobrenomesIndex];
            employee.id = i + 100;
            employee.id = employee.id.toString();
            employee.working = false;
            employee.ponto = [];
            employee.password = i + 100000;
            employee.password = employee.password.toString();
            data.push(employee)
            employee = {};
        }
        employee = data
            //            console.log(employee);
        callback();
    },
    function (callback) {
        /*Entrada primeiro turno*/
        //        console.log('adadad', employee);
        getHours(minYear, maxYear, minMonth, maxMonth, 1, turno1MinInHour, turno1MaxInHour, turno1MinInMin, turno1MaxInMin, function (data) {
                for (k = 0; k < maxEmployees; k++) {

                    for (var i = 0; i < data.length; i++) {
                        var temp = {
                            fullDate: {},
                            date: {},
                            turno1: {},
                            turno2: {},
                        }
                        temp.fullDate = data[i].toDateString(); //Date of work
                        temp.date.year = data[i].getFullYear().toString(); //Date of work
                        temp.date.month = data[i].getMonth().toString(); //Date of work
                        temp.date.weekday = data[i].getDay().toString(); //Date of work
                        temp.date.day = data[i].getDate().toString(); //Date of work

                        temp.turno1.inTime = data[i].toTimeString().split(' ')[0]; //Hora de Entrada
                        date1[i] = new Date(data[i]).getTime(); // hora entrada em ms
                        temp.turno1.isDelaydIn = getIsDelayed(date1[i], turno1MaxInTime) //sinalize se entrou atrasado
                        employee[k].ponto.push(temp); // push para o array ponto
                    }
                }
            })
            //        console.log('primeiro pronto', employee)
        callback()
    },
    function (callback) {
        /*Saida primeiro turno*/
        getHours(minYear, maxYear, minMonth, maxMonth, 1, turno1MinOutHour, turno1MaxOutHour, turno1MinOutMin, turno1MaxOutMin, function (data) {
            console.log('segundo iniciado')
            for (k = 0; k < maxEmployees; k++) {
                for (var i = 0; i < data.length; i++) {
                    employee[k].ponto[i].turno1.outTime = data[i].toTimeString().split(' ')[0];
                    date2[i] = new Date(data[i]).getTime(); // hora saida em ms

                    employee[k].ponto[i].turno1.isDelaydOut = getIsDelayed(date2[i], turno1MaxOutTime) //sinalize se saiu atrasado

                    //Extra hours calculation
                    var diff = date2[i] - date1[i] + Mydate;
                    var diffInMs = new Date(diff);
                    employee[k].ponto[i].turno1.workedHours = diffInMs.toTimeString().split(' ')[0];
                    employee[k].ponto[i].turno1.extraWorkedHours = getExtraHours(diffInMs.getTime(), maxWorkHours)
                        //faul hours calculation
                    employee[k].ponto[i].turno1.faultHours = getFaultHours(diffInMs.getTime(), maxWorkHours);
                    //Sinaliza se saiu antecipado
                    employee[k].ponto[i].turno1.isAntiOut = getIsAntiOut(employee[k].ponto[i].turno1.faultHours);
                }
            }
            callback();
        })

    },

    function (callback) {
        /*Entrada Segundo turno*/
        getHours(minYear, maxYear, minMonth, maxMonth, 1, turno2MinInHour, turno2MaxInHour, turno2MinInMin, turno2MaxInMin, function (data) {
                for (k = 0; k < maxEmployees; k++) {
                    for (var i = 0; i < data.length; i++) {
                        employee[k].ponto[i].turno2 = {}
                        employee[k].ponto[i].turno2.date = data[i].toDateString(); //Date of work
                        employee[k].ponto[i].turno2.inTime = data[i].toTimeString().split(' ')[0]; //Hora de Entrada
                        date1[i] = new Date(data[i]).getTime(); // hora entrada em ms
                        employee[k].ponto[i].turno2.isDelaydIn = getIsDelayed(date1[i], turno2MaxInTime) //sinalize se entrou atrasado
                            //                employee.ponto.push(temp); // push para o array ponto
                    }
                }
            })
            //        console.log('Segundo pronto', employee)
        callback()
    },
    function (callback) {
        /*Saida primeiro turno*/
        dataLength = 0;
        getHours(minYear, maxYear, minMonth, maxMonth, 1, turno2MinOutHour, turno2MaxOutHour, turno2MinOutMin, turno2MaxOutMin, function (data) {
            console.log('segundo iniciado')
            dataLength = data.length;
            for (k = 0; k < maxEmployees; k++) {
                for (var i = 0; i < data.length; i++) {
                    employee[k].ponto[i].turno2.outTime = data[i].toTimeString().split(' ')[0];
                    date2[i] = new Date(data[i]).getTime(); // hora saida em ms

                    employee[k].ponto[i].turno2.isDelaydOut = getIsDelayed(date2[i], turno2MaxOutTime) //sinalize se saiu atrasado

                    //Extra hours calculation
                    var diff = date2[i] - date1[i] + Mydate;
                    var diffInMs = new Date(diff);
                    employee[k].ponto[i].turno2.workedHours = diffInMs.toTimeString().split(' ')[0];
                    employee[k].ponto[i].turno2.extraWorkedHours = getExtraHours(diffInMs.getTime(), maxWorkHours)
                        //faul hours calculation
                    employee[k].ponto[i].turno2.faultHours = getFaultHours(diffInMs.getTime(), maxWorkHours)

                    //Sinaliza se saiu antecipado
                    employee[k].ponto[i].turno2.isAntiOut = getIsAntiOut(employee[k].ponto[i].turno2.faultHours)
                }
            }
            callback();
        })
    },
    function (callback) {
        for (k = 0; k < maxEmployees; k++) {
            for (var i = 0; i < dataLength; i++) {
                //Check if is worked (totalWorkedHours most be greater then 2 hours)
                var temp1 = employee[k].ponto[i].turno1.workedHours.split(' ')[0].split(':');
                var temp2 = employee[k].ponto[i].turno2.workedHours.split(' ')[0].split(':');
                var turno1WorkedHours = new Date(2016, 0, 1, temp1[0], temp1[1], temp1[2]);
                var turno2WorkedHours = new Date(2016, 0, 1, temp2[0], temp2[1], temp2[2]);

                var totalWorkedHours = getTotalWorkedHours(turno1WorkedHours.getTime(), turno2WorkedHours.getTime())
                employee[k].ponto[i].totalWorkedHours = totalWorkedHours;

                //Get if Employee worked
                var isWorked = getisWorked(totalWorkedHours, minWorkHours);
                employee[k].ponto[i].isWorked = isWorked;

                //get Total extra hours
                var totalExtrahours = getTotalExtraHours(employee[k].ponto[i])
                employee[k].ponto[i].totalExtraHours = totalExtrahours;
                employee[k].ponto[i].isExtraHours = getIsGeneral(totalExtrahours) //check if there are extra hours
                    //            console.log('totalExtrahours', totalExtrahours);

                //get total faul Hours
                var totalFaultHours = getTotalFaultHours(employee[k].ponto[i])
                employee[k].ponto[i].totalFaultHours = totalFaultHours;
                employee[k].ponto[i].isFaultHours = getIsGeneral(totalFaultHours)
                    //            getisWorked(totalWorkedHours)
            }
        }
        callback();
    },

    function () {
        ///save file with data
        var fs = require('fs');
        fs.writeFile("db_employees.js", JSON.stringify(employee), function (err) {
            if (err) {
                return console.log(err);
            }

            console.log("File saved in output!");
        });

        console.log('Tarefas concuidas');
        console.log(employee);
    }
])