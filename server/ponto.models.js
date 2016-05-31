'use strict'
/*Crete a mongoose Schema*/
var mongoose = require('mongoose');

var employeesSchema = new mongoose.Schema({
    working: Boolean,
    name: String,
    password: String,
    Id: {
        type: String,
        index: {
            unique: true
        }
    },

    ponto: [

        {
            isActive: {
                type: Boolean,
                default: false
            },
            fullDate: {
                type: Date,
                default: Date.now()
            },
            date: {
                year: String,
                month: String,
                weekDay: String,
                day: String,
            },
            totalExtraTime: Date,
            totalFaultTime: Date,
            totalWorkedTime:Date,
            isExtraTime: {
                type: Boolean,
                default: false
            },
            isFaultTime: {
                type: Boolean,
                default: true
            },
            turno1: {
                //Sinaliza se o ponto foi aberto
                isOpened: {
                    type: Boolean,
                    default: false
                },
                //Sinaliza se o ponto foi fechado
                isClosed: {
                    type: Boolean,
                    default: false
                },
                inTime: Date, //hora de entrada
                outTime: Date, // Hora de saida
                worked: {
                    type: Boolean,
                    default: false
                }, //Sinaliza se trabalhou
                isDelayedIn: {
                    type: Boolean,
                    default: false
                }, //sinaliza se entrou atrasado
                isDelayedOut: {
                    type: Boolean,
                    default: false
                }, //sinaliza se saiu atrasado
                extraTime: Date, //Tempo extra trabalhado
                faultTime: Date, //Tempo não trabalhado
                workedTime: Date, //horas trabalhadas
                isAntiOut: {
                    type: Boolean,
                    default: true
                } //Saiu antes da hora
            },
            turno2: {
                //Sinaliza se o ponto foi aberto
                isOpened: {
                    type: Boolean,
                    default: false
                },
                //Sinaliza se o ponto foi fechado
                isClosed: {
                    type: Boolean,
                    default: false
                },
                inTime: Date, //hora de entrada
                outTime: Date, // Hora de saida
                worked: {
                    type: Boolean,
                    default: false
                }, //Sinaliza se trabalhou
                isDelayedIn: {
                    type: Boolean,
                    default: false
                }, //sinaliza se entrou atrasado
                isDelayedOut: {
                    type: Boolean,
                    default: false
                }, //sinaliza se saiu atrasado
                extraTime: Date, //Tempo extra trabalhado
                faultTime: Date, //Tempo não trabalhado
                workedTime: Date, //horas trabalhadas
                isAntiOut: {
                    type: Boolean,
                    default: true
                } //Saiu antes da hora

            },
            isWorked: {
                type: Boolean,
                default: false
            }

        }
    ]
})

module.exports = mongoose.model('Employees', employeesSchema)
