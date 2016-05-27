(function() {
    'use strict';

    angular.module('pontoDApp').controller('DialogCtrl', ['$mdDialog', 'message', DialogCtrl]);

    function DialogCtrl($mdDialog, message) {
        var vm = this;
        console.log(message);
        vm.message = message;
        vm.isShowWellCome = false;
        vm.isShowWarning = false;
        vm.isShowError = false;
        vm.statusClass = 'md-primary'; //toolbar class


        if (vm.message.type === 'entrada') {
            if (vm.message.status.code === '1000') {
                //All Ok
                vm.isShowWellCome = true;
            } else if (vm.message.status.code === '003') {
                //Already opened
                //Warning
                vm.isShowWarning = true;
                vm.statusClass = 'md-warn';

            } else {
                //Wrong password
                //Error
                console.log('showing error');
                vm.isShowError = true;
                vm.statusClass = 'md-accent';

            }
        }else if(vm.message.type === 'entrada'){

        }

        vm.closeDialog = function() {
            $mdDialog.hide();
        };

    }
})();
