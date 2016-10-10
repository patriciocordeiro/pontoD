(function() {
    'use strict';

    angular.module('pontoDApp').controller('employeeCtrl', ['$scope', 'httpCallSrvc', '$timeout', '$mdDialog', '$stateParams', 'Upload', '$state', 'reportSrvc', employeeCtrl]);

    function employeeCtrl($scope, httpCallSrvc, $timeout, $mdDialog, $stateParams, Upload, $state, reportSrvc) {

        var vm = this;
        var http = httpCallSrvc;
        vm.years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016'];
        vm.report = {
            year: '2016'
        };

        //image root path
        vm.rootPath = '/assets/img/employees/';

        /*Image crop settings*/
        vm.imgCropOptions = {
            areaType: "square",
            areaMinSize: "152",
            resultImageSize: "152",
            //            resultImageFormat: "png"
            //            [result-image-quality="{number}"]
            //            [on-change="{expression}"]
            //            [on-load-begin="{expression"]
            //            [on-load-done="{expression"]
            //            [on-load-error="{expression"]
        };


        vm.employeeDetails = [{
            property: 'Nome completo',
            value: 'fullName',
            type: 'String'
        }, {
            property: 'Fomação',
            value: 'education',
            type: 'String'
        }, {
            property: 'Idade',
            value: 'age',
            type: 'String'
        }, {
            property: 'Cargo/Função',
            value: 'jobTitle',
            type: 'String'
        }, {
            property: 'Data de admissão',
            value: 'admissionDate',
            type: 'Date'
        }, {
            property: 'Estado civil',
            value: 'maritalStatus',
            type: 'String'
        }, {
            property: 'Ramal',
            value: 'phone',
            type: 'String'
        }];

        //get the id
        var id = $stateParams.id;
        //Send to server
        http.api.getByQuery({
            empId: id
        }, 'getEmployee', function(data) {

            vm.employeeData = data.res[0];
            console.log(data);
        });


        vm.newEmployee = {};
        vm.createEmployee = function(newEmployee, imgFile) {
            console.log(imgFile);
            console.log(Upload.dataUrltoBlob(imgFile, imgName));
            var imgName = 'employee' + Date.now() + '.png';
            //on sucess upload new employee data
            var query = newEmployee;
            query.imgPath = imgName;
            query.age = moment(newEmployee.birthDate).fromNow(true);
            console.log(query.age);
            http.api.getByQuery(
                query, 'signup',
                function(resp) {
                    //create new employee dialog
                    console.log(resp);
                    var ev;
                    $mdDialog.show({
                        targetEvent: ev,
                        parent: angular.element(document.body),
                        clickOutsideToClose: true,
                        escapeToClose: true,
                        controller: 'DialogCtrl as vm',
                        templateUrl: '/views/ponto.diag.html',
                        locals: {
                            data: {
                                message: resp.res,
                                diag: 'signup'
                            }
                        }
                    });

                    if (resp.res.code === '1001') {
                        //1-upload the image first
                        Upload.upload({
                            url: 'http://localhost:3000/upload',
                            data: {
                                //                    file: file
                                file: Upload.dataUrltoBlob(imgFile, imgName)
                            }
                        }).then(function(resp) {
                            console.log(resp);
                            if (resp.data.error_code === 0) {
                                console.log('sucess');

                            } else {
                                console.log('error uploading image');
                            }
                        });

                    }
                });
        };

        /*imageUpload*/
        //        vm.upload_form ={};
        //        vm.upload_form
        //        vm.submit = function() {
        ////            console.log(vm.upload_form);
        //            vm.upload(vm.file);
        //        };

        //        var imgUpload = function (file, name) {
        //            console.log(file);
        //            Upload.upload({
        //                url: 'http://localhost:3000/upload',
        //                data: {
        //                    //                    file: file
        //                    file: Upload.dataUrltoBlob(file, name)
        //                }
        //            }).then(function (resp) {
        //                if (resp.data.error_code === 0) {
        //                    console.log('sucess');
        //                } else {
        //                    console.log('error uploading image');
        //                }
        //            }, function (evt) {
        //                console.log(evt)
        //                var progressPercentage = parseInt(100.0 * evt.load / evt.total);
        //                console.log('progress: ' + progressPercentage + '%' + evt.config.data.file.name);
        //                vm.progress = 'progress: ' + progressPercentage + '%';
        //            });
        //        };
        getFormFields();

        function getFormFields() {
            http.api.getAll('getFormFields', function(res) {
                console.log(res);
                vm.formFields = {};
                _(res).forEach(function(data) {
                    vm.formFields[data.name] = data.values;
                    vm.formFields[data.name]._id = data._id;
                    console.log(vm.formFields);
                });
            });
        }

        //Create the options  for number of inputs
        vm.numOfInputFields = {
            value: 1 //for ng-model
        }
        var maxNumOfNewFormFields = 10; //max number of inputs to add at once
        vm.NumOfNewFormFields = [1]; // array of numbers 1 to maxNumOfNewFormFields
        for (var i = 2; i <= maxNumOfNewFormFields; i++) {
            vm.NumOfNewFormFields.push(i);
        }

        //        vm.inputFieldId ='';
        vm.addNewFormField = function(selInputField, id, ev) {
            $mdDialog.show({
                targetEvent: ev,
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                escapeToClose: false,
                controller: 'employeeCtrl as vm',
                template: '<md-dialog aria-label="List dialog">' +
                    '<form name="vm.numOfFieldsForm">' +
                    '<md-toolbar layout="row"  layout-align="center center">' +
                    ' <div class="md-toolbar-tools">' +

                ' <h2>Adicionar um novo item em: ' + selInputField + '</h2>' +
                    ' <span flex></span>' +
                    ' <md-button class="md-icon-button" ng-click="vm.cancelDialg()">' +
                    ' <md-icon class="material-icons">close</md-icon>' +
                    '</md-button>' +
                    ' </div>' +
                    ' </md-toolbar>' +
                    '<md-dialog-content>' +
                    '<div class="md-dialog-content">' +
                    'Selecione o número total de campos a serem adicionados' +

                '<md-input-container flex="80" class="md-block" flex-gt-sm>' +
                    '<label>Número de itens à adicionar</label>' +
                    '<md-select name="maxNumOfInputFields" ng-model="vm.numOfInputFields.value" required>' +
                    '<md-option value="{{numOfInputs}}" ng-repeat="numOfInputs in  vm.NumOfNewFormFields">' +
                    '{{numOfInputs}}' +
                    '</md-option>' +
                    '</md-select>' +
                    '<div ng-messages="vm.numOfFieldsForm.maxNumOfInputFields.$error">' +
                    '<div ng-message="required">Selecione a formacao</div>' +
                    ' </div>' +
                    '</md-input-container>' +
                    '</div>' +
                    '  </md-dialog-content>' +
                    '  <md-dialog-actions>' +
                    '    <md-button ng-click="vm.answerDialg(vm.numOfInputFields.value)" class="md-primary md-raised">' +
                    '     Confirmar' +
                    '    </md-button>' +
                    '<md-button ng-click="vm.cancelDialg()" class="md-primary">' +
                    '     Cancelar' +
                    '    </md-button>' +
                    '  </md-dialog-actions>' +
                    '</form>' +
                    '</md-dialog>',
            }).then(function(maxNumOfNewFormFields) {
                    console.log(maxNumOfNewFormFields);
                    if (maxNumOfNewFormFields) {
                        if (Number(maxNumOfNewFormFields) > 0) {
                            //Execute the function to add fields
                            inputFieldItems(maxNumOfNewFormFields, function(items) {
                                vm.inputField = items;
                                console.log(vm.inputField);

                                var ev;
                                $mdDialog.show({
                                    targetEvent: ev,
                                    parent: angular.element(document.body),
                                    clickOutsideToClose: false,
                                    escapeToClose: false,
                                    controller: 'employeeCtrl as vm',
                                    templateUrl: '/views/addNewField.diag.html',
                                    bindToController: true,
                                    locals: {
                                        inputField: {
                                            name: selInputField,
                                            _id: id,
                                            items: vm.inputField
                                        },
                                    }
                                });
                            });
                        }
                    }
                },
                function() {
                    //                $scope.status = 'You cancelled the dialog.';
                });
        };

        vm.cancelDialg = function() {
            $mdDialog.cancel();
        };

        vm.answerDialg = function(answer) {
            $mdDialog.hide(answer);
        };

        vm.submitNewInputFields = function(newInputFields, inputFieldId, property) {
            var values = _.values(newInputFields);
            var query = {};
            query.property = property;
            query.newInputFields = values;
            query._id = inputFieldId;
            http.api.getByQuery(
                query, 'insertNewIputFields', function(data) {
                    vm.formFields[data.name] = data.values;
                });
            //TODO deal with answer (dialog)
            $mdDialog.hide(newInputFields);
        };


        function inputFieldItems(maxNumOfNewFormFields, callback) {
            var items = [];
            for (var i = 1; i <= maxNumOfNewFormFields; i++) {
                items.push(i);
            }
            console.log(items);
            callback(items);
        }

        //Remove inputFieldItems
        vm.remInputField = function(index) {
            console.log(index);
            console.log(vm.inputField.items.splice(index, 1))
        }

        vm.addInputField = function() {
            vm.inputField.items.push(vm.inputField.items + 1)
        }



        /**/
        vm.getEmployeeReport = function(ev, empId) {
            console.log(empId);
            $mdDialog.show({
                targetEvent: ev,
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                escapeToClose: false,
                controller: 'employeeCtrl as vm',
                template: '<md-dialog aria-label="List dialog">' +
                    '<form name="vm.numOfFieldsForm">' +
                    '<md-toolbar layout="row"  layout-align="center center">' +
                    ' <div class="md-toolbar-tools">' +

                ' <h2>Escolha o ano para a geração do relatório de pontos</h2>' +
                    ' <span flex></span>' +
                    ' <md-button class="md-icon-button" ng-click="vm.cancelDialg()">' +
                    ' <md-icon class="material-icons">close</md-icon>' +
                    '</md-button>' +
                    ' </div>' +
                    ' </md-toolbar>' +
                    '<md-dialog-content>' +
                    '<div class="md-dialog-content">' +
                    'Selecione o número total de campos a serem adicionados' +

                '<md-input-container flex="80" class="md-block" flex-gt-sm>' +
                    '<label>Número de itens à adicionar</label>' +
                    '<md-select name="maxNumOfInputFields" ng-model="vm.report.year" required>' +
                    '<md-option value="{{year}}" ng-repeat="year in  vm.years">' +
                    '{{year}}' +
                    '</md-option>' +
                    '</md-select>' +
                    '<div ng-messages="vm.numOfFieldsForm.maxNumOfInputFields.$error">' +
                    '<div ng-message="required">Selecione a formacao</div>' +
                    ' </div>' +
                    '</md-input-container>' +
                    '</div>' +
                    '  </md-dialog-content>' +
                    '  <md-dialog-actions>' +
                '    <md-button ng-click="vm.answerDialg(vm.report.year)" class="md-primary md-raised">' +
                    '     Confirmar' +
                    '    </md-button>' +
                    '<md-button ng-click="vm.cancelDialg()" class="md-primary">' +
                    '     Cancelar' +
                    '    </md-button>' +
                    '  </md-dialog-actions>' +
                    '</form>' +
                    '</md-dialog>',

            }).then(function(reportYear) {
                reportSrvc.employeeId = empId; //share id to service (to get it in relatório controller)
                reportSrvc.reportYear = reportYear;
                console.log(reportYear);
                $state.go('app.relatorios');
                //                console.log('helloooo');

            });
        };
    }
})();
