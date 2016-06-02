(function () {
    'use strict';

    angular.module('pontoDApp').controller('employeeCtrl', ['$scope', 'httpCallSrvc', '$timeout', '$mdDialog', '$stateParams', 'Upload', employeeCtrl]);

    function employeeCtrl($scope, httpCallSrvc, $timeout, $mdDialog, $stateParams, Upload) {

        var vm = this;
        var http = httpCallSrvc;

        //image root path
        vm.rootPath = '/assets/img/employees/';

        //get the id
        var id = $stateParams.id;
        //Send to server
        http.api.getByQuery({
            empId: id
        }, 'getEmployee', function (data) {

            vm.employeeData = data.res[0];
            console.log(vm.employeeData[0]);
        });

        vm.createEmployee = function (newEmployee, imgFile) {
            //            console.log(newEmployee.imgFile);

            //1-upload the image first
            Upload.upload({
                url: 'http://localhost:3000/upload',
                data: {
                    //                    file: file
                    file: Upload.dataUrltoBlob(imgFile, '.png')
                }
            }).then(function (resp) {
                console.log(resp);
                if (resp.data.error_code === 0) {
                    console.log('sucess');
                    //on sucess upload new employee data
                    var query = newEmployee;
                    http.api.getByQuery(
                        query, 'signup',
                        function (resp) {
                            //create new employee dialog
                            //
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
                        });
                } else {
                    console.log('error uploading image');
                }
            })

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

        vm.addNewField = function (ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.prompt()
                .title('What would you name your dog?')
                .textContent('Bowser is a common name.')
                .placeholder('dog name')
                .ariaLabel('Dog name')
                .targetEvent(ev)
                .ok('Okay!')
                .cancel('I\'m a cat person');
            $mdDialog.show(confirm).then(function (result) {
                $scope.status = 'You decided to name your dog ' + result + '.';
            }, function () {
                $scope.status = 'You didn\'t name your dog.';
            });
        }

    }
})();