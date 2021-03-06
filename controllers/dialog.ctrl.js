(function () {
    'use strict';

    angular.module('pontoDApp').controller('DialogCtrl', ['$mdDialog', 'data', '$filter', DialogCtrl]);

    function DialogCtrl($mdDialog, data, $filter) {
        var vm = this;
        console.log(data);
        vm.message = data.message;
        var diag = data.diag;
        vm.isShowSucess = {
            status: false
        };
        vm.isShowWarning = false;
        vm.isShowError = false;
        vm.statusClass = 'md-primary'; //toolbar class
        vm.headTile = '';
        vm.statusClass = 'status-success'; // class to indicate success, warning and error (see css file)
        //        vm.delayText = 'Não'; //if the employee is delay
        if (diag === 'ponto') {
            //logic for ponto dialog
            if (vm.message.type === 'entrada') {
                vm.headTile = 'Abertura de ponto';
            } else if (vm.message.type === 'saida') {
                vm.headTile = 'Fechamento de ponto';
            }

            if (vm.message.status.code === '1000') {
                //All Ok
                if (vm.message.type === 'entrada') {
                    var delayText = 'Não';

                    //check if is delay
                    if (vm.message.user.isDelayedIn) {
                        delayText = 'Sim';
                        vm.statusClass = 'status-error';
                    }
                    vm.isShowSucess = {
                        status: true,
                        showWorkedTime: false,
                        icon: {
                            type: 'check_circle',
                            class: 'md-success'
                        },
                        text: {
                            title: 'Bem vindo, ' + vm.message.user.fullName.toUpperCase(),
                            time: {
                                title: 'Hora de entrada: ',
                                value: $filter('date')(vm.message.user.inTime, 'hh:mm:ss a')
                            },
                            situation: {
                                title: 'Atrasado: ',
                                status: delayText
                            }
                        }
                    };

                } else if (vm.message.type === 'saida') {
                    var faultText = 'Não';
                    if (vm.message.user.faultTime) {
                        faultText = 'Sim'; //antecipate out
                        vm.statusClass = 'status-error';
                    }
                    vm.isShowSucess = {
                        status: true,
                        showWorkedTime: true,
                        icon: {
                            type: 'check_circle',
                            class: 'md-success'
                        },

                        text: {
                            title: 'Até logo, ' +  vm.message.user.fullName.toUpperCase(),
                            time: {
                                title: 'Hora de saída: ',
                                value: $filter('date')(vm.message.user.outTime, 'hh:mm:ss a')
                            },
                            workTime: {
                                title: 'Horas trabalhadas: ',
                                value: $filter('date')(vm.message.user.workedTime.duration, 'hh:mm:ss')
                            },
                            situation: {
                                title: 'Saída antes da hora: ',
                                status: faultText
                            }
                        }

                    };

                }
            } else if (vm.message.status.code === '003') {
                //Already opened
                //Warning
                vm.headerClass = 'md-warn';
                vm.isShowWarning = {
                    status: true,
                    icon: {
                        type: 'warning',
                        class: 'md-warning'
                    },

                    text: {
                        title: 'Olá, ' + vm.message.user.fullName,
                        content: 'O seu ponto já foi aberto'
                    }
                };

            } else if (vm.message.status.code === '004') {
                //already closed
                vm.headerClass = 'md-warn';
                vm.isShowWarning = {
                    status: true,
                    icon: {
                        type: 'warning',
                        class: 'md-warning'
                    },
                    text: {
                        title: 'Olá, ' + vm.message.user.fullName,
                        content: 'O seu ponto já foi fechado'
                    }

                };

            } else {
                //Wrong password
                //Error
                console.log('showing error');
                vm.headerClass = 'md-accent';
                vm.isShowError = {
                    status: true,
                    icon: {
                        type: 'error',
                        class: 'md-er ror'
                    },
                    text: {
                        title: ' Colaborador não existe ou senha incorreta',
                    }
                };

            }

            //        signup dialog

        }
        if (diag === 'signup') {
            //logic for signup dialog
            vm.headTile = 'Cadastro de colaborador';
            if (vm.message.code === '1001') {
                vm.isShowSucess = {
                    status: true,
                    icon: {
                        type: 'check_circle',
                        class: 'md-success'
                    },
                    text: {

                        title: 'Colaborador cadastrado com sucesso',
                        time: null,
                        situation: null
                    }
                }
            } else if (vm.message.code === '006') {
                vm.headerClass = 'md-warn';
                vm.isShowWarning = {
                    status: true,
                    icon: {
                        type: 'warning',
                        class: 'md-warning'
                    },

                    text: {
                        title: 'O id digitado já pertence a outro colaborador',
                        content: null
                    }
                };

            } else {
                vm.headerClass = 'md-accent';
                vm.isShowError = {
                    status: true,
                    icon: {
                        type: 'error',
                        class: 'md-error'
                    },
                    text: {
                        title: 'Aconteceu um erro desconhecido!',
                        content: 'Tente novamente. Se o problema persistir contate o administrador'
                    }
                };

            }
        }
        vm.closeDialog = function () {
            $mdDialog.cancel();
        };

    }
})();
